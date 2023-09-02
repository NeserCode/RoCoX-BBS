import type { UserData_Safe, UserLoginData } from "~/server/db/users"

export default () => {
	const useAuthToken = () => useState<string>("auth_token")
	const useAuthUser = () => useState<UserData_Safe>("auth_user")

	const setToken = (newToken: string) => {
		const authToken = useAuthToken()
		authToken.value = newToken
	}

	const setUser = (newUser: UserData_Safe) => {
		const authUser = useAuthUser()
		authUser.value = newUser
	}

	const login = (data: UserLoginData) => {
		const { username, password } = data
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch("/api/auth/login", {
					method: "POST",
					body: {
						username,
						password,
					},
				})

				setToken(data.accessToken)
				setUser(data.user)

				resolve("OK")
			} catch (error) {
				reject(error)
			}
		})
	}

	const refreshToken = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await $fetch("/api/auth/refresh")
				setToken(data.accessToken)

				resolve("OK")
			} catch (error) {
				reject(error)
			}
		})
	}

	const getUser = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const data = await useFetchApi<{ user: UserData_Safe }>(
					"/api/auth/user"
				)
				setUser(data.user)

				resolve("OK")
			} catch (error) {
				reject(error)
			}
		})
	}

	const initAuth = () => {
		return new Promise(async (resolve, reject) => {
			try {
				await refreshToken()
				await getUser()

				resolve("OK")
			} catch (error) {
				reject(error)
			}
		})
	}

	return {
		login,
		useAuthUser,
		useAuthToken,
		initAuth,
	}
}
