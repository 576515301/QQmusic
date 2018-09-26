<template>
	<div id="banner">
		<ul class="bannerHk" ref="bannerHk">
			<li 
				class="bannerItem"
				:class="{befor:beforBanner==index,now:nowBanner==index,after:afterBanner==index}"
				v-for="(v,index) in banner"
				:style="{left:0,zIndex:index}"
			>
				<img :src="v.picUrl">
			</li>
		</ul>
		<img v-cloak class="bgImg" :src="bannerBox[0].picUrl">
	</div>
</template>

<script type="text/javascript">
	export default {
		props:["banner"],
		data(){
			return {
				bannerBox:[{}],
				bannerClass:{},
				beforBanner:null,
				nowBanner:null,
				afterBanner:null,
				timer:null,
			}
		},
		methods:{
			bannerMove(){
				this.timer = setInterval(()=>{
					if(this.nowBanner == this.bannerBox.length - 1){
						this.nowBanner = 0
					}else{
						this.nowBanner++
					}
				},2000);
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
				console.log(item);
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
	}
</style>