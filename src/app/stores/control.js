// @flow
import {DIRECTION, COMMAND, GAMESTATUS} from '../utils/const'
import { observable } from 'mobx'
import ground from './ground'

class Control {
  @observable gameStatus = GAMESTATUS.WAITING
  ground: typeof ground

  constructor() {
    this.bindKeyDownEvent()
  }

  bindKeyDownEvent = () => {
    const { BOTTOM, RIGHT, TOP, LEFT } = DIRECTION
    const directionKeyCode = [BOTTOM, RIGHT, TOP, LEFT]

    window.document.onkeydown = (e) => {
      if (directionKeyCode.indexOf(e.keyCode) !== -1) {
        this.ground.snake.turnDirection(e.keyCode)
        e.preventDefault()
      }

      if (e.keyCode === COMMAND.TOGGLEGAME) {
        this.startOrPauseGame()
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

  sizeStrategies = {
    large: () => {
      ground.setSize(40, 40)
    },
    middle: () => {
      ground.setSize(20, 20)
    },
    small: () => {
      ground.setSize(20, 10)
    }
  }

  handleSizeChange = (e: any) => {
    this.sizeStrategies[e.target.value]()
  }
}

export default new Control()