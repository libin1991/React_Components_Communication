### 效果图
![enter description here][1]


#### 1.父向子通信

- 直接标签中插入参数即可

```
let _number = this.state.number
<Child number={_number} />
```

> 需要注意，_number 可以为普通参数、this.xxx 参数、也可以是 this.state.xxx 参数，其中this.state.xxx参数若发生改变，会导致 Child 重新渲染

#### 2.子向父通信

- 需要从 Parent 处接一个绑定了父组件的函数，然后在 Child 内部调用修改父的相关参数，达到效果

```
//从父组件接函数
childToParent() {
	let _backNumber = this.state.backNumber
	this.setState({
		backNumber: _backNumber + 1
	})
}
	
let _childToParent = this.childToParent.bind(this)

<Brother childToParent={_childToParent} />
<div>{'子向父通信：' + _backNumber}</div>

//子组件触发函数
let _childToParent = this.childToParent.bind(this)

<button onClick={_childToParent}>子向父通信</button>
```

>  同样，可以修改父组件的 this.state.xxx（ this.setState() 触发渲染），也可以修改this.xxx等值

#### 3.通用组件通信方式（包括兄弟组件）

- 理论上，掌握了子向父通信与父向子通信，可以处理兄弟组件通信，但是如果层级过深，这种方式极度麻烦

- 建议使用 Event 对象处理嵌套层级过深的组件通信（当然包括兄弟组件通信）

```
//建议将Event相关单独封装模块使用
//event.js
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

//brother.js 发送组件
import {events, sendEvent} from './event'
<button onClick={_brotherToSister}>Brother向Sister通信</button>

brotherToSister() {
	let _obj = {
		message: 'brother to sister'
	}
	sendEvent(events.bts, _obj)
}

//sister.js 接收组件
import {events, catchEvent} from './event'

constructor() {
	super()
	this.state = {
		message: ''
	}
	
	//防止多次引用
	this._brotherToSister = this.brotherToSister.bind(this)
}

brotherToSister(e) {
	this.setState({
		message: e.params.message
	})
}

<div>
	{'message: ' + _message}
</div>
```


  [1]: ./img/communication.gif "communication.gif"