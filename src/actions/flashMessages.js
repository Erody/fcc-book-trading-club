import { ADD_FLASH_MESSAGE } from './typeExports';

export function addFlashMessage(message) {
	return {
		type: ADD_FLASH_MESSAGE,
		message
	}
}