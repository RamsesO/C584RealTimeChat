<template>
	<transition name="fade" mode="out-in">
		<div id="messaging-section">
			<div class="row justify-content-center">
				<h3 v-if="messagingSomeone == false">Message Someone</h3>
				<h3 v-else>{{title}}</h3>
			</div>
			<br>

			<div class="row justify-content-center">
				<Dropdown v-bind:user_id="user_id" v-on:userSelected="userSelected($event)"></Dropdown>
			</div>

			<br> 

			<div v-if="messagingSomeone">
				<div class="row">
					<div class="col-sm-12 form-group">
						<input type="text" 
						class="form-control"
						placeholder="enter message here"
						autofocus
						v-model="newMessage"
						@keydown.enter="addMessage">
					</div>
				</div>

				<br>

				<div id="current-messages">

					<div class="row">
						<div class = "col-sm-12">
							<ol v-if="messages.length">
								<MessageItem
									v-bind="message"
									v-for="message in messages"
									:key="message.id"
									>
								</MessageItem>
							</ol>
							<p class="text-center" v-else>
								No message history between you and {{receiver.name}} to show.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
import axios from 'axios'
import MessageItem from '@/components/dashboard/messageitem'
import Dropdown from '@/components/dashboard/dropdown'


export default{
	name: 'Chat',
	props: ['user_id', 'user_name'],
	components: {
		'Dropdown': Dropdown,
		'MessageItem': MessageItem
	},
	data() {
		return {
			title: 'Message Someone',
			messagingSomeone: false,
			messages: [],
			newMessage: '',
			sender: null,
			receiver: null
		}
	},
	sockets: {
		connect: function(){
	  		console.log('socket connected');
	  	}
	},
	watch: {
		receiver(){
			console.log('receiver changed');
			this.$emit('receiverChanged');
		}
	},
	methods: {
		userSelected(user){
			this.messagingSomeone = true;
			this.messages = [];
			this.title = 'Messaging ' + user.name;
			this.receiver = user;
			this.sender = this.user_id;
			this.$socket.emit('customEmit');
		},
		sendMessage(){
			var messageData = {
				sender: this.sender,
				receiver: this.receiver.id,
				text: this.newMessage
			};

			axios.post('http://localhost:8080/api/messages', messageData)
			.then(function (response) {
				console.log('inserted message');
			})
			.catch(function(error) {
				console.log(error);
			});
		},
		handleEvent() {
			console.log('received message from server');
		},
		addMessage() {
			if(this.newMessage.trim() != ''){
				let newId = this.messageCount() + 1;
				this.sendMessage();
				this.messages.push({
					sender: this.user_name,
					receiver: this.receiver.name,
					text: this.newMessage
				});
				this.emitMessageSocket({
					id: this.user_id,
					name: this.user_name,
					receiver: this.receiver.id,
					text: this.newMessage
				});
				this.newMessage = '';
			}
		},
		emitMessageSocket(data){
			console.log('attempting to emit message to server');
			this.$socket.emit('sendNewMessage', data);
		},
		addMessageSocket(data){
			this.messages.push({
				sender: data.name,
				receiver: this.user_name,
				text: data.text
			});
		},
		messageCount(){
			return this.messages.length;
		}
	},
	mounted(){
		const _this = this;
		this.$socket.on('roomConnect', function(data) {
			_this.handleEvent()
		});
		this.$socket.on('newMessage', function(data) {
			console.log('new message from the server');
			if(data.receiver == _this.user_id){
				console.log('received new message from ' + data.name);
				_this.addMessageSocket(data);
			}
			
		});
	}
}


</script>