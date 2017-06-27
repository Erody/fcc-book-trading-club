export function handleResponse(res) {
	if (res.ok) {
		return res.json();
	} else {
		const error = new Error(res.statusText);
		error.response = res;
		throw error;
	}
}