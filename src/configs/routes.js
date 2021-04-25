import user from '../controllers/user'
import auth from '../controllers/auth'

class Route {
    constructor(prefix, router) {
        this.prefix = prefix;
        this.router = router;
    }
}

const manageRoute = new Route('/manage', user)
const studentRoute = new Route('/student', auth)
const companyRoute = new Route('/company', auth)

const router = [manageRoute, studentRoute]

export default router