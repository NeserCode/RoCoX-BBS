import UrlPattern from "url-pattern"
import { getUserById } from "~/server/db/users"
import { decodeAccessToken } from "~/server/utils/jwt"
const endpoints = ["/api/auth/user"]

export default defineEventHandler(async (event) => {
	const isHandledByThisMiddleware = endpoints.some((endpoint) => {
		const pattern = new UrlPattern(endpoint)
		if (event.node.req.url) return pattern.match(event.node.req.url)
	})

	if (!isHandledByThisMiddleware) return

	const token = event.node.req.headers["authorization"]?.split(" ")[1]!
	const decoded = decodeAccessToken(token)

	if (!decoded)
		return sendError(
			event,
			createError({
				statusCode: 401,
				statusMessage: "Unauthorized",
			})
		)

	try {
		const user = getUserById(decoded.userId)
		event.context.auth = { user }
	} catch (error) {
		return
	}
})
