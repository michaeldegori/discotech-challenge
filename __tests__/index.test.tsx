import { render } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

describe('Home', () => {
	it('Renders all sections each with list of event names and pictures', async () => {
		const populatedSections = [
			{
				section: 'Featured',
				data: [
					{
						name: 'Event 1',
						image_url:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png',
					},
					{
						name: 'Event 2',
						image_url:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png',
					},
				],
			},
			{
				section: 'Today',
				data: [
					{
						name: 'Event 3',
						image_url:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png',
					},
					{
						name: 'Event 4',
						image_url:
							'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/1200px-Nextjs-logo.svg.png',
					},
				],
			},
		];
		const { getByText, getByAltText } = render(
			<Home populatedSections={populatedSections} />
		);

		populatedSections.forEach(section => {
			const sectionTitle = getByText(section.section);
			expect(sectionTitle).toBeInTheDocument();

			section.data.forEach(event => {
				const eventName = getByText(event.name);
				expect(eventName).toBeInTheDocument();
				const eventImage = getByAltText(event.name);
				expect(eventImage).toBeInTheDocument();
			});
		});
	});
});
