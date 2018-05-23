<template>
	<transition name="fade" mode="out-in">
		<div class="container">
			<form @submit.prevent="submitUserInfo" ref="registerform" method="POST">
				<h1>Login</h1>
				<p>Login to begin chatting~</p>
				<hr>
				<div class="form-group">
				    <label for="input-email">Email address</label>
				    <input type="email" v-model="user.email" class="form-control" id="inputemail" aria-describedby="emailHelp" placeholder="anything@anywhere.com" autocomplete="input-email" required>
				  </div>
				  <div class="form-group">
				    <label for="input-password">Password</label>
				    <input type="password" v-model="user.password" class="form-control" id="inputpassword" placeholder="*************" autocomplete="input-password" required>
				  </div>
				  <button type="submit" class="btn btn-primary" v-on:submit.prevent="submitUserInfo" id="btn">login</button>
			</form>
			<a href="#" v-on:click="changeToRegister">register</a> 
		</div>
	</transition>
</template>
<script>
import axios from 'axios';
export default{
	name: 'Login',

	data() {
		return {
			user: {
				email: '',
				password: ''
			},
		}
	},
	methods: {
		changeToRegister() {
			this.$emit('changeToRegister');
		},
		submitUserInfo()  {
			const _this = this;
			axios.post('http://localhost:8080/api/users/login', {
				email: this.user.email,
				password: this.user.password
			})
			.then(function(response) {
				console.log(response);
				if(response.status === 200 && 'session_id' in response.data){
					_this.$session.start();
					_this.$session.set('jwt', response.data.session_id);
					_this.$router.push('/dashboard/' + response.data.id);
				}
				else{
					console.log('not found');
					_this.$router.push('/');
				}
			})
			.catch(function(error) {
				console.log(error);
			});

		}
	},
}
</script>
