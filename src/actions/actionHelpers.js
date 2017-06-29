export function handleResponse(res) {
	if (res.ok) {
		return res.json();
	} else {
		const error = new Error(res.statusText);
		error.response = res;
		throw error;
	}
}

export function handleError(err) {
	console.log(err);
	console.log(err.response);
	throw err;
}