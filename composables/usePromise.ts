export default <T>(
	onTry: ((args?: any) => {}) | ((args?: any) => Promise<void>),
	onError?: ((args?: any) => {}) | ((args?: any) => Promise<void>)
) => {
	return new Promise<T | void>((resolve, reject) => {
		try {
			// Try callback
			onTry()

			resolve()
		} catch (error) {
			// Error callback
			if (onError) onError()

			reject(error)
		}
	})
}
