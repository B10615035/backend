import user from '../controllers/user'

class Route {
    constructor(prefix, router) {
        this.prefix = prefix;
        this.router = router;
    }
}

const manageRoute = new Route('/181229424893bb65d94a74c2132b8b9e5adfe851464fdb5cb9f49e8a8204be7b', user)

const router = [manageRoute]

export default router