webpackJsonp([1],{NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("7+uW"),n={render:function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"cell",class:{alive:this.state}})},staticRenderFns:[]};var l={name:"board",props:["height","width","alives"],components:{cell:i("VU/8")({name:"cell",props:["state"]},n,!1,function(e){i("o10c")},"data-v-68dc9328",null).exports}},r={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"col-xs-9 board"},e._l(e.height,function(t,s){return i("div",{key:t},e._l(e.width,function(t,n){return i("cell",{key:t,attrs:{state:e.alives[s].indexOf(n)>=0},nativeOn:{click:function(t){e.$emit("cell-click",s,n)}}})}))}))},staticRenderFns:[]},a={name:"GameOfLife",components:{board:i("VU/8")(l,r,!1,null,null,null).exports},data:function(){return{alives:[],size:15,clock:{interval:null,speed:700},lifeCycle:0}},created:function(){this.updateGrid()},methods:{place:function(e,t){this.isAlive(e,t)||this.alives[e].push(t)},clear:function(){this.stop(),this.updateGrid(!0)},increase:function(){this.size++,this.updateGrid()},decrease:function(){this.size>1&&(this.size--,this.updateGrid())},isAlive:function(e,t){return!!this.alives[e]&&this.alives[e].indexOf(t)>=0},willBeAlive:function(e,t){var i=this.getAliveNeighboursCount(e,t);return this.isAlive(e,t)&&2===i||3===i},getAliveNeighboursCount:function(e,t){for(var i=0,s=e-1;s<=e+1;s++)for(var n=t-1;n<=t+1;n++)this.isAlive(s,n)&&i++;return this.isAlive(e,t)&&i--,i},updateGrid:function(){for(var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[],i=this.size,s=0;s<i;s++)!e&&s<this.alives.length?t[s]=this.alives[s].filter(function(e){return e<i}):t[s]=[];this.alives=t},updateCell:function(e,t){var i=this.alives[e].indexOf(t);i>=0?this.alives[e].splice(i,1):this.alives[e].push(t)},next:function(){for(var e=[],t=0;t<this.size;t++){e[t]=[];for(var i=0;i<this.size;i++)this.willBeAlive(t,i)&&e[t].push(i)}this.arraysEqual(this.alives,e)?this.stop(!1):(this.alives=e,this.lifeCycle++)},start:function(){this.stop(),this.clock.interval=setInterval(this.next,this.clock.speed)},stop:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];clearInterval(this.clock.interval),e&&(this.lifeCycle=0)},arraysEqual:function(e,t){if(e===t)return!0;if(null===e||null===t||e.length!==t.length)return!1;for(var i=0;i<e.length;++i)if(e[i]instanceof Array&&t[i]instanceof Array){if(!this.arraysEqual(e[i],t[i]))return!1}else if(e[i]!==t[i])return!1;return!0}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",[e._v("\n    Board size: "+e._s(e.size)+" * "+e._s(e.size)+"\n    "),i("button",{on:{click:e.decrease}},[e._v("-1")]),e._v(" "),i("button",{on:{click:e.increase}},[e._v("+1")])]),e._v(" "),i("board",{staticClass:"col-xs-9 board",attrs:{width:e.size,height:e.size,alives:e.alives},on:{"cell-click":e.updateCell}}),e._v(" "),i("div",[i("button",{on:{click:e.start}},[e._v("Toggle life")]),e._v(" "),i("button",{on:{click:e.stop}},[e._v("Stop life.")]),e._v(" "),i("button",{on:{click:e.next}},[e._v("Step forward")]),e._v(" "),i("button",{on:{click:e.clear}},[e._v("Clear board")])]),e._v(" "),i("div",[i("label",{attrs:{for:"lifeCycleDuration"}},[e._v("Life cycle duration")]),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.clock.speed,expression:"clock.speed"}],attrs:{type:"range",id:"lifeCycleDuration",min:"100",max:"5000",step:"100"},domProps:{value:e.clock.speed},on:{__r:function(t){e.$set(e.clock,"speed",t.target.value)}}}),e._v("\n    "+e._s(e.clock.speed/1e3+"sec")+"\n  ")]),e._v(" "),i("div",[e._v("\n    Cycle #"+e._s(e.lifeCycle)+"\n  ")])],1)},staticRenderFns:[]},o=i("VU/8")(a,c,!1,null,null,null).exports;new s.a({el:"#app",components:{"game-of-life":o},template:"<game-of-life/>"})},o10c:function(e,t){}},["NHnr"]);