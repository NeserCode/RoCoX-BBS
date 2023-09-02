import { userInfoTransformer } from "~/server/transformers/user"

export default defineEventHandler(async (event) => {
	return {
		user: userInfoTransformer(event.context.auth?.user),
	}
})
