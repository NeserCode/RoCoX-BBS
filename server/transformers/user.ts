import type { UserData, UserData_Safe } from "../db/users"

export const userInfoTransformer: (data: UserData) => UserData_Safe | null = (
	data: UserData
) => {
	if (data)
		return {
			id: data.id,
			username: data.username,
			name: data.name,
			avatar: data.avatar,
			email: data.email,
		}
	else return null
}
