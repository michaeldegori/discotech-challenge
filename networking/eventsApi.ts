import { customFetch } from './customFetch';

export const getSections = async () => {
	try {
		const sectionTypes: any = await customFetch(
			'https://api.discotech.me/v2/cities/4/discover',
			{ defaultValue: [] }
		);
		return sectionTypes;
	} catch (error) {
		console.error(error);
	}
};

export const getEventsBySection = async (sections: any) => {
	try {
		const eventPromises = sections.map(async (section: any) => {
			const eventsBySection = await customFetch(section.data_url, {
				defaultValue: [],
			});
			eventsBySection['section'] = section.display_name;

			return eventsBySection;
		});

		const updatedEvents = await Promise.all(eventPromises);
		const sectionsWithEvents = updatedEvents.map((section: any) => {
			return section;
		});
		return sectionsWithEvents;
	} catch (error) {
		console.error(error);
	}
};
