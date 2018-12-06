import React from 'react';
import { observer } from 'mobx-react'
import cx from 'classnames'

@observer
class Pixel extends React.Component {
  render() {
    const { isSnake } = this.props
    let pixelClass = cx({
      "pixel": true,
      "snake": isSnake
    })
    return (
      <div className={pixelClass} onClick={() => {console.log(this.props.index)}}></div>
    )
  }
}

export default Pixel