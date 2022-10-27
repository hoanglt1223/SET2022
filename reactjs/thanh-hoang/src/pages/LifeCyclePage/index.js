import { Component } from 'react'

class LifeCyclePage extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }
  changeState() {
    this.setState({ index: this.state.index + 1 })
  }
  componentWillMount() {
    console.log('component Will Mount')
  }
  componentDidMount() {
    console.log('component Did Mount')
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('should Component Update with nextProps, nextState', nextProps, nextState)
    return nextState.index % 2 === 0
  }
  componentWillUpdate() {
    console.log('component Will Update with state', this.state)
  }
  componentDidUpdate() {
    console.log('component Did Update with state', this.state)
  }

  render() {
    return (
      <div>
        <h1>{this.state.index}</h1>
        <button onClick={this.changeState.bind(this)}>Click me</button>
      </div>
    )
  }
}
export default LifeCyclePage
