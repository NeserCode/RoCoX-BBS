import { prisma } from "."
import type { User } from "@prisma/client"
import bcrypt from "bcrypt"

export interface UserData extends User {}

export interface UserRegisterData {
	username: string
	name: string
	password: string
	avatar: string
	email: string
}

export interface UserRegisterRawData extends UserRegisterData {
	passwordRepeat: string
}

export interface UserLoginData {
	username: string
	password: string
}

export interface UserData_Safe {
	id: string
	username: string
	name: string | null
	avatar: string | null
	email: string
}

export const createUser = (data: UserRegisterData) => {
	return prisma.user.create({
		data: {
			...data,
			password: bcrypt.hashSync(data.password, 10),
		},
	})
}

export const getUserByUsername = (username: string) => {
	return prisma.user.findUnique({
		where: {
			username,
		},
	})
}

export const getUserById = (userId: string) => {
	return prisma.user.findUnique({
		where: {
			id: userId,
		},
	})
}
