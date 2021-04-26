import student from '../controllers/student'
import company from '../controllers/company'
import manage from '../controllers/manage'
import auth from '../controllers/auth'

class Route {
    constructor(prefix, router) {
        this.prefix = prefix;
        this.router = router;
    }
}

const manageRoute = new Route('/manage', manage)
const studentRoute = new Route('/student', student)
const companyRoute = new Route('/company', company)
const authRoute = new Route('/auth', auth)

const router = [manageRoute, studentRoute, companyRoute, authRoute]

export default router