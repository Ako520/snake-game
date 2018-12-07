// @flow
import { observable, action , computed} from 'mobx'
import Pixel from './pixel'
import Snake from './snake'

class Ground {
  @observable pixels = []
  @observable score = 0
  @observable snake: Snake
  @observable eggIndex = 876
  
  rowNum: number
  colNum: number
  topPixelsWall: (number)[]
  bottomPixelsWall: (number)[]
  leftPixelsWall: (number)[]
  rightPixelsWall: (number)[]

  constructor(rowNum:number = 20, colNum: number = 20){
    this.rowNum = rowNum
    this.colNum = colNum
    let index = 0
    for (let i = 0; i < this.colNum; i++) {
      for (let j = 0; j < rowNum; j++) {
        this.pixels.push(
          new Pixel(index)
        )
        index++
      }
    }
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

  @action start = () => {
    this.snake.start()
  }

  @action changeEggIndex = () => {
    this.eggIndex = Math.round(Math.random() * ( this.pixels.length - 1 ))
    console.log('change')
  }


  static fromJS(rowNum: number, colNum: number) {
    const store = new Ground(rowNum, colNum)
    store.snake = Snake.fromJS(store)
    return store
  }
}

export default Ground.fromJS(40, 40)