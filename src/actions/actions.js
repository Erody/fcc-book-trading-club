export function fetchBooks() {
	return dispatch => {
		fetch('/api/books');
	}
}