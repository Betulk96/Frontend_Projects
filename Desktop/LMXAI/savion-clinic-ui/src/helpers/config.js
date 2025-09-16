export const config = {
	project: {
		name: "Learning Matrix AI",
		slogan: "Learn Everything With Us",
		description:
			"",
		version: "1.0.0",
	},
	contact: {
		phone1: "+1 (212) 489-1895",
		phone2: "+1 (212) 489-1899",
		email: "info@lmxai.com",
		address: "Stocholm Netherlands",
		website: "https://lkai.app",
	},
	api: {
		NEXT_PUBLIC_BASE_URL: "https://api.dev.lkai.app",
	},
	userRightsOnRoutes: [
		{urlRegex: /\/chat$/, rights:["student"]},
	]
};
