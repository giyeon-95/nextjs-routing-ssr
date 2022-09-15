import type { NextPage } from "next";
import Head from "next/head";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../helpers/api-util";

const Home: NextPage = (props: any) => {
  const { events } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve."
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  //revalidate : update data 주기 설정 (미설정 시 build시에 끌어온 data지속)
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default Home;
