exports.template = () => {
	template = {
		remote: null,
		title: null,
		company: null,
		description: null,
		extWebsite: null,
		titleLink: null,
		startDate: null,
		endDate: null,
		location: {
			name: null,
			latitude: null,
			longitude: null 
		},
		compensation: {
			minimum: null,
			maximum: null,
			salary: null,
			rate: null
		}
	}
	return template;
}