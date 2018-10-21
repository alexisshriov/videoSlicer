import { createStore } from 'redux'
import rootReducer from '../reducers'

const initialClips = [
        { id: 'c80d', name: 'clip1', startTime: 4, endTime: 7, tags: 'tag1,tag2,tag3' },
        { id: '29dh', name: 'clip3', startTime: 35, endTime: 38, tags: 'tag3' }
    ]


const initialState =  {
    clips: JSON.parse(localStorage.getItem('clips')) || initialClips
}

const configureStore = () => {
    return createStore(rootReducer, initialState)
}

export default configureStore;