var __awaiter=this&&this.__awaiter||function(t,o,e,i){function n(t){return t instanceof e?t:new e((function(o){o(t)}))}return new(e||(e=Promise))((function(e,r){function s(t){try{a(i.next(t))}catch(o){r(o)}}function l(t){try{a(i["throw"](t))}catch(o){r(o)}}function a(t){t.done?e(t.value):n(t.value).then(s,l)}a((i=i.apply(t,o||[])).next())}))};var __generator=this&&this.__generator||function(t,o){var e={label:0,sent:function(){if(r[0]&1)throw r[1];return r[1]},trys:[],ops:[]},i,n,r,s;return s={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(s[Symbol.iterator]=function(){return this}),s;function l(t){return function(o){return a([t,o])}}function a(s){if(i)throw new TypeError("Generator is already executing.");while(e)try{if(i=1,n&&(r=s[0]&2?n["return"]:s[0]?n["throw"]||((r=n["return"])&&r.call(n),0):n.next)&&!(r=r.call(n,s[1])).done)return r;if(n=0,r)s=[s[0]&2,r.value];switch(s[0]){case 0:case 1:r=s;break;case 4:e.label++;return{value:s[1],done:false};case 5:e.label++;n=s[1];s=[0];continue;case 7:s=e.ops.pop();e.trys.pop();continue;default:if(!(r=e.trys,r=r.length>0&&r[r.length-1])&&(s[0]===6||s[0]===2)){e=0;continue}if(s[0]===3&&(!r||s[1]>r[0]&&s[1]<r[3])){e.label=s[1];break}if(s[0]===6&&e.label<r[1]){e.label=r[1];r=s;break}if(r&&e.label<r[2]){e.label=r[2];e.ops.push(s);break}if(r[2])e.ops.pop();e.trys.pop();continue}s=o.call(t,e)}catch(l){s=[6,l];n=0}finally{i=r=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};System.register(["./p-08f94380.system.js"],(function(t){"use strict";var o,e,i,n;return{setters:[function(t){o=t.r;e=t.c;i=t.h;n=t.g}],execute:function(){var r=".hs-modal[role=dialog]{position:fixed;top:50%;left:50%;z-index:500;display:block;width:75%;overflow:hidden;background-color:#fff;border:0 solid #74748c;border-radius:4px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);visibility:hidden;opacity:0}.hs-modal[role=dialog]>.hs-card{background-color:transparent;-webkit-box-shadow:none;box-shadow:none}.hs-modal[role=dialog]>.hs-card .hs-card__body{position:relative}.hs-modal[role=dialog].hs-modal--ghost{color:#fff;background-color:transparent}.hs-modal[role=dialog].hs-modal--ghost .hs-heading{color:#fff}.hs-modal[role=dialog].hs-modal--full{top:1em;left:1em;width:calc(100% - 2em);height:calc(100% - 2em);-webkit-transform:none;transform:none}.hs-modal[role=dialog].hs-modal--full .hs-card__body{position:absolute;top:3.5em;bottom:4em;width:100%;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.hs-modal[role=dialog].hs-modal--full .hs-card__footer{position:absolute;bottom:0;width:100%}.hs-modal[role=dialog].hs-modal--visible{visibility:visible;opacity:1}.hs-button--close{top:0.5em}";var s=t("hs_modal",function(){function t(t){o(this,t);this.ghost=false;this.full=false;this.open=false;this.dismissible=false;this._isOpen=false;this.onClose=e(this,"close",7)}t.prototype.close=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this._isOpen=false;this.onClose.emit();return[2]}))}))};t.prototype.show=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){this._isOpen=true;return[2]}))}))};t.prototype.isOpen=function(){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(t){return[2,this._isOpen]}))}))};t.prototype.componentWillLoad=function(){this._isOpen=this.open};t.prototype.dismiss=function(){if(this.dismissible)this.close()};t.prototype.render=function(){var t=this;var o=this.ghost?"hs-modal--ghost":"";var e=this.full?"hs-modal--full":"";var n=this._isOpen?"hs-modal--visible":"";var r=this._isOpen?"hs-overlay--visible":"";return[i("div",{"aria-hidden":true,onClick:function(){return t.dismiss()},class:"hs-overlay hs-overlay--fullpage "+r}),i("div",{role:"dialog",class:"hs-modal "+o+" "+e+" "+n},this.dismissible&&i("button",{type:"button",class:"hs-button hs-button--close",onClick:function(){return t.close()}},"×"),i("slot",null))]};Object.defineProperty(t.prototype,"elem",{get:function(){return n(this)},enumerable:false,configurable:true});return t}());s.style=r}}}));