import React from 'react'
import {Link} from 'react-router-dom'

export default {
  login: 'Login',
  email: 'Email',
  twoFactor: 'Two factor code',
  password: 'Password',
  confirmPassword: 'Confirm password',
  register: 'Register',
  passwordDoesntMatch: "Passwords doesn't match",
  otherLinksInRegister: () =>
    <div>
      If you have an account <Link to="/login">login</Link>
    </div>,
  otherLinksInLogin: () =>
    <div>
      If you do not have an account you can <Link to="/register">register</Link>
      . If you forgot your password <Link to="/forgot">click here</Link>
    </div>
}
