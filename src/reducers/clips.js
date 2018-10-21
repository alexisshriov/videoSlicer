import { ADD_CLIP, EDIT_CLIP, REMOVE_CLIP } from '../constants/ActionsTypes'

const clipsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_CLIP:
            return [action.clip, ...state]
        case EDIT_CLIP:
            return state.map((clip) => (clip.id === action.clip.id ? action.clip : clip))
        case REMOVE_CLIP:
            return state.filter((clip) => (clip.id !== action.id))
        default:
            return state;
    }
}
export default clipsReducer
