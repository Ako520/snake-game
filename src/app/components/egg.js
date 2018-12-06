import React from 'react';
import { observer } from 'mobx-react'

@observer
class Egg extends React.Component {
  render() {
    let { ground } = this.props
    return (
      <div className="egg" onClick={ground.changeEggIndex}></div>
    )
  }
}

export default Egg