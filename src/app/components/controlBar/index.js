// @flow
import React from 'react'
import { Row } from 'antd'
import Score from './score';
import ground from '../../stores/ground'
import {observer} from 'mobx-react'
import Settings from './settings/index'

@observer
class ControlBar extends React.Component<{}> {
  render() {
    return (
      <div>
        <Score
          score={ground.score}
        />
        <Row type='flex' align='middle' justify='center'>
          <Settings />
        </Row>
      </div>
    )
  }
}

export default ControlBar