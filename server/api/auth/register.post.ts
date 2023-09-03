import { createUser } from "~/server/db/users"
import { userInfoTransformer } from "~/server/transformers/user"

import type { UserData, UserRegisterData } from "~/server/db/users"

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	const { username, password, passwordRepeat, email, name } = body

	if (!username || !password || !email || !name) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Invaild pramas: something null.",
			})
		)
	}

	if (password !== passwordRepeat) {
		return sendError(
			event,
			createError({
				statusCode: 400,
				statusMessage: "Password do not match.",
			})
		)
	}

	const registerData: UserRegisterData = {
		username,
		password,
		email,
		name,
		avatar: "https://picsum.photos/300/300",
	}
	const user: UserData | null = await createUser(registerData)

	return userInfoTransformer(user)
})
