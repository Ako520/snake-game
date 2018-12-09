// @flow
import React, { Component } from 'react'
import { Form } from 'antd'
import Size from './size';

export default class Settings extends Component<{}> {
  render() {
    return (
      <Form layout='inline'>
        <Size />
      </Form>
    )
  }
}
