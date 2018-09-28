<template>
	<div id="rankBox">
		<ul class="rankList">
			<li class="rankItem" v-for="(v,index) in rankData">
				<div class="imgBox">
					<img v-lazy="v.picUrl">
					<span class="count">
						<i class="headset"></i>
						{{(v.listenCount/10000).toFixed(1)}}万
					</span>
				</div>
				<div class="textBox">
					<h2 class="title">{{v.topTitle}}</h2>
					<p class="textItem" v-for="(v1,index1) in v.songList">
						{{index1+1}}
						<span class="songName">{{v1.songname}}</span>
						- {{v1.singername}}
					</p>
				</div>
				<span class="jtIcon"></span>
			</li>
		</ul>
		<img class="loading" v-if="!rankData" src="@/assets/img/loading.gif">
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {

			}
		},
		methods:{
			getRank(){
				var time = new Date().getTime();
				var url="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=jsonp2&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_="+time;
				if(!this.rankData){
					this.$jsonP(url,"jsonp2",(res)=>{
						if(res.code === 0){
							this.$store.commit("reRank",res.data.topList);
						}
					})
				}
			}
		},
		computed:{
			rankData(){
				return this.$store.state.rank;
			}
		},
		created(){
			this.getRank();
		}
	}
</script>

<style lang="less" scoped>
	#rankBox{
		width:100%;
		height:100%;
		.loading{
			position: fixed;
			top:50%;
			left:50%;
			margin-top:-75px;
			margin-left:-75px;
		}
		.rankList{
			width:100%;
			height:100%;
			padding:10px;
			.rankItem{
				width:100%;
				height:100px;
				background:#fff;
				display: flex;
				margin-bottom:10px;
				position: relative;
				.imgBox{
					width:100px;
					height:100px;
					position: relative;
					.count{
						position:absolute;
						left:5px;
						bottom:3px;
						color:#fff;
						opacity:0.6;
						z-index: 9;
						i{
							display: inline-block;
							width:10px;
							height:10px;
							background:url(../assets/img/list_sprite.png) no-repeat;
							background-size:24px 60px;
							background-position:0 -50px;
						}
					}
					img{
						width:100%;
					}
					&:after{
						position: absolute;
						content:"";
						width:100%;
						height:100%;
						top:0;
						left:0;
						background:url(../assets/img/shadow_rp_b.png) repeat-x;
						background-size:1px 100px;
						z-index: 1;
					}
				}
				.textBox{
					flex:1;
					padding:3px 10px 4px 15px;
					overflow:hidden;
					.title{
						font-size:16px;
						font-weight:normal;
						margin-bottom:5px;
						overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
					}
					.textItem{
						font-size:14px;
						color:rgba(0,0,0,.5);
					    overflow: hidden;
					    white-space: nowrap;
					    text-overflow: ellipsis;
					    line-height:21px;
					    .songName{
					    	color:#000;
					    	margin-left:5px;
					    	margin-right:3PX;
					    }
					}
				}
				.jtIcon{
					position:absolute;
					width:7px;
					height:7px;
					top:50%;
					right:10px;
					margin-top:-5px;
					border-right: 1px solid #b2b2b2;
    				border-bottom: 1px solid #b2b2b2;
    				transform: rotate(-45deg);
				}
			}
		}
	}
</style>