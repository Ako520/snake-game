// @flow
import React, { Component } from 'react'
import { Form , Radio , Input} from 'antd'
import { Row } from 'antd';
import ground from '../../../stores/ground'
import control from '../../../stores/control'
import {observer} from 'mobx-react'

const FormItem = Form.Item
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

@observer
class Size extends Component<{}> {
  render() {
    return (
      <FormItem
        label='Size'
      >
        <Row type='flex' align='middle' justify=''>
          <RadioGroup onChange={control.handleSizeChange} defaultValue='small'>
            <RadioButton value='large'>Large</RadioButton>
            <RadioButton value='middle'>Middle</RadioButton>
            <RadioButton value='small'>Small</RadioButton>
          </RadioGroup>
          <Input
            style={{ width: 110, marginLeft: 10 }}
            placeholder='row number'
            value={ground.rowNum}
          />
          <Input
            style={{ width: 110, marginLeft: 10 }}
            placeholder='col number'
            value={ground.colNum}
          />
        </Row>
      </FormItem>
    )
  }
}

export default Size