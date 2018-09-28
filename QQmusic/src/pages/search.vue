<template>	
	<div id="searchPage">
		<div class="searchBox">
			<div class="inpBox">
				<div class="inpBg">
					<input type="text" placeholder="搜索歌曲、歌单、专辑" autocomplete="off" @focus="trueFoc">
				</div>
				<span class="searchIcon">搜索</span>
				<span class="delInp"></span>
			</div>
			<div v-if="focus" class="close" @click="falseFoc">取消</div>
		</div>
		<!-- 热门搜索 -->
		<div class="hotSearch" v-if="!focus">
			<h2 class="title">热门搜索</h2>
			<div class="hotBox">
				<ul class="hotList">
					<li class="hotItem">
						<a :href="hotSearch.special_url">{{hotSearch.special_key}}</a>
					</li>
					<li class="hotItem" v-for="(v,index) in hotSearch.hotkey" v-if="index<10">{{v.k}}</li>
				</ul>
			</div>
		</div>
		<!-- 搜索历史 -->
		<div class="hisSearch">
			<ul class="hisList">
				<li class="hisItem">
					<span class="hisIcon"></span>
					<span class="hisName">啊开始打卡机</span>
					<span class="delHis"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			trueFoc(){
				this.$store.commit("changeFocus",true);
			},
			falseFoc(){
				this.$store.commit("changeFocus",false);
			},
			getHot(){
				
				var time = new Date().getTime();
				var url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=jsonp1&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_="+time;
				this.$jsonP(url,"jsonp1",(res)=>{
					if(!res.code){
						this.$store.commit("reHotSearch",res.data);
					}
				});
			
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
		.hotSearch{
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
					
				}
			}
		}
	}
</style>