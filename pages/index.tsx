import type { NextPage } from "next";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";

const Home: NextPage = (props: any) => {
  const { events } = props;

  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
}

export default Home;
