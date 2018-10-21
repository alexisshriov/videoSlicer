import React, { Component } from 'react'
import * as actions from '../actions/clips'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import VideoPlayer from './VideoPlayer'
import ReproductionList from './ReproductionList'
import Slicer from './Slicer'

class Main extends Component {

    state = { url: 'https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4', videoRef: undefined, isVideoLoading: false }
    //currentClip = undefined;
    nextClip = undefined;
    self = this;

    playClip = (clip) => {
        
        // if the clip is null then the play list stops
        if (!clip) {
            return
        }

        // put together the url corresponding to the selected clip
        const baseUrl = this.state.url.split('#')[0]
        let clipUrl = `${baseUrl}#t=${clip.startTime}`

        if (clip.endTime !== 0) {
            clipUrl = clipUrl + `,${clip.endTime}`
        }

        this.setState({ url: clipUrl })
        const index = this.props.clips.indexOf(clip)
       // this.currentClip = clip
        this.nextClip = this.props.clips[index + 1]
        this.prevClip = this.props.clips[index - 1]

        // keep reference to this object to be used inside the  eventListeners 
        const self = this


        setTimeout(() => {
            this.state.videoRef.play()

            // when the video is paused and the clip has finished then it displays the loader
            this.state.videoRef.addEventListener('pause', function () {
                if (Math.floor(self.state.videoRef.currentTime) === clip.endTime) {
                    self.setState({ isVideoLoading: true })
                }
            })
        }, 400)

        const nextClip = this.nextClip
        const prevClip = this.prevClip

        //  logic to handle the hot keys (q and w)
        document.body.addEventListener('keypress', (e) => {
            if (e.which === 119) {
                self.playClip(nextClip)
            }
            if (e.which === 113) {
                self.playClip(prevClip)
            }
        });
    }

    countDownDone = () => {
        this.setState({ isVideoLoading: false })
        this.playClip(this.nextClip)
    }

    editClip = (clip) => {
        this.props.editClip(clip)
    }

    removeClip = (id) => {
        this.props.removeClip(id)
    }

    setVideoRef = (ref) => {
        this.setState({ videoRef: ref })
    }

    saveAllchanges = () => {
        localStorage.setItem('clips', JSON.stringify(this.props.clips))
    }

    render() {
        return (
            <div style={{ margin: 100 }}>
                <div style={styles}>
                    <VideoPlayer url={this.state.url} width={300} heigth={300} clips={this.props.clips} selectClip={(url) => this.selectClip(url)} setVideoRef={this.setVideoRef} countDownDone={() => this.countDownDone()} isLoading={this.state.isVideoLoading} playClip={this.playClip} />
                    <ReproductionList clips={this.props.clips} editClip={this.editClip} removeClip={this.removeClip} playClip={this.playClip} />
                </div>

                <div>
                    <Slicer addClip={this.props.addClip} />
                    <button style={{ backgroundColor: 'lightBlue' }} onClick={this.saveAllchanges}>save all changes</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clips: state.clips
    }
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = {
    display: 'flex',
    justifyContent: 'flex-Start'
}