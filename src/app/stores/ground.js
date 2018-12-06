import { observable, action } from 'mobx'
import Pixel from './pixel'
import Snake from './snake'

export default class Ground {
  @observable pixels = []
  @observable score = 0
  @observable snake = {}
  @observable eggIndex = 876
  
  constructor(rowNum){
    let colNum = 1.2 * rowNum
    let index = 0
    for (let i = 0; i < rowNum * 1.2 ; i++) {
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
    for (let i = 0; i < colNum; i++) {
      this.topPixelsWall.push(i)   // 上面的像素墙
      this.bottomPixelsWall.push(colNum * (rowNum - 1) + i)   // 下面的像素墙
    }
    for (let i = 0; i < rowNum; i++) {
      this.leftPixelsWall.push(i * colNum) // 左面的像素墙
      this.rightPixelsWall.push((i + 1) * colNum - 1) // 右面的像素墙
    }
    console.log(this.rightPixelsWall.slice())
    this.snake = Snake.fromJS(rowNum)
  }

  @action start = () => {
    this.snake.start()
  }

  @action changeEggIndex = () => {
    this.eggIndex = Math.round(Math.random() * ( this.pixels.length - 1 ))
    console.log('change')
  }


  static fromJS(rowNum) {
    const store = new Ground(rowNum)
    store.snake = Snake.fromJS(store, rowNum)
    return store
  }
}
