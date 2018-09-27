<template>
	<div id="header">
		<div class="title cl">
			<span class="logo">
				<img src="https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/logo.png?max_age=19830212&d=20151105145423">
			</span>
			<span class="downApp">
				<i>
					下载APP
				</i>
			</span>
		</div>
		<Nav :nav="nav"></Nav>
	</div>
</template>

<script type="text/javascript">
	import Nav from "@/components/nav";
	export default {
		data(){
			return {
				nav:[
					{name:"推荐",path:"/recommend"},
					{name:"排行榜",path:"/rank"},
					{name:"搜索",path:"/home"},
				]
			}
		},
		components:{
			Nav
		}
	}
</script>

<style lang="less" scoped>
	#header{
		.title{
			width:100%;
			height:44px;
			background:#31c27c;
			padding:0 9px;
			line-height:44px;
			.logo{
				float:left;
				height:44px;
				line-height: 44px;
				img{
					height:25px;
				}
			}
			.downApp{
				float:right;
				height:44px;
				i{
					font-style: normal;
					display: inline-block;
					margin-top:8px;
					width:80px;
					height:28px;
					background: #149c5a;
					color:#fff;
					border-radius: 14px;
					font-size:14px;
					text-align: center;
					line-height:28px;
				}
			}
		}
	}
</style>