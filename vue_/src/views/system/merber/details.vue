<template>
    <div>
        <Form ref="editForm" autoComplete="on" :model="editForm" :rules="editRules"  class="card-box login-form " >
                <h2 class='register-title'>会员详情</h2>
                 <Form-item prop="username">
                    <div>
                        <div id="app">
                            <span @click="avatarShow">
                                <Avatar :src="editForm.avatar"    :style='{ width: "100px", height: "100px" }' />
                            </span>
                            <my-upload :field='editForm.username'
                                @crop-success="cropSuccess"
                                @crop-upload-success="cropUploadSuccess"
                                @crop-upload-fail="cropUploadFail"
                                v-model="avatar.show"
                                :width="100"
                                :height="100"
                                url="http://127.0.0.1:3000/merber/avatar"
                                :noSquare='true'
                                :noRotate='false'
                                :params="avatar.params"
                                :headers="avatar.headers"
                                :withCredentials='true'
                                img-format="png"></my-upload>
                            <img :src="avatar.imgDataUrl">
                        </div>
                    </div>
                </Form-item>
                <Form-item prop="username">
                    <Input type="text" v-model="editForm.username" disabled  placeholder="请输入用户名" autoComplete="on" >
                        <Icon type="ios-person-outline" slot="prepend" ></Icon>
                    </Input>
                </Form-item>
                <FormItem label="密码" prop="password">
                    <Input type="password"  disabled v-model="editForm.password"></Input>
                </FormItem>
                <Form-item prop="phone">
                    <Input type="text" v-model="editForm.phone" placeholder="请输入联系号码" autoComplete="on">
                        <Icon type="iphone" slot="prepend" ></Icon>
                    </Input>
                </Form-item>
                <FormItem label="性别" prop="gender" >
                    <RadioGroup v-model="editForm.gender">
                        <Radio label="1">男</Radio>
                        <Radio label="0">女</Radio>
                    </RadioGroup>
                </FormItem>
                <Form-item label='用户类型' prop="jurisdiction" >
                        <Select v-model="editForm.jurisdiction" placeholder="请输入用户类型" >
                        <Option v-for="item in jurisdictionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Form-item>
                <FormItem label="出生日期" prop="age">
                    <DatePicker type="date" placeholder="请选择出生日期" v-model="editForm.age"></DatePicker>
                </FormItem>
                <Form-item prop="memo">
                    <Input v-model="editForm.memo" type="textarea" :autosize="{minRows: 4,maxRows: 10}" placeholder="备注"></Input>
                </Form-item>
                <Form-item>
                    <Button type="primary" @click='handRegister("editForm")' long>保存    </Button>
                </Form-item >
           </Form>
  </div>
</template>
<script>
    import { isWscnEmail, isPhone } from 'utils/validate';
    import myUpload from 'vue-image-crop-upload';
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
        }
        return {
            editForm : {
                username: "admin@01.com",
                jurisdiction: 'teacher-normal',
                phone: "18816780001",
                password: '',
                gender: '1',
                age: '2017-11-10',
                avatar: '',
                memo: '',
                jurisdiction: 'teacher-normal',
            },
            jurisdictionList: [
                {
                    value: 'teacher-normal',
                    label: '普通用户'
                }
            ],
            editRules: {
                username: [
                    { required: true , trigger: "blur"}
                ],
                phone: [
                    { required: true, trigger: 'blur', validator: validatePhone }
                ],
                gender: [
                    { require: true, trigger: 'blur', message: '请选择性别' }
                ],
                jurisdiction: [
                    { require: true, trigger: 'blur', message: '请选择用户类型' }
                ],
                age: [
                    { required: true, type: 'date', message: '请设置出生年月', trigger: 'change' }
                  
                ],
                memo: [
                    { required: true, message: '请做简要描述', trigger: 'blur' },
                    { type: 'string', min: 3, message: '不能少于3个字', trigger: 'blur' }
                ]
            },
            avatar: {
                show: false,
                params: {
                    username: "Nihao"
                },
                imgDataUrl: '',
                // headers: {
                //     'content-type': 'text/plain',
                //     'Content-Disposition': 'multipart/form-data'
                // }
            }
        }
    },
    mounted() {
        this.getUserInfo();
    },
    methods:{
        getUserInfo() {
            var username = this.$route.query.username;
            var token = this.$store.state.user.token;
            var obj = {
                username, token
            };
            this.vFetch.merberInfo(obj).then(res => {
                if (res.status == 200) {
                    this.editForm = Object.assign(this.editForm, res.res[0] );
                    this.avatar.avatarName = this.editForm.username;
                    if (this.editForm.jurisdiction == 'admin') {
                        console.log(this.jurisdictionList);
                        this.jurisdictionList.push({
                                value: 'admin',
                                label: '管理员'
                            })
                    }
                }
                this.$message.info(res.message);
            }).catch(err => {
                if (err) {
                    // this.$message.error(err.toString());
                }
            })
        },
        //提交；
        handRegister(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.editForm.token =  this.$store.state.user.token;
                    this.vFetch.merberEdit(this.editForm).then((res) => {
                        this.$Message.info(res.message);
                        if (res.status === 200) {
                            this.$store.commit('SET_AVATAR', this.editForm.avatar);
                            this.$router.push({ path: '/merber/list' });
                        } 
                    }).catch((err) => {
                        if (err && Object.keys(err).length) {
                            this.$Message.error(err);
                        }
                    })
                }
            })
        },
        avatarShow() {
            this.avatar.show= !this.avatar.show;
        },
        cropSuccess(imgDataUrl, field) {
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
                this.editForm.avatar = imgDataUrl;
        },
        cropUploadSuccess(jsonData, field) {
                            console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
                console.log(this.$store.state);
                var userinfo = this.$store.state.user.userinfo;
                this.editForm.avatar = jsonData.url;
                userinfo.avatar = jsonData.url;
                console.log(userinfo);
                // this.$store.commit('SET_USERINFO', Object.assign(userinfo));
        },
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log(status);
            console.log('field: ' + field);
        }
    },
    components: {
        'my-upload': myUpload
    }
}
</script>
