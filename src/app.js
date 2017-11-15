import React, { Component } from 'react'
import ReactDom from 'react-dom'

class Label extends Component {
    render () {
        return (
            <div>
                yep yop!
            </div>
        )
    }
}

ReactDom.render(<Label/>, document.getElementById('root'))