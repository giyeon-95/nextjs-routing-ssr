import type { NextPage } from "next";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../dummy-data";

const Home: NextPage = () => {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default Home;
