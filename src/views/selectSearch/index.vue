<template>
  <div class="wrap">
    <select-search :option="option" :dropdownSpan="7" :form.sync="form" border searchValue="searchValue"
      @loadList="loadList"></select-search>
  </div>
</template>

<script>
import SelectSearch from './components/SelectSearch'
export default {
  components: { SelectSearch },
  data() {
    return {
      form: {
        selectkey1: 1, // 下拉选择搜索,
        selectkey2: 'a',
        searchValue: '搜索值'// 输入框搜索字段
      },
      option: {
        selectkey1: [
          { text: '默认排序', value: 0 },
          { text: '按紧急程度', value: 1 },
          { text: '按最近创建时间', value: 2 },
          { text: '按最早截止时间', value: 3 }],
        // selectkey2: [{ text: '默认排序', value: 'a' },
        // { text: '好评排序', value: 'b' },
        // { text: '销量排序', value: 'c' }]
      }
    }
  },
  methods: {
    loadList() {
      console.log('form', this.form, '')
    }
  }

}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
  width: 100vw;
  background-color: #fff;
}
</style>
