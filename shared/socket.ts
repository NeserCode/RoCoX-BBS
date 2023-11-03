import type { Socket } from "socket.io"
import type { Socket as ClientSocket } from "socket.io-client"

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
	connect: (info: SocketIOInfo) => void
	disconnect: (socket: Socket) => void
	error: (socket: Socket, error: Error) => void
	message: (data: SocketMessageData) => void
}

export interface ClientToServerEvents {
	connect: (socket: Socket) => void
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
