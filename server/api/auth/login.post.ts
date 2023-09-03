import bcrypt from "bcrypt"
import { createRefreshToken } from "~/server/db/refreshTokens"

import { UserData, getUserByUsername } from "~/server/db/users"
import { userInfoTransformer } from "~/server/transformers/user"
import { sendRefreshToken } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { username, password } = body

	if (!username || !password) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Invaild pramas.",
			})
		)
	}

	const user: UserData | null = await getUserByUsername(username)
	if (!user) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Invaild user.",
			})
		)
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Invaild username or password.",
			})
		)
	}

	// Tokens
	const { accessToken, refreshToken } = generateTokens(user)

	// Refresh Token
	await createRefreshToken({
		token: refreshToken,
		userId: user.id,
	})

	sendRefreshToken(event, refreshToken)

	return {
		user: userInfoTransformer(user),
		accessToken,
	}
})
