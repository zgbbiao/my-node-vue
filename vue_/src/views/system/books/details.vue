<template>
  <div >
      <Input v-model="formItem.title" type="textarea" disabled :rows="1" class='z-mar-t'></Input>
        <Input v-model="formItem.author" disabled placeholder="" class='z-mar-t'></Input>
      <mavonEditor v-model="formItem.content" class='z-mar-t' :subfield='subfield' :toolbars='toolbars' :editable='editable' :default_open='default_open'/>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
// import  { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    data() {
        return {
            formItem: {
                title: '',
                content: `暂无内容`,
                author: '',
                createTime: Date.now()
            },
            saveLoading: false,
            subfield: false,
            editable: false,
            default_open: 'preview',
            toolbars: {
                bold: false, // 粗体
                italic: false,// 斜体
                header: false,// 标题
                underline: false,// 下划线
                strikethrough: false,// 中划线
                mark: false,// 标记
                superscript: false,// 上角标
                subscript: false,// 下角标
                quote: false,// 引用
                ol: false,// 有序列表
                ul: false,// 无序列表
                link: false,// 链接
                imagelink: false,// 图片链接
                code: false,// code
                table: false,// 表格
                subfield: false,// 是否需要分栏
                fullscreen: false,// 全屏编辑
                readmodel: true,// 沉浸式阅读
                htmlcode: false,// 展示html源码
                help: false, // 帮助
                preview: false, // 预览
            }
        }
    },
    created() {
      this.getBook();
    },
  components: {
      mavonEditor
  },
  computed:{
  },
  methods: {
    getBook() {
        var data = {};
        data.id = this.$route.query._id;
        this.vFetch.bookGetId(data).then(res => {
            if (res.status === 200) {
                this.formItem = res.res[0];
            }
            this.$Message.info(res.message);
        }).catch(err => {
            if (err && Object.values(err).length) {
                this.$Message.error(err);
            }
        })
    }
  }
}
</script>
<style>
    .z-mar-t{
        margin-top: 10px;
    }
    .main .container-fluid{
        padding: 0 5px !important;
    }
</style>




