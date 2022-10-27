import { Component } from 'react'

class LifeCyclePage extends Component {
  constructor(props) {
    super(props)
    this.state = { index: 0, name: 'Thanh Hoang' }
  }
  // *INFO: This method will update the state and trigger the render method again to update the DOM
  changeState() {
    this.setState({ index: this.state.index + 1 })
    this.setState({ name: 'Thanh Hoang 2' })
  }
  // *INFO: This method will be called before the component is mounted
  componentWillMount() {
    console.log('component Will Mount')
  }
  // *INFO: This method will be called after the component is mounted
  componentDidMount() {
    console.log('component Did Mount')
  }
  // *INFO: This method will be called when the component have some changes in the props or state
  // *INFO: This method will return a boolean value, if it returns true, the component will be updated, otherwise it will not be updated
  shouldComponentUpdate(nextProps, nextState) {
    // this.state.index = 1
    console.log('should Component Update with nextProps, nextState', nextProps, nextState)
    //* INFO: Only update the component if the index is even
    return nextState.index % 2 === 0
  }
  // *INFO: This method will be called before the component is updated
  componentWillUpdate() {
    console.log('component Will Update with state', this.state)
  }
  // *INFO: This method will be called after the component is updated
  componentDidUpdate() {
    console.log('component Did Update with state', this.state)
  }

  render() {
    return (
      <div>
        <h1>This is Life cycle page</h1>
        <h2>Index: {this.state.index}</h2>
        <button onClick={this.changeState.bind(this)}>Increase index</button>
      </div>
    )
  }
}
export default LifeCyclePage
