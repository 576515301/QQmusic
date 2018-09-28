<template>	
	<div id="searchPage">
		<div class="searchBox">
			<div class="inpBox">
				<div class="inpBg">
					<form id="search_form" action="#" @submit.prevent="searchFun" onsubmit="return false">
						<input type="text" placeholder="搜索歌曲、歌单、专辑" autocomplete="off" @focus="trueFoc" v-model="searchMsg">
					</form>
				</div>
				<span class="searchIcon">搜索</span>
				<span class="delInp"></span>
			</div>
			<div v-if="focus" class="close" @click="falseFoc">取消</div>
		</div>
		<!-- 热门搜索 -->
		<div class="transitionBox">
			<transition name="switch">
				<div class="hotSearch" v-if="!focus">
					<h2 class="title">热门搜索</h2>
					<div class="hotBox">
						<ul class="hotList" v-if="hotSearch">
							<li class="hotItem">
								<a :href="hotSearch.special_url || ''">{{hotSearch.special_key}}</a>
							</li>
							<li class="hotItem" v-for="(v,index) in hotSearch.hotkey" v-if="index<10" @click="hotClick(v.k)">{{v.k}}</li>
						</ul>
					</div>
				</div>
			</transition>
			<!-- 搜索历史 -->
			<transition name="switch">
				<div class="hisSearch" v-if="focus">
					<ul class="hisList">
						<li class="hisItem" v-for="(v,index) in hotHis" @click="hotClick(v)">
							<span class="hisIcon"></span>
							<span class="hisName">{{v}}</span>
							<span class="delHis" @click.stop="delHis(index)"></span>
						</li>
					</ul>
					<div class="cleanHis" v-if="hotHis.length">
						<span class="clean" @click="cleanHis">清除搜索记录</span>
					</div>
				</div>
			</transition>
		</div>
		<div class="alert" :class="{show:alertMsg}" :style="{transitionDuration:time+'ms',fontSize:font+'px'}">{{alertMsg}}</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				timer:0,
				time:150,
				font:14,
				alertMsg:"",
				searchMsg:"",
				hotHis:[],
				searchUrl:"https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&jsonpCallback=jsonp1&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&remoteplace=txt.mqq.all"
			}
		},
		methods:{
			alertShow(msg,time){
				if(this.alertMsg){
					clearTimeout(this.timer);
					this.font = 16;
					setTimeout(()=>{
						this.font = 14;
					},time||100);
				}
				this.show = true;
				this.time = 150;
				this.alertMsg = msg;
				this.timer = setTimeout(()=>{
					this.alertMsg = "";
				},time||2000);
				
			},
			// 设置focus的状态
			trueFoc(){
				this.$store.commit("changeFocus",true);
			},
			falseFoc(){
				this.$store.commit("changeFocus",false);
			},
			// 获取热门搜索
			getHot(){
				
				var time = new Date().getTime();
				var url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=jsonp1&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_="+time;
				this.$jsonP(url,"jsonp1",(res)=>{
					if(!res.code){
						this.$store.commit("reHotSearch",res.data);
					}
				});
			
			},
			// 获取localstorage搜索历史
			getHis(){
				var his = localStorage.getItem("hotHis");
				this.hotHis = his?his.split(","):[];
			},
			// 执行搜索函数
			searchFun(){
				if(this.searchMsg == "")
					return;
				for(var i = 0; i < this.hotHis.length; i++){
					if(this.searchMsg == this.hotHis[i]){
						this.hotHis.splice(i,1);
						break;
					}
				}
				if(this.hotHis.length < 7){
					this.hotHis.unshift(this.searchMsg);
				}else{
					this.hotHis.pop();
					this.hotHis.unshift(this.searchMsg);
				}
				var obj = {
					w:this.searchMsg,
					p:1,
					_:new Date().getTime(),
				}
				this.searchJsonp(obj);
			},
			// 访问搜索接口
			searchJsonp(obj){
				this.searchUrl+="&w=" + obj.w + "&p=" + obj.p + "&_=" + obj._;

				this.$jsonP(this.searchUrl,"jsonp1",(res)=>{
					this.alertShow(res.message);
				})
			},
			// 点击热门搜索
			hotClick(msg){
				this.searchMsg = msg;
				this.trueFoc();
				this.searchFun();
			},
			// 删除某一个搜索历史
			delHis(index){
				this.hotHis.splice(index,1);
			},
			// 清空搜索历史
			cleanHis(){
				this.hotHis = [];
				localStorage.removeItem("hotHis");
			}
		},
		computed:{
			focus(){
				return this.$store.state.focus;
			},
			hotSearch(){
				return this.$store.state.hotSearch;
			}
		},
		created:function(){
			if(!this.hotSearch){
				this.getHot();
			}
			this.getHis();
		},
		watch:{
			hotHis:{
				handler(n,o){
					localStorage.setItem("hotHis",this.hotHis);
				},
				deep:true,
			}
		}
	}
