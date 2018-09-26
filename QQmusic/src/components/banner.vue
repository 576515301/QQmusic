<template>
	<div id="banner">
		<ul class="bannerHk">
			<li 
				class="bannerItem"
				v-for="(v,index) in banner"
			>
			{{bannerBox[0].id}}
				<img :src="v.picUrl">
			}
			}
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		props:["banner"],
		data(){
			return {
				bannerBox:this.banner
			}
		},
		created(){
			
		},
		watch:{
			bannerBox:{
				handler(n,o){
					console.log(n);
				},
				deep:true
			}
		}
	}
</script>

<style lang="less" scoped>
	#banner{
		.bannerHk{
			width:100%;
			.bannerItem{
				width:100%;
				img{
					display: block;
					width:100%;
				}
			}
		}
	}
</style>