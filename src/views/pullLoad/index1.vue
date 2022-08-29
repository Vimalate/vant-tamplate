<template>
  <div>
    <van-nav-bar fixed title="标题" left-text="返回" right-text="按钮" left-arrow />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-cell size='large' v-for="(item,index) in list" :key="index" :title="item" :ref="`ref_messages_nodes${item}`" />
    </van-pull-refresh>
  </div>

</template>

<script>
export default {
  data() {
    return {
      index: 0,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      topDom: null
    }
  },
  mounted() {
    this.onLoad('ref_messages_nodes0')
  },
  methods: {
    handleRef(ref) {
      console.log(ref)
    },
    onLoad(dom) {
      setTimeout(() => {
        const result = []
        if (this.refreshing) {
          // this.list = []
          this.refreshing = false
        }
        this.topDom = `ref_messages_nodes${dom || this.list.length}`
        console.log(this.topDom)
        for (let i = 0; i < 15; i++) {
          const value = this.list.length + i + 1
          result.unshift(value)
        }
        this.list = result.concat(this.list)
        this.loading = false

        if (this.list.length >= 60) {
          this.finished = true
        }
        this.handleScroll()
      }, 300)
    },
    handleScroll() {
      const refName = this.topDom
      this.$nextTick(() => {
        this.$refs[refName] && this.$refs[refName][0].scrollIntoView()
      })
    },
    onRefresh() {
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
