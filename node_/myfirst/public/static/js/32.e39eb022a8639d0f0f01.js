webpackJsonp([32],{495:function(e,t,n){var s=n(8)(n(591),n(653),null,null,null);s.options.__file="E:\\wanpWWW\\node-vue-react-mongodb\\vue_\\src\\views\\wz.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] wz.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},591:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){var e=this;return{columns1:[{title:"姓名",key:"name"},{title:"年龄",key:"age"},{title:"地址",key:"address"},{title:"操作",key:"action",width:150,align:"center",render:function(t,n){return t("div",[t("Button",{props:{type:"primary",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.show(n.index)}}},"查看"),t("Button",{props:{type:"error",size:"small"},on:{click:function(){e.remove(n.index)}}},"删除")])}}],data1:[{name:"王小明",age:18,address:"北京市朝阳区芍药居"},{name:"张小刚",age:25,address:"北京市海淀区西二旗"},{name:"李小红",age:30,address:"上海市浦东新区世纪大道"},{name:"周小伟",age:26,address:"深圳市南山区深南大道"}]}},methods:{show:function(e){this.$Modal.info({title:"用户信息",content:"姓名："+this.data1[e].name+"<br>年龄："+this.data1[e].age+"<br>地址："+this.data1[e].address})},remove:function(e){this.data1.splice(e,1)}}}},653:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"animated fadeIn"},[n("Row",[n("Col",{attrs:{sm:24,md:24,lg:12}},[n("h3",[e._v("框架在手，天下我有")]),e._v(" "),n("p",[e._v("好用的框架决定了一个程序员的效率")]),e._v(" "),n("Table",{attrs:{columns:e.columns1,data:e.data1}})],1)],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});
//# sourceMappingURL=32.e39eb022a8639d0f0f01.js.map