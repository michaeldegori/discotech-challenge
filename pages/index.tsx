import { getEventsBySection, getSections } from '@/networking/eventsApi';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import EventSection from '@/components/EventSection';
import { PopulatedSection } from '@/models';

const Home = ({
	populatedSections,
}: {
	populatedSections: PopulatedSection[];
}) => {
	return (
		<>
			<Head>
				<title>Discotech</title>
				<meta name='description' content='Nextjs Challenge' />
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				{populatedSections.map(populatedSection => (
					<EventSection
						key={populatedSection.section}
						populatedSection={populatedSection}
					/>
				))}
			</main>
		</>
	);
};

export const getServerSideProps = async () => {
	const sections = await getSections();

	/** Populate the first page of each section */
	const populatedSections = await getEventsBySection(sections);

	return { props: { populatedSections } };
};

export default Home;
