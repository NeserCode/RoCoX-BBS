import { prisma } from "."
import type { RefreshToken } from "@prisma/client"

export interface RefreshTokenData extends RefreshToken {}

export interface RefreshTokenInfoData {
	token: string
	userId: string
}

export type RefreshTokenData_Safe = string

export const createRefreshToken = (data: RefreshTokenInfoData) => {
	return prisma.refreshToken.create({
		data: data,
	})
}

export const getRefreshTokenByToken = (token: string) => {
	return prisma.refreshToken.findUnique({
		where: {
			token,
		},
	})
}
