<template>
  <div id="app" :class="{search:search}">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
  	return {
  		search:false,
  	}
  },
  watch:{
  	$route(to,from){
  		if(to.path == "/search"){
  			this.search = true;
  		}else{
  			this.search = false;
  		}
  	}
  },
  created(){
  	var path = window.location.href;
  		path = path.split("#")[1];
  		if(path == "/search"){
  			this.search = true;
  		}else{
  			this.search = false;
  		}
  }
}
</script>

<style>
#app {
  width:100%;
  height:100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background:#f4f4f4;
}
[v-cloak]{
	display: none;
}
.search{
	background: #fff!important;
}
</style>
