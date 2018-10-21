import React, { Component } from 'react'
import Clip from './Clip'

class ReproductionList extends Component{

    state = { filter: '' }

    handleChange = (e) => {
        const tag = e.target.value;
        this.setState({filter: tag})
    }

    render() {
        const filteredClips = this.props.clips.filter(
            clip => {
                return clip.tags.includes(this.state.filter.trim())
            }
        )

        return (
            <div>
                <label><b>Filter:</b> </label> <input onChange={this.handleChange} name='filter' type='text' />
                <div style={{ height: 500, overflowY: 'scroll' }}>
                    <br /><br />
                    <Clip clip={{key: 'cfGt', name: 'Full Clip'}} isEditable={false} playClip = {this.props.playClip} key={'·cfGt'}/>
                    {filteredClips.map((clip) => (<Clip clip={clip} isEditable={true} editClip={this.props.editClip} removeClip={this.props.removeClip} playClip = {this.props.playClip} key={clip.id}/>))}
                </div>
            </div>

        )

    }

   
}

export default ReproductionList
