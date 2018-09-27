<template>
	<div id="recommend">
		<Banner :banner="banner"></Banner>
	</div>
</template>

<script type="text/javascript">
	import Banner from "@/components/banner"
	export default {
		data(){
			return {
				data:{},
				banner:[],
			}
		},
		components:{
			Banner
		},
		methods:{
			getDataFun(){
				var _this = this;
				var time = new Date().getTime();
				var url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&jsonpCallback=jsonp1&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_="+time;

				this.$jsonP(url,"jsonp1",(res)=>{
					if(res.code === 0){
						_this.data = res.data;
						_this.banner = _this.data.slider;
					}
				})

				
			}
		},
		created(){

			this.getDataFun();
		}
	}
</script>

<style lang="less" scoped>
	
</style>