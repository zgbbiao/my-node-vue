<template>
  <div>
        <div>
            <i-button type="primary" @click="addMerber = !addMerber">添加会员</i-button>
        </div>
        <Table stripe :columns="merberColumns" :data="tableData" size="small" ref="table"></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="skipPage.total" :current="skipPage.currentPage" @on-change="changePage"></Page>
            </div>
        </div>
        <!-- Change Loading Status <Switch v-model="loading"></Switch> -->
        <!-- loading='loading'  -->
            <i-button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> 导出排序和过滤后的数据</i-button>
        <transition name="slide-fade">
            <div v-if='addMerber' class='addMerberForm'>
                <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                    <Form-item label="用户名" prop="username"> 
                        <Input  v-model="formValidate.username" placeholder="请输入姓名"></Input>
                    </Form-item>
                    <Form-item label="密码" prop="password">
                        <Input type='password' v-model="formValidate.password" placeholder="请设置密码"></Input>
                    </Form-item>
                    <Form-item label="手机号码" prop="phone">
                        <Input v-model="formValidate.phone" placeholder="请输入手机号码"></Input>
                    </Form-item>
                    <Form-item label='用户类型' prop="jurisdiction" >
                        <Select v-model="formValidate.jurisdiction" placeholder="请输入用户类型" >
                        <Option v-for="item in jurisdictionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                    <FormItem label="性别" prop="gender" >
                        <RadioGroup v-model="formValidate.gender">
                            <Radio label="1">男</Radio>
                            <Radio label="0">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <Form-item>
                        <i-button type="primary" @click="handleSubmit('formValidate')">提交</i-button>
                        <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</i-button>
                    </Form-item>
                </i-form>
            </div>
        </transition>
  </div>
</template>
<script>
    import { isPhone } from 'utils/validate';
    import tools from 'utils/tools';
    let filterDate = tools.filterDate;
