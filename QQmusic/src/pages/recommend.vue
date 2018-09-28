<template>
	<div id="recommend">
		<Banner v-if="allData" :banner="allData.slider"></Banner>
		<SongSheet v-if="allData" tName="电台" :sheetData="allData.radioList"></SongSheet>
		<SongSheet v-if="allData" tName="热歌" :sheetData="allData.songList"></SongSheet>
		<img class="loading" v-if="!allData" src="@/assets/img/loading.gif">
	</div>
</template>

<script type="text/javascript">
	import Banner from "@/components/banner"
	import SongSheet from "@/components/songSheet"
	export default {
		data(){
			return {
				
			}
		},
		components:{
			Banner,
			SongSheet
		},
		methods:{
			getDataFun(){
				var time = new Date().getTime();
				var url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=jsonp&jsonpCallback=jsonp1&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_="+time;

				if(!this.allData){
					this.$jsonP(url,"jsonp1",(res)=>{
						if(res.code === 0){
							this.$store.commit("reRecommend",res.data);
						}
					})
				}
			}
		},
		computed:{
			allData(){
				return this.$store.state.recommend;
			}
		},
		created(){
			this.getDataFun();
		}
	}
</script>

<style lang="less" scoped>
	#banner{
		margin-bottom:14px;
	}
	#recommend{
		.loading{
			position: fixed;
			top:50%;
			left:50%;
			margin-top:-75px;
			margin-left:-75px;
		}
	}
</style>