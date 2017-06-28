import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/typeExports';
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
		case DELETE_FLASH_MESSAGE:
			return state.filter(item => {
				return item.id !== action.id;
			});
		default: return state;
	}
}