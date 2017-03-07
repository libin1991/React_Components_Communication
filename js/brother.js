import React, {Component} from 'react'
import {events, sendEvent, catchEvent, removeCatch} from './event'

export default class Brother extends Component {
	
	constructor() {
		super()
		this.state = {
			message: ''
		}
		
		//防止多次引用
		this._sisterToBrother = this.sisterToBrother.bind(this)
	}
	
	componentDidMount() {
		catchEvent(events.stb, this._sisterToBrother)
		//会造成多次引用
//		catchEvent(events.stb, this.sisterToBrother.bind(this))
	}
	
	componentWillUnmount() {
		removeCatch(event.stb, this._sisterToBrother)
	}
	
	childToParent() {
		let _childToParent = this.props.childToParent
		_childToParent()
	}
	
	sisterToBrother(e) {
		this.setState({
			message: e.params.message
		})
	}
	
	brotherToSister() {
		let _obj = {
			message: 'brother to sister'
		}
		sendEvent(events.bts, _obj)
	}
	
	render() {
		let _childToParent = this.childToParent.bind(this)
		let _number = this.props.number
		let _brotherToSister = this.brotherToSister.bind(this)
		let _message = this.state.message
		
		return (
			<div className='Brother'>
				brother
				<div>
					{'父向子通信：' + _number}
				</div>
				<button onClick={_childToParent}>子向父通信</button>
				<button onClick={_brotherToSister}>Brother向Sister通信</button>
				<div>
					{'message: ' + _message}
				</div>
			</div>
		)
	}
}
