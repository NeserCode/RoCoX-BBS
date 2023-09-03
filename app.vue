<script lang="ts" setup>
import { UseToastKey } from "~/tokens/useToastKey"

const { initAuth, useAuthUser, useAuthLoading, logout } = useAuth()
const user = useAuthUser()
const isAuthLoading = useAuthLoading()

const darkMode = useDark({
	selector: "html",
	disableTransition: false,
})

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
		<Transition name="fade" mode="out-in" appear>
			<LoadingPage v-if="isAuthLoading" />

			<div v-else-if="user" class="main-page">
				<span>Welcome, {{ user.username }}</span>
				<button @click="logout">logout</button>
			</div>

			<AuthPage v-else class="auth-page" />
		</Transition>
	</div>
	<UIToast
		:open="toastState.open"
		:type="toastState.type as 'warn' | 'info' | 'error' | 'success' | 'text'"
		:text="toastState.text"
		:duration="toastState.duration"
	/>
</template>

<style lang="postcss">
.html {
	color-scheme: light;
}
.html.dark {
	color-scheme: dark;
}

.fade-enter-active,
.fade-leave-active {
	@apply transition-all ease-in-out duration-300;
}
.fade-enter-from,
.fade-leave-to {
	@apply opacity-0;
}
</style>

<style lang="postcss" scoped>
.app-container {
	@apply block w-full min-h-screen
	bg-slate-50 dark:bg-slate-950
	text-slate-800 dark:text-slate-100
	transition-all ease-in-out duration-300;
}

.main-page {
	@apply flex flex-col h-screen justify-center items-center;
}

button {
	@apply inline-flex justify-center items-center px-2 py-1 my-2
	uppercase text-base font-sans font-semibold shadow
	border-2 rounded border-gray-600 dark:border-gray-400
	text-gray-700 dark:text-gray-300 bg-slate-200 dark:bg-slate-800;
}
</style>
