// @flow
import { Subject } from 'rxjs'

class Events {
  $setSize: Subject
  constructor() {
    this.$setSize = new Subject()
  }
}

export default new Events()