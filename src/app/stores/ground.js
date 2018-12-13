// @flow
import { observable, action , computed} from 'mobx'
import Pixel from './pixel'
import Snake from './snake'
import events from './events'

class Ground {
  @observable score = 0
  @observable snake: Snake
  @observable eggIndex
  @observable rowNum: number
  @observable colNum: number
  topPixelsWall: (number)[]
  bottomPixelsWall: (number)[]
  leftPixelsWall: (number)[]
  rightPixelsWall: (number)[]

  constructor(colNum: number = 20, rowNum:number = 10){
    this.setSize(colNum, rowNum)
    this.changeEggIndex() // init Egg
    this.bindEvents()
    
    this.topPixelsWall = []
    this.bottomPixelsWall = []
    this.leftPixelsWall = []
    this.rightPixelsWall = []
    for (let i = 0; i < this.colNum; i++) {
      this.topPixelsWall.push(i)   // 上面的像素墙
      this.bottomPixelsWall.push(this.colNum * (rowNum - 1) + i)   // 下面的像素墙
    }
    for (let i = 0; i < rowNum; i++) {
      this.leftPixelsWall.push(i * this.colNum) // 左面的像素墙
      this.rightPixelsWall.push((i + 1) * this.colNum - 1) // 右面的像素墙
    }
  }

  @computed get width () {
    return this.colNum * 20
  }

  @computed get height () {
    return this.rowNum * 20
  }

  @computed get pixels () {
    let index = 0
    const pixelArr = []

    for (let i = 0; i < this.colNum; i++) {
      for (let j = 0; j < this.rowNum; j++) {
        pixelArr.push(
          new Pixel(index)
        )
        index++
      }
    }

    return pixelArr
  }

  bindEvents = () => {
    events.$setSize.subscribe((params) => {
      if (params.size) {
        const sizeObj = this.sizeStrategies[params.size]
        this.setSize(sizeObj.colNum, sizeObj.rowNum)
      } else {
        this.setSize(params.colNum, params.rowNum)
      }

      this.changeEggIndex()
    })
  }

  sizeStrategies = {
    large: {
      colNum: 40, 
      rowNum: 40,
    },
    middle: {
      colNum: 20, 
      rowNum: 20,
    },
    small: {
      colNum: 20, 
      rowNum: 10,
    }
  }

  @action start = () => {
    this.snake.start()
  }

  @action changeEggIndex = () => {
    this.eggIndex = Math.round(Math.random() * ( this.pixels.length - 1 ))
  }

  @action setSize = (colNum: number, rowNum: number) => {
    this.rowNum = rowNum
    this.colNum = colNum
  }

  static fromJS(colNum: number, rowNum: number) {
    const store = new Ground(colNum, rowNum)
    store.snake = Snake.fromJS(store)
    return store
  }
}

export default Ground.fromJS(20, 10)