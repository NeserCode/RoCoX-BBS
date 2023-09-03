<script lang="ts" setup>
import { UseToastKey } from "~/tokens/useToastKey"

const { initAuth, useAuthUser, logout } = useAuth()
const user = useAuthUser()

onBeforeMount(() => {
	const { set, toggle } = useToast()
	initAuth().catch((err) => {
		const { statusCode, statusMessage } = err

		set({
			text: `#${statusCode} ${statusMessage}`,
			type: "error",
			duration: 5000,
		})
		toggle()
	})
})

const toastState = reactive({
	open: false,
	text: "Hello",
	type: "success",
	duration: 3000,
})
const useToast = () => {
	return {
		toggle: () => {
			toastState.open = !toastState.open
		},
		set: (opt: { text: string; type: string; duration?: number }) => {
			toastState.text = opt.text
			toastState.type = opt.type
			if (opt.duration) toastState.duration = opt.duration
		},
	}
}
provide(UseToastKey, { useToast })
</script>

<template>
	<div class="app-container">
		<div v-if="user" class="main-page">
			<button @click="logout">logout</button>
		</div>
		<AuthPage v-else class="auth-page" />
	</div>
	<UIToast
		:open="toastState.open"
		:type="toastState.type as 'warn' | 'info' | 'error' | 'success' | 'text'"
		:text="toastState.text"
		:duration="toastState.duration"
	/>
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
	bg-slate-50 dark:bg-slate-950
	text-slate-800 dark:text-slate-100
	transition-all ease-in-out duration-300;
}
</style>
