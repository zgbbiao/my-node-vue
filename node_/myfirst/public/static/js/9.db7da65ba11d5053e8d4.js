webpackJsonp([9],{460:function(e,t,o){function n(e){o(636),o(635)}var i=o(8)(o(556),o(672),n,"data-v-2e99bfab",null);e.exports=i.exports},497:function(e,t,o){"use strict";t.__esModule=!0;var n=o(502),i=function(e){return e&&e.__esModule?e:{default:e}}(n);t.default=function(e,t,o){return t in e?(0,i.default)(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}},502:function(e,t,o){e.exports={default:o(503),__esModule:!0}},503:function(e,t,o){o(504);var n=o(18).Object;e.exports=function(e,t,o){return n.defineProperty(e,t,o)}},504:function(e,t,o){var n=o(28);n(n.S+n.F*!o(35),"Object",{defineProperty:o(34).f})},556:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o(497),i=o.n(n);t.default={data:function(){var e;return e={json_list:[],video_size:"1M",video_duration:"11s",video_create_timestamp:"2017-08-10 17:03:54",video_name:"p.video",porn_count:100,sex_count:200,porn_percent:10},i()(e,"sex_count",500),i()(e,"sex_percent",70),i()(e,"is_video",!0),i()(e,"is_img",!1),i()(e,"video_src",""),i()(e,"img_result",""),i()(e,"page_result_list",[]),i()(e,"video_result",[{level:0,time:1,duration:"1s",confidence:"0.67"},{level:0,time:2,duration:"3s",confidence:"0.71"},{level:0,time:5,duration:"1s",confidence:"0.98"},{level:0,time:6,duration:"1s",confidence:"0.61"},{level:0,time:7,duration:"10s",confidence:"0.38"}]),i()(e,"columns6",[{title:"级别",key:"level",render:function(e,t){var o="";return 0===t.row.level?o="黄色镜头":1===t.row.level&&(o="性感镜头"),e("div",[e("strong",o)])},filters:[{label:"黄色镜头",value:1},{label:"性感镜头",value:2}],filterMultiple:!1,filterMethod:function(e,t){return 1===e?0===t.level:2===e?1===t.level:void 0}},{title:"出现时刻",render:function(e,t){return e("div",[e("strong",{style:{color:"#2d8cf0",cursor:"pointer"}},t.row.time)])}},{title:"持续时间",render:function(e,t){return e("div",[e("strong",t.row.duration)])}},{title:"置信度",render:function(e,t){return e("div",[e("strong",t.row.confidence)])},filters:[{label:"大于0.90",value:1},{label:"小于0.90",value:2}],filterMultiple:!1,filterMethod:function(e,t){return 1===e?t.confidence>=.9:2===e?t.confidence<.9:void 0}}]),e},created:function(){},mounted:function(){this.$route.params.id},methods:{}}},607:function(e,t,o){t=e.exports=o(444)(!0),t.push([e.i,'.demo-i-circle-custom h1{color:#3f414d;font-size:10px;font-weight:400}.demo-i-circle-custom p{color:#657180;font-size:8px;margin:5px 0 2px}.demo-i-circle-custom span{display:block;padding-top:15px;color:#657180;font-size:10px}.demo-i-circle-custom span :before{content:"";display:block;width:50px;height:1px;margin:0 auto;background:#e0e3e6;position:relative;top:-20px}.demo-i-circle-custom span i{font-style:normal;color:#3f414d}',"",{version:3,sources:["E:/wanpWWW/node-vue-react-mongodb/vue_/src/views/TableDetail.vue"],names:[],mappings:"AACA,yBACI,cAAe,AACf,eAAgB,AAChB,eAAoB,CACvB,AACD,wBACI,cAAe,AACf,cAAe,AACf,gBAAkB,CACrB,AACD,2BACI,cAAe,AACf,iBAAkB,AAClB,cAAe,AACf,cAAgB,CACnB,AACD,mCACQ,WAAY,AACZ,cAAe,AACf,WAAY,AACZ,WAAY,AACZ,cAAe,AACf,mBAAoB,AACpB,kBAAmB,AACnB,SAAW,CAClB,AACD,6BACI,kBAAmB,AACnB,aAAe,CAClB",file:"TableDetail.vue",sourcesContent:["\n.demo-i-circle-custom h1{\n    color: #3f414d;\n    font-size: 10px;\n    font-weight: normal;\n}\n.demo-i-circle-custom p{\n    color: #657180;\n    font-size: 8px;\n    margin: 5px 0 2px;\n}\n.demo-i-circle-custom span{\n    display: block;\n    padding-top: 15px;\n    color: #657180;\n    font-size: 10px;\n}\n.demo-i-circle-custom span :before{\n        content: '';\n        display: block;\n        width: 50px;\n        height: 1px;\n        margin: 0 auto;\n        background: #e0e3e6;\n        position: relative;\n        top: -20px;\n}\n.demo-i-circle-custom span i{\n    font-style: normal;\n    color: #3f414d;\n}\n"],sourceRoot:""}])},608:function(e,t,o){t=e.exports=o(444)(!0),t.push([e.i,".expand-row[data-v-2e99bfab]{margin-bottom:16px}","",{version:3,sources:["E:/wanpWWW/node-vue-react-mongodb/vue_/src/views/TableDetail.vue"],names:[],mappings:"AACA,6BACI,kBAAoB,CACvB",file:"TableDetail.vue",sourcesContent:["\n.expand-row[data-v-2e99bfab]{\n    margin-bottom: 16px;\n}\n"],sourceRoot:""}])},635:function(e,t,o){var n=o(607);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);o(445)("37708f4f",n,!0)},636:function(e,t,o){var n=o(608);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);o(445)("6aea8261",n,!0)},672:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"animated fadeIn",staticStyle:{"margin-top":"50px"}},[o("Row",[o("Col",{attrs:{span:"18"}},[o("div",{staticStyle:{"text-align":"center"}},[e.is_video?o("video",{attrs:{controls:"",height:"300",id:"video",preload:"auto",src:"http://otl6ypoog.bkt.clouddn.com/Objectstoarge/videos/2017-08-14/65055_WeChatSight38.mp4"}}):e._e()])]),e._v(" "),o("Col",{attrs:{span:"6"}},[o("Card",[e.is_video?o("div",[o("p",{slot:"title"},[e._v("视频名称:"+e._s(e.video_name))]),e._v(" "),o("p",[e._v("上传时间:"+e._s(e.video_create_timestamp))]),e._v(" "),o("p",[e._v("视频长度:"+e._s(e.video_duration))]),e._v(" "),o("p",[e._v("文件大小: "+e._s(e.video_size))]),e._v(" "),o("p",[e._v("识别结果")]),e._v(" "),o("i-circle",{attrs:{size:100,"trail-width":4,"stroke-width":5,percent:e.sex_percent,"stroke-linecap":"square","stroke-color":"#ff9900"}},[o("div",{staticClass:"demo-i-circle-custom"},[o("h1",[e._v(e._s(e.sex_count))]),e._v(" "),o("p",[e._v("性感镜头数")]),e._v(" "),o("span",[e._v("\n                                 总占比\n                                 "),o("i",[e._v(e._s(e.sex_percent+"%"))])])])]),e._v(" "),o("i-circle",{attrs:{size:100,"trail-width":4,"stroke-width":5,percent:e.porn_percent,"stroke-linecap":"square","stroke-color":"#ed3f14"}},[o("div",{staticClass:"demo-i-circle-custom"},[o("h1",[e._v(e._s(e.porn_count))]),e._v(" "),o("p",[e._v("涉黄镜头数")]),e._v(" "),o("span",[e._v("\n                                 总占比\n                                 "),o("i",[e._v(e._s(e.porn_percent+"%"))])])])])],1):e.is_img?o("div",[o("p",{slot:"title"},[e._v("图片名称:"+e._s(e.video_name))]),e._v(" "),o("p",[e._v("上传时间:"+e._s(e.video_create_timestamp))]),e._v(" "),o("p",[e._v("文件大小: "+e._s(e.video_size))]),e._v(" "),o("p",[e._v("识别结果")]),e._v(" "),o("h3",{staticStyle:{"margin-top":"30px","text-align":"center"}},[o("strong",[e._v(e._s(e.img_result))])])]):e._e()])],1)],1),e._v(" "),e.is_video?o("Row",[o("Col",{attrs:{span:"24"}},[o("Table",{attrs:{border:"",columns:e.columns6,data:e.video_result}}),e._v(" "),o("Page",{staticStyle:{"text-align":"right","margin-top":"50px"},attrs:{total:this.video_result.length,"show-total":""},on:{"on-change":e.setInitPage}})],1)],1):e._e()],1)},staticRenderFns:[]}}});
//# sourceMappingURL=9.db7da65ba11d5053e8d4.js.map