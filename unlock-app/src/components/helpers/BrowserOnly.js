import { Component } from 'react'
import PropTypes from 'prop-types'

export default class BrowserOnly extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      show: false,
    }
  }

  componentDidMount() {
    this.setState({ show: true })
  }

  render() {
    const { show } = this.state

    if (!show) return null

    const { children } = this.props
    return children
  }
}
