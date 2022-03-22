export const to = (promise: Promise<any> | any) => {
	return promise
	.then((data: any) => {
		return [null, data];
	})
	.catch((err: any) => [err, null])
}
