import { getRefreshTokenByToken } from "~/server/db/refreshTokens"
import { getUserById } from "~/server/db/users"
import { refreshTokenTransformer } from "~/server/transformers/refreshToken"
import { decodeRefreshToken } from "~/server/utils/jwt"

export default defineEventHandler(async (event) => {
	const cookie = getCookie(event, "refresh_token")

	if (!cookie)
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: "ToKen invaild.",
			})
		)

	const token = await getRefreshTokenByToken(cookie)

	if (!token)
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: "ToKen invaild.",
			})
		)

	const tokenPayload = decodeRefreshToken(refreshTokenTransformer(token))

	try {
		const user = await getUserById(tokenPayload!.userId)

		if (!user)
			return sendError(
				event,
				createError({
					statusCode: 500,
					statusMessage: "Something went wrong.",
				})
			)

		const { accessToken } = generateTokens(user)
		return { accessToken }
	} catch (error) {
		return sendError(
			event,
			createError({
				statusCode: 500,
				statusMessage: "Something went wrong.",
			})
		)
	}
})
