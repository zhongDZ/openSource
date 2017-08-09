<template>
	<div id="app">
		<div>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
	  name: 'app',
	}
</script>

<style>
	/*body{
		background: url('../static/login/bg.jpg') no-repeat;
		background-size:100% 100%;
		width: 100%;
		height: 100%;
		background-attachment: fixed;
	}*/
</style>
