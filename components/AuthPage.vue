<script lang="ts" setup>
import { UseToastKey } from "~/tokens/useToastKey"
import { FingerPrintIcon, PaperAirplaneIcon } from "@heroicons/vue/24/outline"

const pageState = reactive({
	login: {
		username: "",
		password: "",
	},
	register: {
		username: "",
		password: "",
		passwordRepeat: "",
		name: "",
		email: "",
	},
	isLogin: true,
	loading: true,
})

const { useToast } = inject(UseToastKey, {
	useToast: () => ({
		toggle: () => {},
		set: (_args: any) => {},
	}),
})!
const { toggle, set } = useToast()

const toggleViews = useThrottleFn(() => {
	pageState.isLogin = !pageState.isLogin
}, 500)

const darkMode = useDark({
	selector: "html",
	disableTransition: false,
})
const toggleDarkMode = useThrottleFn(() => {
	useToggle(darkMode)()
}, 300)

const btnDisabled = computed(() => {
	if (pageState.isLogin) {
		return !!(
			pageState.login.username &&
			pageState.login.password &&
			!pageState.loading
		)
	} else {
		return !!(
			pageState.register.username &&
			pageState.register.password &&
			pageState.register.passwordRepeat &&
			!pageState.loading
		)
	}
})

onMounted(() => {
	nextTick(() => {
		pageState.loading = false
	})
})

onErrorCaptured((e) => {
	console.log(e)
})

const { login } = useAuth()
const loginSubmit = useThrottleFn(() => {
	login({
		...pageState.login,
	})
		.then((res) => {
			if (res === "OK")
				set({
					text: `Welcome`,
					type: "success",
				})
		})
		.catch((err) => {
			const { statusCode, statusMessage } = err

			set({
				text: `#${statusCode} ${statusMessage}`,
				type: "error",
			})
			pageState.login.password = ""
		})
		.finally(() => {
			toggle()
		})
}, 300)

const registerSubmit = useThrottleFn(() => {}, 300)
</script>

<template>
	<div class="auth-page">
		<Transition name="slide-left" mode="out-in" appear>
			<div class="login" v-if="pageState.isLogin">
				<UIInput
					label="Username"
					placeholder="username"
					v-model="pageState.login.username"
					label-for="ui.input.login.username"
				/>
				<UIInput
					label="Password"
					type="password"
					placeholder="password"
					v-model="pageState.login.password"
					label-for="ui.input.login.password"
				/>
				<button
					class="submit"
					:disabled="!btnDisabled"
					@click="loginSubmit"
					@keyup.enter="loginSubmit"
				>
					<span class="text">Login</span>
					<FingerPrintIcon class="icon" />
				</button>

				<span class="other-links">
					<span class="another" @click="toggleViews">Register</span>
					<span class="dark-mode" @click="toggleDarkMode">Dark Mode</span>
				</span>
			</div>
			<div class="register" v-else>
				<UIInput
					label="Username"
					placeholder="username"
					v-model="pageState.register.username"
					label-for="ui.input.register.username"
				/>
				<UIInput
					label="Password"
					placeholder="password"
					type="password"
					v-model="pageState.register.password"
					label-for="ui.input.register.password"
				/>
				<UIInput
					label="Password Repeat"
					placeholder="repeat password"
					type="password"
					v-model="pageState.register.passwordRepeat"
					label-for="ui.input.register.password-repeat"
				/><br />
				~
				<UIInput
					label="Name"
					placeholder="Name"
					v-model="pageState.register.name"
					label-for="ui.input.register.name"
				/>
				<UIInput
					label="Email"
					placeholder="Email"
					v-model="pageState.register.email"
					label-for="ui.input.register.email"
				/>
				<button
					class="submit"
					:disabled="!btnDisabled"
					@click="registerSubmit"
					@keyup.enter="registerSubmit"
				>
					<span class="text">Register</span>
					<PaperAirplaneIcon class="icon" />
				</button>

				<span class="other-links">
					<span class="another" @click="toggleViews">Login</span>
					<span class="dark-mode" @click="toggleDarkMode">Dark Mode</span>
				</span>
			</div>
		</Transition>
	</div>
</template>

<style lang="postcss">
.slide-left-enter-active,
.slide-left-leave-active {
	@apply transition-all ease-in-out duration-500;
}

.slide-left-enter-from,
.slide-left-leave-to {
	@apply opacity-0 translate-x-4;
}
</style>
<style lang="postcss" scoped>
.auth-page {
	@apply flex flex-col w-full mx-auto items-center justify-center
	py-24;
}
.login,
.register {
	@apply h-full flex flex-col justify-center items-center
	select-none;
}

.submit {
	@apply w-full h-full inline-flex justify-center items-center py-2 px-3 mt-8
	border-2 rounded border-blue-300 hover:border-blue-400 active:border-blue-300
	bg-cyan-200 hover:bg-cyan-300 active:bg-blue-400
	dark:border-green-600 dark:hover:border-green-500 dark:active:border-green-600
	dark:bg-cyan-800 dark:hover:bg-cyan-700 dark:active:bg-green-500
	focus:ring-2 ring-sky-500 dark:ring-green-500
	transition-all ease-in-out duration-300 shadow-md outline-none
	disabled:opacity-60 disabled:cursor-not-allowed;
}
.submit .icon {
	@apply w-5 h-5 inline-flex justify-center items-center mx-2 pt-0.5;
}

.other-links {
	@apply w-full inline-flex justify-between items-center self-start mt-2
	text-sm underline
	select-none cursor-pointer opacity-50;
}
</style>
