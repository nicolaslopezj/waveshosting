import React, {Suspense} from 'react'
import Loading from './Loading'

export default function SuspenseLoading(props) {
  return <Suspense fallback={<Loading {...props} />}>{props.children}</Suspense>
}
