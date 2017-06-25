export function catchErrors (fn) {
	return function(req, res, next) {
		return fn(req, res, next).catch(next);
	};
}

export function notFound (req, res, next) {
	res.status(404).json({
		errors: {
			global: 'Oops, something went wrong.'
		}
	})
}