import React, {PureComponent} from 'react'
import ReactCountdownClock from 'react-countdown-clock'

class VideoPlayer extends PureComponent {
    state = { clips: [], duration: 0 } 
    playerWidth = 900;

    componentDidMount(){
        let video = this.refs.video
        this.props.setVideoRef(video)
        video.play()

        const self = this
        
        video.addEventListener('loadeddata', function () {
            video.pause()
            self.setState({ clips: self.props.clips, duration: video.duration})

        })
        video.play()
    } 

    componentDidUpdate() {
        this.setState({ clips: this.props.clips }) 
    }

    handleMarkClick = (clip) => {
        this.props.playClip(clip)
    }

    renderMarks = () => {
        const duration = this.state.duration
        const self = this;

        if(duration){
            return this.props.clips.map((clip) => {
                const distance = clip.startTime * (self.playerWidth - 60) / duration + 30 //interpolating duration to distance in pixels
                return  <div key={clip.id} onClick = {() => this.handleMarkClick(clip) } style={{ textAlign:'center', position: 'absolute', width: 18, heigth: 20, backgroundColor: 'yellow', zIndex: 2, marginTop: -50, marginLeft: distance}}>c</div>
             })
        }
        return null 
    }

    render(){
        return (
            <div>
                {this.props.isLoading?
                <div style={{backgroundColor: 'black', display:'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}> 
                    <ReactCountdownClock seconds={3} onComplete= {() => this.props.countDownDone()} color='gray' size={300} /> 
                </div> : null}

                <div style = {{visibility: this.props.isLoading?'hidden':'visible'}} >
                    <video width={this.playerWidth} ref='video' controls src={this.props.url} type="video/mp4" >
                        Your browser does not support HTML5 video.
                    </video>
                </div>
                {this.renderMarks()}     
            </div>
        )
    }
}

export default VideoPlayer