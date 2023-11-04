import type { Socket } from "socket.io"

export type SocketMessage =
	| string
	| Buffer
	| ArrayBuffer
	| Blob
	| ArrayBufferView

export type SocketIOInfo = {
	id: string
}

export type SocketIOEvent = "message" | "connect" | "disconnect" | "error"

export type SocketStateInfo = {
	connected: boolean
	disconnected: boolean
}

export interface SocketMessageData {
	data?: SocketMessage
	io: SocketIOInfo
	state: SocketStateInfo
}

export interface ServerToClientEvents {
	connection: (info: SocketIOInfo) => void
	disconnect: (socket: Socket) => void
	error: (socket: Socket, error: Error) => void
	message: (data: SocketMessageData) => void
}

export interface ClientToServerEvents {
	connection: (socket: Socket) => void
	disconnect: (socket: Socket) => void
	error: (socket: Socket, error: Error) => void
	message: (data: SocketMessageData) => void
}

export interface InterServerEvents {
	ping: () => void
	connect: (socket: Socket) => void
	disconnect: (socket: Socket) => void
}

export interface SocketData extends SocketIOInfo {}
