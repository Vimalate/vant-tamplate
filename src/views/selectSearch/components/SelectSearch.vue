<template>
  <div :class="{ 'van-hairline--bottom': border }">
    <van-row gutter="5">
      <van-col :span="dropdownSpan" v-for="(optionItem, key, index) in option" :key="index">
        <van-dropdown-menu>
          <van-dropdown-item v-model="form[key]" :options="optionItem" />
        </van-dropdown-menu>
      </van-col>
      <van-col :span="searchSpan">
        <van-search shape="round" v-model="form[searchValue]" :placeholder="placeholder">
          <template #left-icon>
            <img class="icon" height="20px" width="20px" src="./img/search.png" alt="">
          </template>
        </van-search>
      </van-col>
    </van-row>
  </div>

</template>

<script>
import { debounce } from './tools'
export default {
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          // selectkey1: [{ text: '默认排序', value: 0 },
          // { text: '按紧急程度', value: 1 },
          // { text: '按最近创建时间', value: 2 },
          // { text: '按最早截止时间', value: 3 }]
          // // selectkey2: [{ text: '默认排序', value: 'a' },
          // // { text: '好评排序', value: 'b' },
          // // { text: '销量排序', value: 'c' },]
        }
      }
    },
    form: {
      type: Object,
      default: () => ({})
    },
    dropdownSpan: {
      type: Number,
      default: 7
    },
    border: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    searchValue: {
      type: String,
      required: true
    },
    defaultLoad: {
      type: Boolean,
      default: true

    }
  },
  data() {
    return {
      searchForm: {},
      search: ''
    }
  },
  computed: {
    searchSpan() {
      return 24 - Object.keys(this.option).length * this.dropdownSpan
    }
  },
  watch: {
    // searchForm: {
    //   handler(val) {
    //     // console.log('form[searchValue]', val)
    //     // this.$emit('update:form', this.searchForm)
    //     this.loadList()
    //   },
    //   deep: true
    // },
    form: {
      handler(val) {
        console.log('123')
        this.loadList()
      },
      deep: true
    }
  },
  created() {
    this.searchForm = JSON.parse(JSON.stringify(this.form))
  },
  mounted() {
    console.log(this.defaultLoad)
    this.defaultLoad && this.loadList()
  },
  methods: {
    loadList() {
      debounce(() => {
        // this.$emit('update:form', this.searchForm)
        this.$emit('loadList')
      }, 500)
      // this.$emit('update:form', this.searchForm)
      // this.$emit('loadList')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.van-dropdown-menu {
  .van-dropdown-menu__bar {
    height: 52px;
    box-shadow: none;

    .van-dropdown-menu__item {
      .van-dropdown-menu__title {
        font-size: 14px;
        color: #515E78;

        &::after {
          border-color: transparent transparent currentColor currentColor;
        }
      }
    }
  }

  .van-cell__title {
    color: #515E78;
  }

  .van-dropdown-item__option--active {
    background: rgba(74, 134, 255, 0.1);

    .van-cell__title {
      color: #4A86FF !important;
    }
  }

  .van-dropdown-item__option--active .van-dropdown-item__icon {
    color: #4A86FF;
  }

}

::v-deep.van-search {
  height: 52px;
  .van-search__content{
    border: 0.5px solid #bfc4ce;
    background-color: #fff;
  }
  .icon {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-right: 8px;
  }
}
</style>
