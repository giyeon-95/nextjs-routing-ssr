import { useRouter } from "next/router";
import { Fragment } from "react";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import { getAllEvents } from "../../dummy-data";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";

const EventDetailPage = (props: any) => {
  const event = props.seletedEvent;

  // const router = useRouter();
  // const eventId: any = router.query.eventId;

  // if (!event)
  //   return (
  //     <ErrorAlert>
  //       <p>No event found!</p>
  //     </ErrorAlert>
  //   );

  if (!event)
    return (
      <div className={"center"}>
        <p>Loading...</p>
      </div>
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

//pre patch 설정
export async function getStaticProps(context: any) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      seletedEvent: event,
    },
    revalidate: 30,
  };
}

//paths 설정
export async function getStaticPaths() {
  //모든 events를 가져오는 것은 비효율적.
  //주요 event 들만 추려서 가져오기(실제 방문율과 상관있는 데이터)
  //const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map((event: any) => ({
    params: {
      eventId: event.id,
    },
  }));

  //falback(required) : false  - 미리 지정된 paths외의 값이 들어오면 404 설정 (모든 data paths설정 하지 않았다면 true, 'blocking' : loading 표시 x )
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default EventDetailPage;
