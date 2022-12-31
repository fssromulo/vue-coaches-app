export default {
	async contactCoach(context, payload) {
		const newRequest = {
			userEmail: payload.email,
			message: payload.message,
		};

		const response = await fetch(`https://vue-coachs-app-default-rtdb.firebaseio.com/requests/${payload.coachId}/.json`, {
			method: "POST",
			body: JSON.stringify(newRequest),
		});

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || "Failed to send a request.");
			throw error;
		}

		newRequest.id = responseData.name;
		newRequest.coachId = payload.coachId;
		context.commit("addRequest", newRequest);
	},
	async loadRequest(context) {
		const coachId = context.rootGetters.userId;
		const authUrl = `auth=${context.rootGetters.token}`;
		const response = await fetch(`https://vue-coachs-app-default-rtdb.firebaseio.com/requests/${coachId}.json?${authUrl}`);

		const responseData = await response.json();
		if (!response.ok) {
			const error = new Error(responseData.message || "Failed to fetch requests!");
			throw error;
		}

		const requestsList = [];
		for (const key in responseData) {
			const requestParsed = {
				id: key,
				coachId,
				message: responseData[key].message,
				userEmail: responseData[key].userEmail,
			};
			requestsList.push(requestParsed);
		}

		context.commit("setRequests", requestsList);
	},
};
