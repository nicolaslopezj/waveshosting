import React from 'react'

export default function Layout(props) {
  return (
    <div>
      <div className="header">
        <img className="logo" src="https://waveshosting.com/dark1500.png" alt="Logo" />
      </div>
      <div className="content">
        <div className="content-inner">{props.children}</div>
      </div>
      <div className="footer">
        <p>
          If you have any doubt, chat with us in{' '}
          <a href="https://waveshosting.com">waveshosting.com</a>
        </p>
      </div>
    </div>
  )
}
