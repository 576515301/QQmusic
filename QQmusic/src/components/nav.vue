<template>
	<div id="headerNav">
		<ul>
			<li v-for="(v,index) in nav">{{v}}</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	export default {
		data(){
			return {

			}
		},
		props:["nav"],
	}
</script>

<style lang="less" scoped>
	#headerNav{
		ul{
			height:40px;
			display: flex;
			li{
				flex:1;
				text-align: center;
				line-height: 40px;
			}
		}
	}
</style>