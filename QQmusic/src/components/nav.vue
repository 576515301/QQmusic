<template>
	<div id="headerNav">
		<ul>
			<li 
				v-for="(v,index) in nav"
				@click="toPath(v.name,v.path,index)" 
				:class="{active:v.name==nowTab}"
			>
			{{v.name}}
			</li>
		</ul>
		<span id="hk" class="hk" ref="hk"></span>
	</div>
</template>

<script type="text/javascript">
	export default {
		/*
			nav: [
				{name:"推荐",path:"/recommend"},
				{name:"推荐",path:"/recommend"},
				{name:"推荐",path:"/recommend"}
			]
		 */
		props:["nav"],
		data(){
			return {
				nowTab:this.nav[0].name,
			}
		},
		methods:{
			toPath(name,path,index){
				var hk = this.$refs.hk;
				var l = index / this.nav.length;
				this.nowTab = name;
				hk.style.left = l*100 + "%";
				this.$router.push(path);
			}
		},
		mounted(){
			var hk = this.$refs.hk;
			var w = 1 / this.nav.length;
			hk.style.width = w*100+"%";
		},
	}
</script>

<style lang="less" scoped>
	#headerNav{
		position: relative;
		ul{
			height:40px;
			display: flex;
			li{
				flex:1;
				text-align: center;
				line-height: 40px;
				font-size:16px;
				color:rgba(0,0,0,.6);
				&.active{
					color:#31c27c;
				}
			}
		}
		.hk{
			position: absolute;
			left:0;
			bottom:0;
			width:0;
			height:2px;
			background:#31c27c;
			transition: all ease-out 100ms;
			-webkit-transition: all ease-out 100ms;
			-ms-transition: all ease-out 100ms;
		}
	}
</style>