export default {
    data() {
        const validatePhone = (rule, value, callback) => {
          if (!isPhone(value)) {
            callback( new Error('请输入正确的手机号码'));
          } else {
            callback();
          }
        };
        return {
            Collapse: 1,
            loading: false,
            addMerber: false,
            tableData: [
                {
                    "_id": "5a3d1a8af8ac693898b104be",
                    "username": "admin@wz.com",
                    "password": "123456",
                    "jurisdiction": "teacher-normal",
                    "phone": 18816780001,
                    "gender": "1",
                    "age": "2017-11-09T16:00:00.000Z",
                    "__v": 0,
                    "logindate": [
                        1513953930714,
                        1513954480038,
                        1513954592608,
                        1513954622692,
                        1513957796577
                    ]
                }
            ],
            formValidate: {
                username: 'admin@wz15.com',
                password: '123456',
                gender: '1',
                phone: "18816782415",
                jurisdiction: "teacher-normal"
            },
            jurisdictionList: [
                {
                    value: 'teacher-normal',
                    label: '教师'
                }
            ],
            merberColumns: [
                    {
                        'type': 'selection',
                        'width': '30',
                        'align': 'center'
                    },
                    {
                        'title': '姓名',
                        'key': 'username',
                        'width': '180',
                        "sortable": true,
                    },
                    {
                        'title': '联系电话',
                        'key': 'phone',
                        'width': '150',
                        "sortable": true,
                    },
                    {
                        'title': '年龄',
                        'key': 'age',
                        'width': '150',
                        "sortable": true,
                        filters: [
                            {
                                label: '小于20',
                                value: 0
                            },
                            {
                                label: '大于20',
                                value: 1
                            },
                            {
                                label: '大于40',
                                value: 2
                            },
                            {
                                label: '大于60',
                                value: 3
                            },
                            {
                                label: '小于40',
                                value: 4
                            }
                        ],
                        // filterMultiple: false,
                        filterMethod (value, row) {
                            var age = row.age;
                            if (value === 0) {
                                return age < 20;
                            } else if (value === 1) {
                                return age > 20
                            } else if (value === 2) {
                                return age > 40;
                            } else if (value === 3) {
                                return age > 60;
                            } else if (value === 4) {
                                return age<40
                            }
                        }
                    },
                    {
                        'title': '性别',
                        'key': 'gender',
                        'width': '80',
                        "sortable": true,
                    },
                    {
                        'title': '登录时间',
                        'key': 'logindate',
                        'width': '200',
                        "sortable": true,
                    },
                    {
                        'title': '级别',
                        'key': 'jurisdiction',
                        'width': '200',
                        "sortable": true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: (events) => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
            ],
            ruleValidate: {
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ],
                    gender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    phone: [
                        { required: true, trigger: "blur" , validator: validatePhone }
                    ],
                    jurisdiction: [
                        { required: true, message: '请选择用户类型', trigger: "blur" }
                    ]
            },
            skipPage: {
                pageSize : 10,
                currentPage: 1,
                sort: {'logindate': -1},
                condition: {},
                total: 0,
            }
        }
    },
  methods: {
      // 请求数据
    reqMerberList() {
        this.vFetch.merberList(this.skipPage).then(res => {
            this.$Message.info(res.message);
            if (res.status === 200) {
                var obj = [];
                res.res.forEach((item, i) => {
                    for (var key in item) {
                        var value = item[key];
                        if (key === 'gender') {
                            if (value === '1') {
                                value = '男';
                            } else if (value === '0') {
                                value = '女';
                            }
                        }
                        if (key === 'age') {
                            value = filterDate(value);
                        }
                        if (key === 'logindate') {
                            value = Array.isArray(value) ? value[value.length-1] : value;
                            value = filterDate(value);
                        }
                        if (/^\__/.test(key)) {
                            key = key.slice(2);
                        } else if (/^\_/.test(key)) {
                            key = key.slice(1);
                        } 
                        // 当不存在， 就常见对象；
                        if (!obj[i]) {
                            obj[i] = {};
                        }
                        obj[i][key] = value;
                    }
                })
                //更新数据；
                this.tableData = obj;
                this.skipPage.total = res.total;
                this.skipPage.currentPage = res.page;
                this.$forceUpdate()
            }
        })
    },
    exportData (type) {
        this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
        });
    },
    edit (index) {
        this.$router.push({path: '/merber/details', query: { username: this.tableData[index].username }})
        // this.$Modal.info({
        //     title: '用户信息',
        //     content: `姓名：<br>年龄：<br>地址：`
        // })
    },
    remove (index) {
        var obj = {
            username: this.tableData[index].username,
            // username: '1',
            token: this.$store.state.user.token
        }
        this.vFetch.merberRemove(obj).then(res => {
            this.$Message.info(res.message);
            if (res.status === 200) {
                this.tableData.splice(index, 1);
                // this.$router.push({ path: '/merber/list' });
            }
        })
    },
    btnMerberOk () {
        this.$Message.info('点击了确定');
    },
    btnMerberCancel () {
        this.$Message.info('点击了取消');
    },
    // 添加数据；
    handleSubmit (name) {
        if (this.loading) {
            return ;
        }
        this.loading = true;
        this.$refs[name].validate((valid) => {
            if (valid) {
                var obj = this.formValidate;
                obj.token = this.$store.state.user.token;
                this.vFetch.addMerber(obj).then(res => {
                    this.$Message.success(res.message);
                    this.loading = false;
                    if (res.status === 200) {
                        this.addMerber = !this.addMerber;
                        this.$router.push({ path: '/merber/list' });
                    }
                }).catch(err => {
                    if (err) {
                        this.$Message.error(err);
                    }
                    this.loading = false;
                })
            } else {
                this.$Message.error('表单验证失败!');
                this.loading = false;
            }
        })
    },
    handleReset (name) {
        for (var key in this.formValidate) {
            var value = this.formValidate[key];
            this.formValidate[key] = '';
        }
    },
    changePage(index) {
        this.skipPage.currentPage = index;
        this.reqMerberList();
    }
  },
  mounted() {
    this.reqMerberList();
  }
}
</script>
<style>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
    transition: all .3s ease;
    }
    .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
    }

    .addMerberForm{
        position: absolute;
        top: 160px;
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 30px;
        z-index: 10;
    }
</style>

