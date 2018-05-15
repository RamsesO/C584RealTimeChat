<template>
  <div class="container-fullwidth">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">RTC584</a>
      <div v-if="loggedIn" class="nav navbar-nav navbar-right">
        <a class="nav-link" v-on:click="logOut">Logout<span class="sr-only"></span></a>
      </div>
    </nav>
</div>
</template>
<script>
import axios from 'axios'

export default{
  name: 'navbar',
  props: ['loggedIn'],
  methods: {
  	logOut(){
      this.$session.destroy();
  		this.$router.push('/');
  	}
  }
}
</script>