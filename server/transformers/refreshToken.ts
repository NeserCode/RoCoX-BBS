import type {
	RefreshTokenData,
	RefreshTokenData_Safe,
} from "~/server/db/refreshTokens"

export const refreshTokenTransformer: (
	data: RefreshTokenData
) => RefreshTokenData_Safe = (data: RefreshTokenData) => {
	return data.token
}
