import { ADD_CLIP, EDIT_CLIP, REMOVE_CLIP } from '../constants/ActionsTypes'

export const addClip = (clip) => {
    return { type: ADD_CLIP, clip }
}

export const editClip = (clip) => {
    return { type: EDIT_CLIP, clip }
}

export const removeClip = (id) => {
    return { type: REMOVE_CLIP, id }
}

