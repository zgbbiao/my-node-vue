webpackJsonp([36],{471:function(n,e,t){var o=t(8)(t(567),t(683),null,null,null);n.exports=o.exports},567:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{modal1:!1}},methods:{ok:function(){this.modal1=!1,this.$Message.info("点击了确定")},cancel:function(){this.$Message.info("点击了取消")}}}},683:function(n,e){n.exports={render:function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",[t("Button",{attrs:{type:"primary"},on:{click:function(e){n.modal1=!0}}},[n._v("显示对话框")]),n._v(" "),t("Modal",{attrs:{title:"普通的Modal对话框标题"},on:{"on-ok":n.ok,"on-cancel":n.cancel},model:{value:n.modal1,callback:function(e){n.modal1=e},expression:"modal1"}},[t("p",[n._v("对话框内容")]),n._v(" "),t("p",[n._v("对话框内容")]),n._v(" "),t("p",[n._v("对话框内容")])])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=36.81b3c89e4fad7a829e32.js.map