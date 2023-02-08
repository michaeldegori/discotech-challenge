import Image from 'next/image';
import { useRef, useState } from 'react';
import styles from '@/styles/Home.module.css';
import { PopulatedSection } from '@/models';
import { fetchWithRetry } from '@/networking/customFetch';

const EventSection = ({
	populatedSection,
}: {
	populatedSection: PopulatedSection;
}) => {
	const [next50Url, setNext50Url] = useState(
		populatedSection.pagination?.next
	);
	const [eventList, setEventList] = useState<any>(populatedSection.data);

	const eventListScrollRef = useRef<HTMLDivElement>(null);
	const getNextPageOfEvents = async () => {
		if (!next50Url) {
			return;
		}

		const { data, pagination } = await fetchWithRetry(next50Url, {
			defaultValue: {
				data: [],
				pagination: {},
			},
		});
		setNext50Url(pagination?.next);
		setEventList((prev: any[]) => [...prev, ...data]);
	};

	const onScroll = async () => {
		if (eventListScrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				eventListScrollRef.current;
			if (scrollLeft + clientWidth === scrollWidth) {
				getNextPageOfEvents();
			}
		}
	};

	return (
		<div key={populatedSection.section}>
			<h2 className={styles.sectionHeader}>{populatedSection.section}</h2>
			<div
				className={styles.sectionContainer}
				onScroll={onScroll}
				ref={eventListScrollRef}
			>
				{eventList.map((event: any, idx: number) => {
					return (
						<div
							key={`${event.name}${idx}`}
							className={styles.eventContainer}
						>
							<div className={styles.imgContainer}>
								<Image
									src={
										event.image_url
											? event.image_url
											: event.image_urls[0]
									}
									alt={event.name}
									fill
									sizes='12rem'
									className={styles.img}
								/>
							</div>
							<div className={styles.venueTitleContainer}>
								<h3 className={styles.eventName}>
									{event.name}
								</h3>
								<h5>
									Venue:{' '}
									{event.venue_id
										? event.venue_id
										: event.hotel_name}
								</h5>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default EventSection;
