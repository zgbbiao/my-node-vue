<template>
  <div>
      <Input v-model="formItem.title" type="textarea" :rows="1" placeholder="请输入标题" class='z-mar-t'></Input>
        <Input v-model="formItem.author" disabled placeholder="" class='z-mar-t'></Input>
        <mavonEditor v-model="formItem.content" class='z-mar-t'/>
      <Button type="success" long class='z-mar-t' @click='save' :loading="saveLoading" >提交</Button>
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
                author: this.$store.state.user.username,
                createTime: Date.now()
            },
            saveLoading: false
        }
    },
  components: {
      mavonEditor
  },
  computed:{

  },
  methods: {
    save() {
        this.saveLoading = true;
        for (let key in this.formItem) {
            let value = this.formItem[key];
            if (!value) {
                this.saveLoading = false;
                this.$Message.info('内容不能为空');
                return ;
            }
        }
        this.vFetch.booksAdd(this.formItem).then(res => {
            this.saveLoading = false;
            if (res.status === 200) {
                this.$router.push({ path:'/books/catalogue' });
            }
            this.$Message.info(res.message);
        }).catch(err => {
            if (err) {
                this.$Message.info(res.message);
            }
        });
    }
  }
}
</script>
<style>
    .z-mar-t{
        margin-top: 10px;
    }
</style>


