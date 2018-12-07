// @flow
import React from 'react';
import Pixel from './pixel.js'
import Egg from './egg.js'
import './ground.scss'
import { observer } from 'mobx-react'
import styled from 'styled-components'
import ground from '../stores/ground'

const GroundStyled = styled.div`
  width: ${props => (props.width + 'px') || '400px'};
  height: ${props => (props.height + 'px') || '400px'};
  background: ${props => props.theme.white};
  box-shadow: 0 0 2px ${props => props.theme.purpleLine};
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  margin-top: 100px;

  .pixel {
    width: ${props => ( ( (props.width || 400) - 1 ) / (props.rowNum) )}px;
    height: ${props => ( ( (props.height || 400) - 1 ) / (props.colNum) )}px;
    box-shadow: 0px 0px 1px ${props => props.theme.grayLine};
  }

  .egg {
    width: ${props => ( ( (props.width || 400) - 1 ) / (props.rowNum) )}px;
    height: ${props => ( ( (props.height || 400) - 1 ) / (props.colNum) )}px;
    box-shadow: 0px 0px 1px ${props => props.theme.grayLine};
    border-radius: 50%;
    background: black;
  }

  .pixel.snake {
    width: 20px;
    height: 20px;
    box-shadow: 0px 0px 1px ${props => props.theme.grayLine};
    background: black;
  }
`

@observer
class Ground extends React.Component<{}> {
  renderPixel = (): (any)[] => {
    return ground.pixels.map(pixel => {
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
    const { rowNum, colNum, width, height } = ground
    return (
      <React.Fragment>
        <GroundStyled
          rowNum={rowNum}
          colNum={colNum}
          width={width}
          height={height}
          className="ground"
        >
          {this.renderPixel()}
        </GroundStyled>
        <div className="score">{ground.score}</div>
      </React.Fragment>
    )
  }
}

export default Ground