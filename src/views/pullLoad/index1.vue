<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-cell v-for="(item,index) in list" :key="index" :title="item" :ref="`ref_messages_nodes${item}`" />
  </van-pull-refresh>
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
    this.onLoad()
  },
  methods: {
    handleRef(ref) {
      console.log(ref)
    },
    onLoad() {
      setTimeout(() => {
        const result = []
        if (this.refreshing) {
          // this.list = []
          this.refreshing = false
        }
        this.topDom = `ref_messages_nodes${this.list.length}`
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
