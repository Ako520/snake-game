import React from 'react';
import GroundStore from '../stores/ground.js'
import Pixel from './pixel.js'
import Egg from './egg.js'
import './ground.scss'
import { observer } from 'mobx-react'

const ground = GroundStore.fromJS()

window.document.onkeydown = function (e) {
  let directionKeyCode = [37, 38, 39 ,40]
  if (directionKeyCode.indexOf(e.keyCode) !== -1) {
    ground.snake.turnDirection(e.keyCode)
  }
  switch (e.keyCode) {
    case 37 || 38 || 39 || 40:
      ground.snake.turnDirection(e.keyCode)
      break;
    case 32:
      ground.start()
      break;
    default:

  }
}

@observer
class Ground extends React.Component {
  renderPixel = () => {
    return  ground.pixels.map(pixel => {
        if (ground.eggIndex !== pixel.index) {
          if (ground.snake.body.indexOf(pixel.index) !== -1) { //如果是蛇的身体就渲染蛇
            return (<Pixel index={pixel.index} key={pixel.index} isSnake={true} />)
          } else {                                                 //否则渲染普通像素格
            return (<Pixel index={pixel.index} key={pixel.index} isSnake={false} />)
          }
        } else { // 如果蛋位置等于当前要渲染的像素格位置，则渲染蛋出来
          return (<Egg key={ground.eggIndex} ground={ground}/>)
        }
      }
    )
  }

  render() {
    return (
      <div>
        <div className="ground" onKeyDown={this.x}>
          {this.renderPixel()}
        </div>
        <div className="score">{ground.score}</div>
      </div>
    )
  }
}

export default Ground