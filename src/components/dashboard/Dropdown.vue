<template>
	<div id="dropdown">
		<select v-model="selectedUser">
			<option disabled value="">Select a User to Message</option>
			  <option v-for="user in users" :value="user">{{user.name}}</option>
		</select>
	</div>
</template>
<script>
import axios from 'axios'
	export default{
		name: 'dropdown',
		props: ['user_id'],
		data() {
			return {
				users: [],
				count: 0,
				selectedUser: null
			}
		},
		methods: {

		},
		watch:{
			selectedUser(){
				this.$emit('userSelected', this.selectedUser);
			}
		},
		mounted() {
			const _this = this;
			axios.get('http://localhost:8080/api/users/all')
			.then(function(response) {
				if(response.data.users){
					var allUsers = response.data.users;
					for(var i in allUsers){
						var name = allUsers[i].name;
						var id = allUsers[i]._id;
						if(id != _this.user_id)
							_this.users.push({name: name, id: id});
					}
				}
			});
		}
	}
</script>