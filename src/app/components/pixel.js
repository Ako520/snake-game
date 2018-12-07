// @flow
import React from 'react';
import { observer } from 'mobx-react'
import cx from 'classnames'

type Props = {
  isSnake: boolean,
  index: number
}

@observer
class Pixel extends React.Component<Props> {
  render() {
    const { isSnake, index } = this.props
    let pixelClass = cx({
      "pixel": true,
      "snake": isSnake
    })
    return (
      <div num={index + 1} className={pixelClass} onClick={() => {console.log(this.props.index)}}></div>
    )
  }
}

export default Pixel