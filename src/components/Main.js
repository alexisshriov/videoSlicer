import React, { Component } from 'react'
import * as actions from '../actions/clips'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import VideoPlayer from './VideoPlayer'
import ReproductionList from './ReproductionList'
import Slicer from './Slicer'

class Main extends Component {

    state = { url: 'http://www.html5videoplayer.net/videos/toystory.mp4', videoRef: undefined, isVideoLoading: false }
    currentClip = undefined;
    nextClip = undefined;
    self = this;


    playClip = (clip) => {
        if(!clip){
            return
        }

        const baseUrl = this.state.url.split('#')[0]
        let clipUrl = `${baseUrl}#t=${clip.startTime}`
        if(clip.endTime !== 0){
            clipUrl = clipUrl + `,${clip.endTime}`
        }
        this.setState({ url: clipUrl })
        this.currentClip = clip
        const index = this.props.clips.indexOf(clip)
        this.nextClip = this.props.clips[index + 1]
        this.prevClip = this.props.clips[index -1]
        const self = this

        setTimeout(() => {
            this.state.videoRef.play()
            this.state.videoRef.addEventListener('pause', function(){

            if(Math.floor(self.state.videoRef.currentTime) === clip.endTime){
                self.setState({isVideoLoading: true})
            }
         })
        }, 100)

        // document.body.addEventListener('keypress', (e) => {
        //     debugger
        //     if(e.which === 119){
        //         self.playClip(self.nextClip)
        //     }
        //     if(e.which === 113){
        //         self.playClip(self.prevClip)
        //     }
        // }); 
    }
    
    countDownDone = () => {
        this.setState({isVideoLoading: false})
        this.playClip(this.nextClip)
    }

    editClip = (clip) => {
        this.props.editClip(clip)
    }

    removeClip = (id) => {
        this.props.removeClip(id)
    }

    setVideoRef = (ref) => {
        this.setState({videoRef: ref})
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
                    <button style = {{backgroundColor: 'lightBlue'}} onClick={this.saveAllchanges}>save all changes</button>
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