import React, { Component } from 'react'

class Clip extends Component {
    clip = this.props.clip
    state = { id: this.clip.id, name: this.clip.name, startTime: this.clip.startTime, endTime: this.clip.endTime, tags: this.clip.tags, editingMode: false }

    saveChanges = () => {
        const editedClip = {
            id: this.state.id,
            name: this.state.name,
            startTime: Number(this.state.startTime),
            endTime: Number(this.state.endTime),
            tags: this.state.tags
        }
        this.props.editClip(editedClip)
        this.toggleEditingMode()
    }

    removeClip = (id) => {
        this.props.removeClip(id)
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    toggleEditingMode = () => {
        this.setState({ editingMode: !this.state.editingMode });
    }

    renderButtons = (isEditable) => {
        return (
            <div>
                <button onClick={() => this.props.playClip(this.props.clip)} style={{backgroundColor: 'lightGreen'}}>
                    play clip
                </button>
                {isEditable ?
                    <div>
                        {this.state.editingMode ? 
                        <button  onClick={this.saveChanges} style={{backgroundColor: 'lightBlue'}}>Save Changes</button> : 
                        <button onClick={this.toggleEditingMode} style={{backgroundColor: 'lightBlue'}}>Edit</button>}
                        <button style={{backgroundColor: 'pink'}} onClick={() => this.removeClip(this.state.id)}>remove</button>
                    </div>
                    : null}
            </div>
        )
    }

    render() {
        const { name, startTime, endTime, tags, editingMode } = this.state
        const { isEditable } = this.props

        return (
            <div style={style}>
                <p><b>name: </b> {editingMode ? <input type='text' name='name' value={name} onChange={this.handleChange} /> : <label>{name}</label>}</p>
                {isEditable ?
                    <div>
                        <p>
                            <b>start time: </b> {editingMode ? <input type='text' name='startTime' value={startTime} onChange={this.handleChange} style={{ width: 20 }} /> : <label>{startTime} </label>}
                            <b>end time: </b> {editingMode ? <input type='text' name='endTime' value={endTime} onChange={this.handleChange} style={{ width: 20 }} /> : <label>{endTime}</label>}
                        </p>
                        <p><b>tags: </b> {editingMode ? <input type='text' name='tags' value={tags} onChange={this.handleChange} /> : <label>{tags}</label>}</p>
                    </div>: null}
                {this.renderButtons(this.props.isEditable)}


            </div>
        )
    }
}

export default Clip

const style = {
    boxShadow: '0 4px 8px 0 gray',
    padding: 10,
    margin: 10
}