</script>

<style lang="less" scoped>
	#searchPage{
		.searchBox{
			background: #f4f4f4;
			padding:10px;
			height:56px;
			display: flex;
			.inpBox{
				flex:1;
				position:relative;
				z-index: 2;
				&.focus{
					width:90%;
				}
				.inpBg{
					background:#fff;
					border-radius:5px;
					padding:8px 0;
					width:100%;
					height:36px;
					input{
						appearance:textfield;
						display: inline-block;
						width:100%;
						border:none;
						padding-left:35px;
						font-size:14px;
						color:rgba(0,0,0,.3);
					}
				}
				.searchIcon{
					position:absolute;
					top:50%;
					left:10px;
					margin-top:-9px;
					width:18px;
					height:18px;
					text-indent:-999px;
					background:url("../assets/img/searchIcon.png") no-repeat;
					background-size:100% 100%;
				}
			}
			.close{
				height:100%;
				padding:0 10px;
				line-height:36px;
				font-size:14px;
			}
		}
		.transitionBox{
			position:relative;
		}
		.hotSearch{
			position:absolute;
			top:0;
			left:0;
			padding:15px;
			h2.title{
				font-size:14px;
				color:rgba(0,0,0,.6);
				margin-bottom:8px;
			}
			.hotBox{
				width:100%;
				.hotList{
					.hotItem{
						font-size:14px;
						float:left;
						height:32px;
						line-height:30px;
						border:1px solid rgba(0,0,0,.6);
						border-radius:15px;
						padding:0 10px;
						color:#000;
						margin-right:14px;
						margin-bottom:10px;
						&:first-child{
							a{
								display: block;
								width:100%;
								height:100%;
								color:red;
							}
							border-color:red;
						}
					}
				}
			}
		}
		.hisSearch{
			position:absolute;
			top:0;
			left:0;
			width:100%;
			.hisList{
				width:100%;
				.hisItem{
					width:100%;
					height:46px;
					padding:0 15px;
					position: relative;
					border-bottom:1px solid #ededed;
					&:first-child{
						border-top:1px solid #ededed;
					}
					span{
						position:absolute;
					}
					.hisIcon{
						width:20px;
						height:20px;
						left:15px;
						top:12px;
						background:url("../assets/img/clock_ic.png") no-repeat;
						background-size:20px 20px;
					}
					.hisName{
						left:55px;
						right:65px;
						height:100%;
						line-height:44px;
						color:#000;
						font-size:14px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.delHis{
						right:15px;
						top:7px;
						width:30px;
						height:30px;
						&:before,&:after{
							position:absolute;
							left:6px;
							top:16px;
							background:rgba(0,0,0,.6);
							content:"";
							width:17px;
							height:1px;
						}
						&:before{
							transform: rotate(45deg);
						}
						&:after{
							transform: rotate(-45deg);
						}
					}
				}
			}
			.cleanHis{
				margin-top:20px;
				text-align: center;
				span{
					color:#47c88a;
					font-size:14px;
				}
			}
		}
		.alert{
			position:fixed;
			top:-44px;
			left:0;
			background:rgba(0,0,0,0.8);
			color:#fff;
			text-align:center;
			width:100%;
			height:44px;
			line-height:44px;
			font-size:14px;
			transition:all ease-out;
			&.show{
				transform:translateY(44px);
			}
		}
	}
	.switch-enter-active,.switch-leave-active {
	  transition: all .2s ease;
	}
	.switch-enter, .switch-leave-to{
	  transform: translateY(30px);
	  opacity: 0;
	}
</style>