// @flow

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { ACButton } from './assoconnect'
import _spark from './template'

ReactDom.render(
    <ACButton label="close" ico="close"/>, 
    document.getElementById('root') || document.createElement('div')
)


export {_spark}
