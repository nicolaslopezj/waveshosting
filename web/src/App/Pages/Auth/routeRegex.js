const routes = ['/login', '/register', '/verify-email', '/forgot', '/reset', '/enroll'].map(
  path => {
    return `\\${path}`
  }
)

const regex = `^(${routes.join('|')})`

export default new RegExp(regex)
