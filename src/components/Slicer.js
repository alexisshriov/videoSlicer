import React, { Component } from 'react'

class Slicer extends Component {
    state = {name:'', startTime:'', endTime:'', tags: ''}

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleClick = () => {
        const { name, startTime, endTime, tags} = this.state
        const clip = { id: this.generateId(), name, startTime: Number(startTime), endTime: Number(endTime), tags }
        this.props.addClip(clip)
    }

    generateId = () => (
        Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    )

    render(){
        return (
            <div style= {{borderStyle: 'double', padding: 5, width: 900}}>
                <label>
                    name:
                    <input type="text" name="name" onChange={this.handleChange}/>
                </label>
                <label>
                    startTime:
                    <input type="text" name="startTime" onChange={this.handleChange}/>
                </label>
                <label>
                    endTime:
                    <input type="text" name="endTime" onChange={this.handleChange}/>
                </label>
                <label>
                    tags:
                    <input type="text" name="tags" onChange={this.handleChange}/>
                </label>
                <button onClick = {this.handleClick}>add clip</button>
            </div>
        )
    }
}

export default Slicer