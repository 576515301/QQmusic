<template>
  <div id="homePage">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/header"
export default {
  name: 'Home',
  data () {
    return {
      
    }
  },
  components:{
    Header
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
