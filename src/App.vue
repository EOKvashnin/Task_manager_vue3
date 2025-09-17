<template>
	<the-navbar></the-navbar>
	<div class="container with-nav">
		<router-view></router-view>
	</div>
	<the-footer></the-footer>
</template>

<script>
import TheFooter from './components/TheFooter.vue'
import TheNavbar from './components/TheNavbar'

export default {
	components: {
		TheNavbar,
		TheFooter,
	},
}
</script>

<style></style>
