import { useRouter } from "next/router";
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEventsPage = () => {
  const router = useRouter();

  const filterData = router.query.slug;

  //문제점 2. slug는 year, month 밖에없다.
  //url이 /events/2022/1/abc 이런 경로로 오는 것을 막아야 함.
  // console.log("filterData : ", filterData);

  if (!filterData) {
    //문제점 1 : 렌더링이 두번 되며 처음엔 filterData가 undefinded가 뜨는 것.
    //이유 : router가 초기 렌더링을 마친후에 실행되기 떄문.
    //컴포넌트가 처음 렌더링될 때에는 해당 url 데이터에 대한 엑세스가 없는 상태이며, 엑세스가 생긴 후에 filterData를 살펴봐야한다.

    return <p className={"center"}>Loading...</p>;
  }

  const filteredYear: string = filterData[0];
  const filteredMonth: string = filterData[1];

  //String to Number...
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
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the chosen filter!</p>
        </ErrorAlert>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button link={"/events"}>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  //-1을 해주는 이유는 index가 0부터 시작하기 때문.
  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;
