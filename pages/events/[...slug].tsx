import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../helpers/api-util";
import Head from "next/head";

function FilteredEventsPage(props: any) {
  console.log(2, props);

  const filteredEvents = props.events.filter((event: any) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === props.date.numYear &&
      eventDate.getMonth() === props.date.numMonth - 1
    );
  });

  if (!props.events || props.events.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${props.date.year}/${props.date.month}`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
