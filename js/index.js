import React, {Component} from 'react'
import {render} from 'react-dom'
import Parent from './parent'

class Page extends Component {
	
	render() {
		return (
			<Parent />
		)
	}
}

render(<Page />, document.getElementById('root'))
