import { createStore } from 'redux'
import rootReducer from '../reducers'

const initialClips = [
        { id: 'c80d', name: 'clip1', startTime: 10, endTime: 12, tags: 'tag1,tag2,tag3' },
        { id: 'c4th', name: 'clip2', startTime: 20, endTime: 22, tags: 'tag2,tag3' },
        { id: '29dh', name: 'clip3', startTime: 40, endTime: 50, tags: 'tag3' }
    ]


const initialState =  {
    clips: JSON.parse(localStorage.getItem('clips')) || initialClips
}

const configureStore = () => {
    return createStore(rootReducer, initialState)
}

export default configureStore;