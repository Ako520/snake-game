import { observable, action , computed} from 'mobx'
import Pixel from './pixel'
import Snake from './snake'

export default class Ground {
  @observable pixels = []
  @observable score = 0
  @observable snake = {}
  @observable eggIndex = 876
  
  constructor(rowNum = 20, colNum = 20){
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
    console.log(this.rightPixelsWall.slice())
    this.snake = Snake.fromJS(rowNum, this.colNum)
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


  static fromJS(rowNum, colNum) {
    const store = new Ground(rowNum, colNum)
    store.snake = Snake.fromJS(store, rowNum, colNum)
    return store
  }
}
