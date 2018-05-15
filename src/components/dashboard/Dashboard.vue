<template>
	<transition name="fade" mode="out-in">
		<div id="dashboard">
			<navbar v-bind:loggedIn="loggedIn"></navbar>

			<div class="container">
				<br>
				Welcome {{user_name}}!
				<hr>
				<div class="row justify-content-center">
					<div class="col-sm-4">
						<history v-bind:user_id="user_id" v-bind:user_name="user_name"
						:key="update"></history>
					</div>
					<div class="col-sm-4">
						<chat v-bind:user_id="user_id" v-bind:user_name="user_name" v-on:receiverChanged="receiverChanged()"></chat>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import axios from 'axios'
import History from './history'
import Chat from './messagesession'
import NavBar from '@/components/navbar'

export default{

	name: 'Dashboard',
	components: {
		'history': History, 
		'chat': Chat,
		'navbar': NavBar
	},
	props: ['user_id'],
	data() {
		return {
			user_name: '',
			loggedIn: true,
			update: true
		}
	},
	methods: {
		receiverChanged(){
			this.update = !this.update;
		}
	},
	beforeCreate() {
		if(!this.$session.exists())
			this.$router.push('/');
	},
	created() {
		const _this = this;
		axios.get('http://localhost:8081/api/user', {
			params: {
				id: this.user_id
			}
		})
		.then(function (response){
			if(response.data){
				_this.user_name = response.data.name;
			}
		})
		.catch(function(error) {
			console.log(error);
		});
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