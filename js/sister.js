import React, {Component} from 'react'
import {events, sendEvent, catchEvent, removeCatch} from './event'

export default class Sister extends Component {
	
	constructor() {
		super()
		this.state = {
			message: ''
		}
		
		//防止多次引用
		this._brotherToSister = this.brotherToSister.bind(this)
	}
	
	componentDidMount() {
		catchEvent(events.bts, this._brotherToSister)
		//会造成多次引用
//		catchEvent(events.bts, this.brotherToSister.bind(this))
	}
	
	componentWillUnmount() {
		removeCatch(event.bts, this._brotherToSister)
	}
	
	brotherToSister(e) {
		this.setState({
			message: e.params.message
		})
	}
	
	childToParent() {
		let _childToParent = this.props.childToParent
		_childToParent()
	}
	
	sisterToBrother() {
		let _obj = {
			message: 'sister to brother'
		}
		sendEvent(events.stb, _obj)
	}
	
	render() {
		let _childToParent = this.childToParent.bind(this)
		let _number = this.props.number
		let _sisterToBrother = this.sisterToBrother.bind(this)
		let _message = this.state.message
		
		return (
			<div className='Sister'>
				sister
				<div>
					{'父向子通信：' + _number}
				</div>
				<button onClick={_childToParent}>子向父通信</button>
				<button onClick={_sisterToBrother}>Sister向Brother通信</button>
				<div>
					{'message: ' + _message}
				</div>
			</div>
		)
	}
}
