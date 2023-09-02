<script lang="ts" setup>
const { initAuth, useAuthUser } = useAuth()
const user = useAuthUser()

onBeforeMount(() => {
	initAuth()
})
</script>

<template>
	<div class="app-container">
		<div v-if="user" class="main-page">This is Main Page.</div>
		<AuthPage v-else class="auth-page" />
	</div>
</template>

<style>
.html {
	color-scheme: light;
}
.html.dark {
	color-scheme: dark;
}
</style>
<style lang="postcss" scoped>
.app-container {
	@apply block w-full min-h-screen
	bg-blue-50 dark:bg-slate-950
	text-slate-800 dark:text-slate-100
	transition-all ease-in-out duration-300;
}
</style>
