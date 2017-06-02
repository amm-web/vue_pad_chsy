
const router = [{
  path: '/login',
  component: function (resolve) {
    require(['VIEWS/login'], resolve)
  }
}]

export default router
