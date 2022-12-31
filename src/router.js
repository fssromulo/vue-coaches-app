import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetails.vue";
import CoachList from "./pages/coaches/CoachList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";

import ContactCoaches from "./pages/requests/ContactCoaches.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store/index.js";

import NotFound from "./pages/NotFound.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", redirect: "/coaches" },
		{ path: "/coaches", component: CoachList },
		{
			path: "/coaches/:id",
			props: true,
			component: CoachDetail,
			children: [{ path: "contact", component: ContactCoaches }],
		},
		{ path: "/register", component: CoachRegistration, meta: { requiresAuth: true } },
		{ path: "/request", component: RequestsReceived, meta: { requiresAuth: true } },
		{ path: "/auth", component: UserAuth, meta: { requiresUnauth: true } },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

router.beforeEach((to, _, next) => {
	if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
		next("/auth");
	} else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
		next("/coaches");
	} else {
		next();
	}
});

export default router;
