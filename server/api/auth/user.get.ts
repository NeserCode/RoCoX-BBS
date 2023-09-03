import { userInfoTransformer } from "~/server/transformers/user"

export default defineEventHandler((event) => {
	return {
		user: userInfoTransformer(event.context.auth?.user),
	}
})
