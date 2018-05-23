<template>
	<transition name="fade" mode="out-in">
		<div class="container">
			<form @submit.prevent="submitUserInfo" ref="registerform" method="POST">
			  <div class="container">
			    <h1>Register</h1>
			    <p>Please fill in this form to create an account.</p>
			    <hr>

			    <label for="personname"><b>Name</b></label>
			    <input type="text" v-model="user.name" placeholder="John Doe" class="form-control" autocomplete="personname" required>

			    <br>

			    <label for="email"><b>Email</b></label>
			    <input type="email" v-model="user.email" placeholder="anything@anywhere.com" name="email" class="form-control" autocomplete="email" required>

			    <br>

			    <label for="psw"><b>Password</b></label>
			    <input type="password" v-model="user.password" placeholder="Enter Password" name="psw" class="form-control" autocomplete="password" required>

			    <br>

			    <hr>

			    <button type="submit" class="btn btn-primary">Register</button>
			  </div>
			</form>
			<div class="container signin">
			    <p>
			    	Already have an account? 
			    	<!-- <router-link v-bind:to="'/'">Sign in.</router-link> -->
			    	<a href="#" v-on:click="changeToLogin">login</a> 
			    </p>
			  </div>
		</div>
	</transition>
</template>
<script>
	import axios from 'axios';

	export default{
		name: 'Register',
		data() {
			return {
				user: {
					name: '',
					email: '',
					password: '',
				}
			}
		},
		methods: {
			changeToLogin(){
				this.$emit('changeToLogin');
			},
			submitUserInfo(){
				console.log(this.user.email + " "  + this.user.password);
				axios.post('http://localhost:8080/api/users/register',
					{user: this.user}).then(function(response){
						console.log(response);
					}).catch(function(err) {
						console.log(err);
					});
					this.changeToLogin();
				}
			}
		}
</script>