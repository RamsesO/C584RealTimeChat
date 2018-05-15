<template>
	<li>
		{{sender}} to {{receiver}} 
		<br>
		{{text}}
	</li>
</template>

<script>
	export default{
		name: 'MessageItem',
		props: ['sender', 'text', 'receiver'
		// 'sender', 'receiver'
		]
	}
</script>