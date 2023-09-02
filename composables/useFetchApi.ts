export default <T>(url: string, options: any = {}) => {
	const { useAuthToken } = useAuth()

	return $fetch<T>(url, {
		...options,
		headers: {
			...options.headers,
			Authorization: `Bearer ${useAuthToken().value}`,
		},
	})
}
