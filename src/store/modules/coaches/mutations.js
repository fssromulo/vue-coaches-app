export default {
	registerCoach(state, payload) {
		state.coachesList.push(payload);
	},
	setCoaches(state, payload) {
		state.coachesList = payload;
	},
	setFetchTimestamp(state) {
		state.lastFetch = new Date().getTime();
	},
};
