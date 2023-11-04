import { Server } from "socket.io"
import { defineNuxtModule } from "@nuxt/kit"

import type { Socket } from "socket.io"
import type {
	SocketStateInfo,
	ClientToServerEvents,
	ServerToClientEvents,
	InterServerEvents,
	SocketData,
} from "~/shared/socket"

function generateStateInfo(socket: Socket): SocketStateInfo {
	return {
		connected: socket.connected,
		disconnected: socket.disconnected,
	}
}

export default defineNuxtModule({
	setup(options, nuxt) {
		nuxt.hook("listen", (server) => {
			// Server listening
			console.log("[Socket.io]", server.address())

			const io = new Server<
				ClientToServerEvents,
				ServerToClientEvents,
				InterServerEvents,
				SocketData
			>(server ?? 5678, {})

			nuxt.hook("close", () => io.close())

			io.on("connection", (socket) => {
				// Server connection
				console.log("[Connection]", socket.id)

				// After socket connection
				socket.emit("connection", {
					id: socket.id,
				})

				socket.broadcast.emit("message", {
					data: `${socket.id} joined`,
					io: { id: socket.id },
					state: generateStateInfo(socket),
				})

				// Recived message
				socket.on("message", function message(data: any) {
					console.log(`[Event:Message:${socket.id}]`, data)
					socket.emit("message", {
						data: `${socket.id} joined`,
						io: { id: socket.id },
						state: generateStateInfo(socket),
					})
				})

				// After disconnect begin
				socket.on("disconnecting", () => {
					console.log(`[Disconnecting:${socket.id}]`)
					socket.broadcast.emit("message", {
						data: `${socket.id} joined`,
						io: { id: socket.id },
						state: generateStateInfo(socket),
					})
				})
			})

			// After Server disconnected
			io.on("disconnect", (socket) => {
				console.log(`[Disconnected:${socket.id}]`)
			})
		})
	},
})
