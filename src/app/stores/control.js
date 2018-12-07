// @flow
import {DIRECTION, COMMAND, GAMESTATUS} from '../utils/const'
import { observable } from 'mobx'
import typeof ground from './ground'

class Control {
  @observable gameStatus = GAMESTATUS.WAITING
  ground: ground

  constructor() {
    this.bindKeyDownEvent()
  }

  bindKeyDownEvent = () => {
    const { BOTTOM, RIGHT, TOP, LEFT } = DIRECTION
    const directionKeyCode = [BOTTOM, RIGHT, TOP, LEFT]

    window.document.onkeydown = (e) => {
      if (directionKeyCode.indexOf(e.keyCode) !== -1) {
        this.ground.snake.turnDirection(e.keyCode)
      }
      console.log('e.keyCode', e.keyCode)
      switch (e.keyCode) {
        case BOTTOM || RIGHT || TOP || LEFT:
          this.ground.snake.turnDirection(e.keyCode)
          break;
        case COMMAND.TOGGLEGAME:
          this.startOrPauseGame()
          break;
        default:

      }
    }
  }

  startOrPauseGame = () => {
    const startGame = () => {
      this.gameStatus = GAMESTATUS.PLAYING
      this.ground.snake.start()
    }

    const pauseGame = () => {
      this.gameStatus = GAMESTATUS.WAITING
      this.ground.snake.pause()
    }

    if (this.gameStatus === GAMESTATUS.WAITING) {
      startGame()
    } else {
      pauseGame()
    }
  }
}

export default new Control()