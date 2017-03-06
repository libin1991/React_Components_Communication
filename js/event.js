export var events = {
	ctc: 'ctc',
	ctp: 'ctp',
	ptc: 'ptc',
	bts: 'bts',
	stb: 'stb'
}

export var sendEvent = (eventName, params) => {
	var event = new Event(eventName)
	event.params = params
	document.dispatchEvent(event)
}

export var catchEvent = (eventName, callback) => {
	document.addEventListener(eventName, e => callback(e))
}
