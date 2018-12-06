import { observable, computed, action } from 'mobx'

export default class Snake {
  /*
   *  37 左
   *  38 上
   *  39 右
   *  40 下
   */
  @observable body = []
  @observable direction = 39
  @observable steps = []
  @observable initSpeed

  constructor(store, rowNum, initSpeed = 5){
    this.store = store
    this.initSpeed = initSpeed
    this.rowNum = rowNum
    this.colNum = rowNum * 1.2
    let snakeStartIndex = (rowNum / 2 - 1 ) * (rowNum * 1.2)
    for (let i = 0; i < 4; i++) {
      this.body.push(3 + snakeStartIndex + i)
    }
  }

  @computed get headIndex () {  // 头的位置
    return this.body[this.body.length - 1]
  }

  @computed get speed () {  // 头的位置
    return Math.floor(this.store.score / 3) + this.initSpeed
  }

  @computed get tailDirection () {  // 尾巴的方向 >> 用于吃蛋后加长的pixel的位置
    let direction
    switch (this.body[0] - this.body[1]) {
      case -this.colNum:
        direction = 40
        break;
      case 1:
        direction = 39
        break;
      case this.colNum:
        direction = 38
        break;
      case -1:
        direction = 37
        break;
      default:

    }
    return direction
  }

  @action turnDirection = (nextStepDirection) => {   // 改变方向 >> 如果当前方向是左 新方向是右或左 那么不会改变方向
    const lastStepDirection = this.steps[this.steps.slice().length - 1]
    if (this.steps.length === 0 && this.direction !== nextStepDirection && Math.abs(nextStepDirection - this.direction) !== 2) {
      this.steps.push(nextStepDirection)
    } else if (this.steps.length !== 0 && lastStepDirection !== nextStepDirection && Math.abs(nextStepDirection - lastStepDirection) !== 2) {
      this.steps.push(nextStepDirection)
    }
  }

  @action addBodyLength = () => {  // 吃egg后增加身长的位置
    switch (this.tailDirection) {
      case 40:
        this.body.unshift(this.body[0] + this.colNum)
        break;
      case 39:
        this.body.unshift(this.body[0] - 1)
        break;
      case 38:
        this.body.unshift(this.body[0] - this.colNum)
        break;
      case 37:
        this.body.unshift(this.body[0] + 1)
        break;
      default:

    }
  }

  @action start = () => {     // 开始游戏
    // 这个for是为了不等1秒 先走一格
    for (let i = 0, length = this.body.length; i < length; i++) {
      this.body[i] += 1
    }
    setInterval(this.run, 1000 / this.speed)
  }

  @action run = () => {        // 定时移动
    console.log(1000 / this.speed)
    if (this.steps.length === 0) {
      switch (this.direction) {
        case 40:
          this.goBottom()
          break;
        case 39:
          this.goRight()
          break;
        case 38:
          this.goTop()
          break;
        case 37:
          this.goLeft()
          break;
        default:
      }
    } else {
      this.direction = this.steps[0]
      switch (this.direction) {
        case 40:
          this.goBottom()
          break;
        case 39:
          this.goRight()
          break;
        case 38:
          this.goTop()
          break;
        case 37:
          this.goLeft()
          break;
        default:
      }
      this.steps.shift()    // 执行stps的出队列操作
    }
    if (this.store.eggIndex === this.headIndex) {  // 如果蛋和蛇头位置一样 1. 增加分数 2. 增加长度 3. 改变蛋的位置
      this.store.score++                // 1.
      this.store.changeEggIndex()       // 3.
      this.addBodyLength()              // 2.
    }
  }

  @action goRight = () => {    // 向右移动
    if (this.store.rightPixelsWall.indexOf(this.headIndex) !== -1 ) {  // 如果撞到右边墙则传送到左边
      this.body.push(this.headIndex - this.colNum + 1)
      this.body.shift()
    } else {                                                           // 正常向右移动
      this.body.push(this.headIndex + 1)
      this.body.shift()
    }
  }

  @action goTop = () => {       //向上移动
    if (this.store.topPixelsWall.indexOf(this.headIndex) !== -1) {     // 如果撞到上边墙则传送到下边
      this.body.push(this.headIndex + this.colNum * this.rowNum )
      this.body.shift()
    } else {                                                           // 正常向上移动
      this.body.push(this.headIndex - this.colNum)
      this.body.shift()
    }
  }

  @action goLeft = () => {      // 向左移动
    if (this.store.leftPixelsWall.indexOf(this.headIndex) !== -1) {    // 如果撞到左边墙则传送到右边
      this.body.push(this.headIndex + this.colNum - 1)
      this.body.shift()
    } else {                                                           // 正常向左移动
      this.body.push(this.headIndex - 1)
      this.body.shift()
    }
  }

  @action goBottom = () => {    //向下移动
    if (this.store.bottomPixelsWall.indexOf(this.headIndex) !== -1) {  // 如果撞到下边墙则传送到上边
      this.body.push(this.headIndex - this.colNum * this.rowNum )
      this.body.shift()
    } else {                                                           // 正常向下移动
      this.body.push(this.headIndex + this.colNum)
      this.body.shift()
    }
  }

  static fromJS(store, rowNum) {
    return new Snake(store, rowNum)
  }
}
