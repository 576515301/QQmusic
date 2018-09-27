<template>
	<div id="headerNav">
		<ul>
			<li 
				v-for="(v,index) in nav"
				@click="toPath(v.path,index)" 
				:class="{active:v.path==nowTab}"
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
		props:{
			nav:Array
		},
		data(){
			return {
				nowTab:null,
			}
		},
		methods:{
			toPath(path,index){
				var hk = this.$refs.hk;
				var l = index / this.nav.length;
				hk.style.left = l*100 + "%";
				this.nowTab = path;
				this.$router.push(path);
			}
		},
		created(){
			var href = window.location.href;
				this.nowTab = href.split("#")[1];

		},
		mounted(){
			var hk = this.$refs.hk;
			var w = 1 / this.nav.length;
			hk.style.width = w*100+"%";
			var index = 0;
			for(var i = 0; i < this.nav.length; i++){
				if(this.nowTab == this.nav[i].path){
					index = i;
				}
			}
			this.toPath(this.nowTab,index);
		},
	}
</script>

<style lang="less" scoped>
	#headerNav{
		position: relative;
		ul{
			height:40px;
			display: flex;
			background:#fff;
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