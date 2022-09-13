import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getAllEvents } from "../../dummy-data";
import { getEventById } from "../../helpers/api-util";

const EventDetailPage = (props: any) => {
  const { event } = props.seletedEvent;

  // const router = useRouter();
  // const eventId: any = router.query.eventId;

  if (!event)
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics {...event} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticProps(context: any) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      seletedEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();

  const paths = events.map((event: any) => ({
    params: {
      eventId: event.id,
    },
  }));

  console.log(2, paths);

  //falback : false  - 미리 지정된 paths외의 값이 들어오면 404 설정
  return {
    paths: paths,
    fallback: false,
  };
}

export default EventDetailPage;
