<template>
  <div class='z-text-cen'>
      <ul>
                <router-link tag="li" :to="{ path: '/books/details', query: { _id: item._id } }" v-for='(item, key) in list' :data-id='item._id' :key="item._id" class='z-mar-t-10 z-bg-fff'>
                    <a>
                        <p>
                            标题: {{item.title}}
                        </p>
                        <p>
                            作者： {{item.author}}
                        </p>
                        <p>
                            创建时间： {{item.createTime}}
                        </p>
                        <p v-if='$store.state.user.userinfo.jurisdiction==="admin"'>
                            <Button type="error" icon="trash-a" @click.prevent='setDeleteBook(item._id)' >删除</Button>
                        </p>
                    </a>
                </router-link>
      </ul>
      <Page :total="page.total" show-total @on-change='pageTurn'></Page>
  </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'

// import  { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
    data() {
        return {
            list: [],
            saveLoading: false,
            page: {
                current: 1,
                pageSize: 10,
                total: 0,
                condition: {},
                sort: {'createTime': -1}
            }
        }
    },
    created () {
        this.getList();
    },
  components: {
      mavonEditor
  },
  computed:{

  },
  methods: {
    getList() {
        this.saveLoading = false;
        // var opt = { 'author': 1, 'content': 0 , 'createTime': 1, 'title': 1, '_id': 1  };
        var opt = { 'content': 0  };

        this.vFetch.booksGet({ data: this.page, opt } ).then(res => {
            this.saveLoading = true;
            this.$Message.info(res.message);
            if ( res.status === 200) {
                this.list = res.res;
                res.res.forEach((item, i) => {
                    return this.$store.dispatch('FilterDate', item.createTime).then( date => { 
                        this.list[i].createTime = date
                     } ).catch(err=> { })
                })
                this.page.total = res.total;
                this.page.current = res.current;
            }
        }).catch(err => {
            if (err && Object.values(err).length) {
                this.$Message.error(err.message);
            }
        });
    },
    pageTurn(index) {
        this.page.current = index;
        this.getList();
    },
    setDeleteBook(id) {
        this.vFetch.bookDelete({ id: id }).then(res => {
            if (res.status === 200) {
                this.getList();
            }
            this.$Message.info(res.message);
        }).catch(err => {
            if (err && Object.values(err).length) {
                this.$Message.error(err.message);
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
    .z-text-cen{
        text-align: center;
    }
    .z-mar-t-10{
        margin-top: 10px;
    }
    .z-bg-fff{
        background:#fff;
    }
</style>


