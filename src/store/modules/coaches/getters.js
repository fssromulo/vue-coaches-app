export default {
	coachesList(state) {
		return state.coachesList;
	},

	hasCoaches(state) {
		return state.coachesList && state.coachesList.length > 0;
	},

	isCoach(_, getters, _2, rootGetters) {
		const coaches = getters.coachesList;
		const userId = rootGetters.userId;
		return coaches.some((coach) => coach.id === userId);
	},

	shouldUpdate(state) {
		const lastFetch = state.lastFetch;
		if (!lastFetch) {
			return true;
		}

		const currentTimestamp = new Date().getTime();
		return (currentTimestamp - lastFetch) / 1000 > 60;
	},
};
