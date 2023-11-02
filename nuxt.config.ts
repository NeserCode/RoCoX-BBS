// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: {
		enabled: true,
	},

	modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt", "nuxt-socket-io"],

	io: {
		// module options
		sockets: [
			{
				name: "main",
				url: "http://localhost:3000",
			},
		],
	},

	runtimeConfig: {
		accessSecret: process.env.USER_ACCESS_TOKEN_SECRET,
		refreshSecret: process.env.USER_REFRESH_TOKEN_SECRET,
	},
})
