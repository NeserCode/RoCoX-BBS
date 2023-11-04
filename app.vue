<script lang="ts" setup>
import { UseToastKey } from "~/tokens/useToastKey"
import { io } from "socket.io-client"

const { initAuth, useAuthUser, useAuthLoading, logout } = useAuth()
const user = useAuthUser()
const isAuthLoading = useAuthLoading()

const darkMode = useDark({
	selector: "html",
	disableTransition: false,
})
const toggleDarkMode = useThrottleFn(() => {
	useToggle(darkMode)()
}, 300)

onBeforeMount(() => {
	const { set, toggle } = useToast()
	initAuth()
		.then(() => {
			set({
				text: `Welcome again`,
				type: "success",
				duration: 5000,
			})
		})
		.catch((err) => {
			const { statusCode, statusMessage } = err

			set({
				text: `#${statusCode} ${statusMessage}`,
				type: "error",
				duration: 5000,
			})
		})
		.finally(() => {
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

// SEO
const SeoObject = reactive({
	title: "Login",
	description: "Nuxt app.",
	ogTitle: "BBS",
	ogDescription: "Nuxt app.",
	// ogImage: "",
	// ogUrl: "",
})

const socket = io({})

socket.on("message", (data) => {
	console.log(data)
})

watch(
	user,
	(value) => {
		if (value) {
			SeoObject.title = "Home"
			socket.emit("message", "hello!")
		} else SeoObject.title = "Login"
	},
	{ immediate: true, deep: true }
)
watch(
	SeoObject,
	() => {
		useSeoMeta({ ...SeoObject })
	},
	{ immediate: true, deep: true }
)

useHead({
	htmlAttrs: {
		lang: "en",
	},
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/favicon.png",
		},
	],
})
</script>

<template>
	<div class="app-container">
		<Transition name="fade" mode="out-in" appear>
			<LoadingPage v-if="isAuthLoading" />

			<div v-else-if="user" class="main-page">
				<div class="user">
					<img class="avatar" :src="user.avatar?.toString()" alt="avatar" />
					<span class="username">{{ user.username }}</span>

					<button class="logout-btn danger" @click="logout">logout</button>
				</div>
				<span class="darkmode" @click="toggleDarkMode">Dark Mode</span>
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
.danger {
	@apply text-red-700 dark:text-red-500 border-red-700 dark:border-red-500;
}

.darkmode {
	@apply cursor-pointer underline;
}

.user {
	@apply flex items-center justify-center m-2 p-2 gap-2
	border-2 rounded-full border-gray-500 dark:border-gray-400;
}
.avatar {
	@apply inline-flex justify-center items-center w-12 h-12
	rounded-full;
}
.username {
	@apply inline-flex justify-center items-center h-12
	text-lg font-semibold font-sans;
}

.logout-btn {
	@apply mx-2 rounded-full;
}
</style>
