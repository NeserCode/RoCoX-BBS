import jwt from "jsonwebtoken"
import type { UserData } from "../db/users"

const generateAccessToken = (user: UserData) => {
	const { accessSecret } = useRuntimeConfig()

	return jwt.sign({ userId: user.id }, accessSecret, { expiresIn: "7d" })
}

const generateRefreshToken = (user: UserData) => {
	const { refreshSecret } = useRuntimeConfig()

	return jwt.sign({ userId: user.id }, refreshSecret, { expiresIn: "8h" })
}

export const decodeAccessToken = (token: string) => {
	const { accessSecret } = useRuntimeConfig()

	try {
		return jwt.verify(token, accessSecret) as { userId: string }
	} catch (error) {
		return null
	}
}

export const decodeRefreshToken = (token: string) => {
	const { refreshSecret } = useRuntimeConfig()

	try {
		return jwt.verify(token, refreshSecret) as { userId: string }
	} catch (error) {
		return null
	}
}

export const generateTokens = (user: UserData) => {
	const accessToken = generateAccessToken(user)
	const refreshToken = generateRefreshToken(user)

	return {
		accessToken,
		refreshToken,
	}
}

export const sendRefreshToken = (event: any, token: string | null) => {
	setCookie(event, "refresh_token", token ? token : "", {
		httpOnly: true,
		sameSite: true,
	})
}
