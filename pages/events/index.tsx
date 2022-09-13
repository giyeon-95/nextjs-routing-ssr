import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helpers/api-util";

const AllEventsPage = (props: any) => {
  const router = useRouter();

  const { events } = props;

  const findEventsHandler = (year: string, month: string) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve."
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
