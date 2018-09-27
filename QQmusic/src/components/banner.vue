<template>
	<div id="banner">
		<ul class="bannerHk" ref="bannerHk">
			<li 
				class="bannerItem"
				:class="{befor:beforBanner==index,now:nowBanner==index,after:afterBanner==index}"
				:style="{transform:'translate('+whatX(index)+'px,0)',transitionDuration: bannerMoveTime+'ms'}"
				v-for="(v,index) in bannerData"
				@touchstart="touchBanner($event)"
				@touchmove="touchBanner($event)"
				@touchend="touchBanner($event,v.linkUrl)"
			>
				<img :src="v.picUrl">
			</li>
		</ul>
		<ol class="pieBox">
			<li class="pieItem" v-for="(v,index) in bannerData" :class="{active:nowBanner==index}"></li>
		</ol>
		<img v-cloak class="bgImg" :src="bannerData[0].picUrl">
	</div>
</template>

<script type="text/javascript">
	export default {
		props:{
			banner:Array,
		},
		created(){
			this.wW = document.documentElement.clientWidth;
			this.moveX = 0;
			this.nowBanner = 0;
			this.bannerMove();
		},
		data(){
			return {
				bannerData:this.banner,

				wW:0,					// 窗口的宽度

				beforX:0,
				lastX:0,

				beforBanner:null,       // 上一张banner的索引
				nowBanner:null,			// 当前banner的索引
				afterBanner:null,		// 下一张banner的索引
				timer:null,				// banner轮播定时器
				bannerMoveTime:400,

				// 拖动相关
				moveX:null,
				startX:null,
				startY:null,
				startTime:null,
				canTouch:true,
				isFirst:true,
			}
		},
		computed:{
			whatX(){
				return (index)=>{
					switch(index){
						case this.nowBanner:
							return this.moveX;
							break;
						case this.beforBanner:
							return this.beforX;
							break;
						case this.afterBanner:
							return this.lastX;
							break;
						default:
							break;
					}
				}
			}
		},
		methods:{
			// banner轮播函数
			bannerMove(){
				this.timer = setInterval(()=>{
					this.pgUp();
				},2000);
			},
			// banner拖动函数
			touchBanner(e,path){
				var type = e.type;
				switch(type){
					case "touchstart":
						this.startM(e);
						break;
					case "touchmove":
						this.canTouch && this.moveM(e);
						break;
					case "touchend":
						this.bannerMoveTime = 400;
						this.canTouch && this.moveE(e,path);
						this.bannerMove();
						this.isFirst = true;
						this.canTouch = true;
						break
					default:
						break;
				}
			},
			startM(e){
				clearInterval(this.timer);
				this.bannerMoveTime = 0;
				this.moveSX = e.touches[0].pageX;
				this.startX = e.touches[0].pageX;
				this.startY = e.touches[0].pageY;
				this.startTime = new Date().getTime();

			},
			moveM(e){
				var moveX   = e.touches[0].pageX - this.startX;
				var moveY   = e.touches[0].pageY - this.startY;
				if(this.isFirst){
					if(Math.abs(moveY/moveX) < 1.2){
						this.canTouch = true;
						document.body.style.overflowX = "hidden";
					}else{
						this.canTouch = false;
					}
					this.isFirst  = false;
				}
				e.preventDefault();
				this.moveX  = moveX;
			},
			moveE(e,path){
				var nowTime = new Date().getTime();
				if(nowTime - this.startTime < 300){
					if(this.moveX > 40)
						this.pgDn();
					else if(this.moveX < -40)
						this.pgUp();
					else if(this.moveX == 0)
						window.location.href = path;
				}else{
					if(this.moveX > this.wW / 2)
						this.pgDn();
					else if(this.moveX < -this.wW / 2)
						this.pgUp();
				}
				this.moveX = 0;
				document.body.style.overflowX = "scroll";
			},
			pgUp(){
				if(this.nowBanner == this.bannerData.length - 1){
					this.nowBanner = 0
				}else{
					this.nowBanner++
				}
			},
			pgDn(){
				if(this.nowBanner == 0){
					this.nowBanner = this.bannerData.length - 1
				}else{
					this.nowBanner--
				}
			}
		},
		watch:{
			nowBanner(n,o){
				var item = document.querySelectorAll(".bannerItem");
				if(n == 0){
					this.beforBanner = this.bannerData.length - 1;
					this.afterBanner = n + 1;
				}else if(n == this.bannerData.length - 1){
					this.beforBanner = n - 1;
					this.afterBanner = 0;
				}else{
					this.beforBanner = n - 1;
					this.afterBanner = n + 1;
				}
			},
			moveX(n,o){
				if(n!=0){
					this.beforX = -this.wW + n;
					this.lastX  = this.wW + n;
				}else{
					this.beforX = -this.wW;
					this.lastX  = this.wW;
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
				display: none;
				&.befor{
					display: block;
					// transform: translate(-100%,0);
				}
				&.now{
					display: block;
					// transform: translate(0,0);
				}
				&.after{
					display: block;
					// transform: translate(100%,0);
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