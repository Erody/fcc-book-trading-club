import { ADD_FLASH_MESSAGE } from '../actions/typeExports';
import shortid from 'shortid';

export default function flashMessages(state = [], action = {}) {
	switch(action.type) {
		case ADD_FLASH_MESSAGE:
			return [
				...state,
				{
					...action.message,
					id: shortid.generate()
				}
			];
		default: return state;
	}
}