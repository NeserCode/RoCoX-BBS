// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},

	modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "modules/socket"],

	runtimeConfig: {
		accessSecret: process.env.USER_ACCESS_TOKEN_SECRET,
		refreshSecret: process.env.USER_REFRESH_TOKEN_SECRET,
	},
})
