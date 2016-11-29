var indexTpl = require('../tpls/index.string');
var homeTpl = require('../tpls/home.string');

//引入vue
var Vue = require('../libs/vue');
//引入vue-resource
var VueResource = require('../libs/vue-resource');
//启用vue-resource
Vue.use(VueResource);
import commonUtil from "../util/utils";

commonUtil.render(homeTpl);

new Vue({
	el:"#box",
	data:{
		curIndex:0,
		listNav:['足球生活','足球赛事','足球美女'],
		list:[],
		footer:indexTpl
	},
	methods:{
		dataFormat:function(data){//将一维数组转化成二维数组
			var tempArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[i*2],data[i*2+1]);
			}
			return tempArr;
		},
		switchSwiper(index) {
		  this.curIndex = index;
		  mySwiper.slideTo(index);
		}
	},
	created:function(){
		this.$http.get('/mock/livelist.json')
			.then((response)=>{
				this.list=this.dataFormat(response.data.data);
			},(response)=> {
				alert("数据接收失败");
			});
		setTimeout(function(){
			var myiscroll=new IScroll("#scroller",{
				"click":true
			})
		},1000);
		setTimeout(function(){
			var swiper = new Swiper("#home-swiper",{
				onSlideChangeStart: function(){
				  that.curIndex = mySwiper.activeIndex;
				}
			})
		},500)
	}

})
