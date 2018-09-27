<template>
	<div id="rankBox">
		<ul class="rankList">
			<li class="rankItem">
				<div class="imgBox">
					123
				</div>
			</li>
		</ul>
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
							this.$store.commit("reRank",res.data);
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

<style lang="less" scoped></style>