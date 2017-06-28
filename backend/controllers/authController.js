import {validateInput} from '../helpers/validation';

export async function signup (req, res) {
	const { isValid, errors } = validateInput(req.body);

	if (isValid) {
		res.json({success: true})
	} else {
		res.status(400).json({errors});
	}
}