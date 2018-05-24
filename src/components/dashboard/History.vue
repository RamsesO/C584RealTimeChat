<template>
	<transition name="fade" mode="out-in">
		<div id="message-history">
			<div class="row justify-content-center">
				<h3>{{title}}</h3>
			</div>

			<br>

			<div class="row">
				<div class = "col-sm-12">
					<ol v-if="pastMessages.length">
						<MessageItem
							v-bind="message"
							v-for="message in pastMessages"
							:key="message.id"
							>
						</MessageItem>
					</ol>
					<p class="text-center" v-else>
						No message history to show.
					</p>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import MessageItem from '@/components/dashboard/messageitem'

export default{
	name: 'MessageHistory',
	props: [
		'user_id', 
		'user_name'
	],
	data() {
		return {
			title: 'Message History',
			uid: this.id,
			updatePage: this.update,
			count: 0,
			noMessages: true,
			users: {},
			update: false,
			pastMessages: []
		}
	},
	components: {
		"MessageItem": MessageItem
	},
	// get the past messages sent and received by this user
	created() {
		const _this = this;
		axios.get('http://localhost:8081/api/users')
		.then(function(response) {
			if(response.data.users){
				var allUsers = response.data.users;
				for(var i in allUsers){
					var name = allUsers[i].name;
					var id = allUsers[i]._id;
					_this.users[id] = name;
				}
			}
		});

	},
	mounted() {
		const _this = this;
		axios.get('http://localhost:8081/api/messages/user/' + this.user_id)
		.then(function(response){
			if(response.data.messages){
				for(var i in response.data.messages){
					if(response.data.messages.hasOwnProperty(i)){
						var sender = null;
						var receiver = null;
						var text = response.data.messages[i].text;

						sender = _this.users[response.data.messages[i].sender];
						receiver = _this.users[response.data.messages[i].receiver];

						_this.pastMessages.push({
							text: text, 
							sender: sender,
							receiver: receiver
						});
					}
				}
			}
		})
		.catch(function(error){
			console.log(error);
		});
	}
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>