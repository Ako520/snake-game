// @flow
import {DIRECTION, COMMAND, GAMESTATUS} from '../utils/const'
import { observable } from 'mobx'
import ground from './ground'
import events from './events'

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
        ground.snake.turnDirection(e.keyCode)
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
      ground.snake.start()
    }

    const pauseGame = () => {
      this.gameStatus = GAMESTATUS.WAITING
      ground.snake.pause()
    }

    if (this.gameStatus === GAMESTATUS.WAITING) {
      startGame()
    } else {
      pauseGame()
    }
  }

  handleSizeChange = (e: any) => {
    events.$setSize.next({ size: e.target.value })
  }
}

export default new Control()