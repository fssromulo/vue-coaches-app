import { createRouter, createWebHistory } from "vue-router";

import CoachDetail from "./pages/coaches/CoachDetails.vue";
import CoachList from "./pages/coaches/CoachList.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";

import ContactCoaches from "./pages/requests/ContactCoaches.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";

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
		{ path: "/register", component: CoachRegistration },
		{ path: "/request", component: RequestsReceived },
		{ path: "/:notFound(.*)", component: NotFound },
	],
});

export default router;
