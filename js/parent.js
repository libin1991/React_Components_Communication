import React, {Component} from 'react'
import Brother from './brother'
import Sister from './sister'
import {events, sendEvent, catchEvent, removeCatch} from './event'

export default class Parent extends Component {
	constructor() {
		super()
		this.state = {
			number: 0,
			backNumber: 0,
			messageBTS: '',
			messageSTB: ''
		}
		
		//防止多次引用
		this._brotherToSister = this.brotherToSister.bind(this)
		this._sisterToBrother = this.sisterToBrother.bind(this)
	}
	
	componentDidMount() {
		catchEvent(events.bts, this._brotherToSister)
		catchEvent(events.stb, this._sisterToBrother)
		//会造成多次引用
//		catchEvent(events.bts, this.brotherToSister.bind(this))
		//会造成多次引用
//		catchEvent(events.stb, this.sisterToBrother.bind(this))
	}
	
	componentWillUnmount() {
		removeCatch(event.bts, this._brotherToSister)
		removeCatch(events.stb, this._sisterToBrother)
	}
	
	brotherToSister(e) {
		this.setState({
			messageBTS: e.params.message
		})
	}
	
	sisterToBrother(e) {
		this.setState({
			messageSTB: e.params.message
		})
	}
	
	parentToChild() {
		let _number = this.state.number
		this.setState({
			number: _number + 1
		})
	}
	
	childToParent() {
		let _backNumber = this.state.backNumber
		this.setState({
			backNumber: _backNumber + 1
		})
	}
	
	render() {
		let _parentToChild = this.parentToChild.bind(this)
		let _number = this.state.number
		let _childToParent = this.childToParent.bind(this)
		let _backNumber = this.state.backNumber
		let _messageBTS = this.state.messageBTS
		let _messageSTB = this.state.messageSTB
		
		return (
			<div className='Parent'>
				<Brother number={_number} childToParent={_childToParent} />
				<div className='Utils'>
					<button onClick={_parentToChild}>父向子通信</button>
					<div>{'子向父通信：' + _backNumber}</div>
					<div>
						{'messageBTS: ' + _messageBTS}
					</div>
					<div>
						{'messageSTB: ' + _messageSTB}
					</div>
				</div>
				<Sister number={_number} childToParent={_childToParent} />
			</div>
		)
	}
}
