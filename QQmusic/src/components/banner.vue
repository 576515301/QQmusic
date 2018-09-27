<template>
	<div id="banner">
		<ul class="bannerHk" ref="bannerHk">
			<li 
				class="bannerItem"
				:class="{befor:beforBanner==index,now:nowBanner==index,after:afterBanner==index}"
				v-for="(v,index) in banner"
				@touchstart="touchBanner($event,index)"
				@touchmove="touchBanner($event,index)"
				@touchend="touchBanner($event,index)"
			>
				<img :src="v.picUrl">
			</li>
		</ul>
		<ol class="pieBox">
			<li class="pieItem" v-for="(v,index) in banner" :class="{active:nowBanner==index}"></li>
		</ol>
		<img v-cloak class="bgImg" :src="bannerBox[0].picUrl">
	</div>
</template>

<script type="text/javascript">
	export default {
		props:["banner"],
		data(){
			return {
				bannerBox:[{}],         // banner数据的集合
				beforBanner:null,       // 上一张banner的索引
				nowBanner:null,			// 当前banner的索引
				afterBanner:null,		// 下一张banner的索引
				timer:null,				// banner轮播定时器
			}
		},
		methods:{
			// banner轮播函数
			bannerMove(){
				this.timer = setInterval(()=>{
					if(this.nowBanner == this.bannerBox.length - 1){
						this.nowBanner = 0
					}else{
						this.nowBanner++
					}
				},2000);
			},
			// banner拖动函数
			touchBanner(e,index){
				var type = e.type;
				switch(type){
					case "touchstart":
						clearInterval(this.timer);
						break;
					case "touchmove":
						break;
					case "touchend":
						this.bannerMove();
						break
					default:
						break;
				}
				
			}
		},
		watch:{
			banner:{
				handler(n,o){
					this.bannerBox = n;
					this.nowBanner = 0;
					this.bannerMove();
				},
				deep:true
			},
			nowBanner(n,o){
				var item = document.querySelectorAll(".bannerItem");
				if(n == 0){
					this.beforBanner = this.bannerBox.length - 1;
					this.afterBanner = n + 1;
				}else if(n == this.bannerBox.length - 1){
					this.beforBanner = n - 1;
					this.afterBanner = 0;
				}else{
					this.beforBanner = n - 1;
					this.afterBanner = n + 1;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	#banner{
		overflow:hidden;
		position:relative;
		&>img.bgImg{
			width:100%;
			visibility: hidden;
		}
		.bannerHk{
			position:relative;
			width:100%;
			.bannerItem{
				top:0;
				position:absolute;
				width:100%;
				transition-duration: 400ms;
				display: none;
				&.befor{
					display: block;
					transform: translate(-100%,0);
				}
				&.now{
					display: block;
					transform: translate(0,0);
				}
				&.after{
					display: block;
					transform: translate(100%,0);
				}
				img{
					width:100%;
					display: block;
				}
			}
		}
		.pieBox{
			position: absolute;
			width:100%;
			bottom:5px;
			left:0;
			overflow:hidden;
			text-align: center;
			z-index: 10;
			.pieItem{
				display: inline-block;
				margin:0 4px;
				width:6px;
				height:6px;
				border-radius: 50%;
				background: rgba(144,144,144,.8);
				&.active{
					background:#fff;
				}
			}
		}
	}
</style>