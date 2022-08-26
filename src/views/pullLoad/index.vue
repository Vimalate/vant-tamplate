<template>
  <div class="container" @touchstart="touchStart($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" :style="{transform: 'translate3d(0,' + top + 'px, 0)'}">
    <p class="drop" v-if="dropDownState == 2">松开立即刷新</p>
    <p class="drop" v-if="dropDownState == 3">正在刷新数据...</p>
    <div class="histroy" id="list">
      <li v-for="(item,index) in list" :key="index">第{{ item }}条数据</li>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  name: 'Wx',
  data() {
    return {
      index: 0,
      list: [],
      defaultOffset: 10,
      top: 0,
      scrollIsToTop: 0,
      startY: 0,
      isDropDown: false,
      isRefreshing: false,
      dropDownState: 1
    }
  },
  mounted() {
    console.log('**************页面初始化**************')
    this.getHistory()
  },
  methods: {
    // 加载历史记录
    getHistory() {
      Toast.loading({ message: '加载中', duration: 0 })
      setTimeout(() => {
        Toast.clear()
        const result = []
        for (var i = 0; i < 10; i++) {
          const value = this.index < 1 ? i : this.index + '' + i
          result.unshift(value)
        }
        this.list = result.concat(this.list)
        this.isRefreshing = false
        this.isDropDown = false
        this.dropDownState = 1
        this.top = 0
        this.$nextTick(() => {
          var container = this.$el.querySelector('#list')
          container.scrollTop = container.scrollHeight - this.scrollHeight
        })
      }, 300)
    },

    // 开始
    touchStart(e) {
      this.startY = e.targetTouches[0].pageY
      var container = this.$el.querySelector('#list')
      this.scrollHeight = container.scrollHeight
    },
    // 滑动
    touchMove(e) {
      this.scrollIsToTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      var container = this.$el.querySelector('#list')
      if (e.targetTouches[0].pageY > this.startY && container.scrollTop === 0) {
        this.isDropDown = true
        if (this.scrollIsToTop === 0 && !this.isRefreshing) {
          const diff =
            e.targetTouches[0].pageY - this.startY - this.scrollIsToTop
          this.top =
            Math.pow(diff, 0.8) +
            (this.dropDownState === 3 ? this.defaultOffset : 0)
          if (this.top >= this.defaultOffset) {
            this.dropDownState = 2
            e.preventDefault()
          } else {
            this.dropDownState = 1
            e.preventDefault()
          }
        }
      } else {
        this.isDropDown = false
        this.dropDownState = 1
      }
    },

    // 触摸结束
    touchEnd(e) {
      if (this.isDropDown && !this.isRefreshing) {
        if (this.top >= this.defaultOffset) {
          this.refresh()
          this.isRefreshing = true
        } else {
          this.isRefreshing = false
          this.isDropDown = false
          this.dropDownState = 1
          this.top = 0
        }
      }
    },

    // 刷新
    refresh() {
      this.dropDownState = 3
      this.top = this.defaultOffset
      this.index++
      this.getHistory()
    }
  }
}
</script>

<style>
.drop {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container {
  height: 100%;
  overflow: hidden;
}

.histroy {
  padding: 0 1rem;
  height: 100%;
  /* overflow-y: auto; */
  box-sizing: border-box;
}
.histroy li {
  font-size: 1.4rem;
  box-sizing: border-box;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px dashed #dddddd;
}
</style>
