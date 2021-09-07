import React from 'react'
import Root from 'App/Root'
import Pages from './Pages'
import {BrowserRouter} from 'react-router-dom'

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter key={Math.random()}>
        <Root>
          <Pages />
        </Root>
      </BrowserRouter>
    )
  }
}
