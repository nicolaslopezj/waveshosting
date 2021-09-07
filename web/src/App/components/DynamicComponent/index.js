import React from 'react'
import Loading from './Loading'
import Loadable from 'react-loadable'

export default loader => {
  return Loadable({
    loader,
    loading: Loading,
    render(loaded, props) {
      const Component = loaded.default
      return <Component {...props} />
    }
  })
}
