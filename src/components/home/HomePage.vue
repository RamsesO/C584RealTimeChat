<template>
	<div id="homepage">
		<navbar v-bind:loggedIn="loggedIn"></navbar>

		<transition name="fade" mode="out-in">
			<div class="row justify-content-center">
				<div id="app" class="col-sm-8 mt-3">
					<div class="container">
						<div v-if="isLogin()">
							<login v-on:changeToRegister="toRegister()"></login>
						</div>
						<div v-if="isRegister()">
							<register v-on:changeToLogin="toLogin()"></register>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</div>
	
</template>
<script>
import Login from './Login'
import Register from './Register'
import NavBar from '@/components/navbar';

export default{
	name: 'homepage',
	components: {
		'login': Login,
		'register': Register,
		'navbar': NavBar
	},
	data() {
		return {
			currentPage: 'login',
			loggedIn: false
		}
	},
	methods: {
		toRegister(){
			this.currentPage = 'register';
		},
		toLogin(){
			this.currentPage = 'login';
		},
		isRegister(){
			return this.currentPage == 'register';
		},
		isLogin(){
			return this.currentPage == 'login';
		}
	}
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>