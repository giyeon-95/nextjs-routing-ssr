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

  //revalidate : update data 주기 설정 (미설정 시 build시에 끌어온 data지속)
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default Home;
