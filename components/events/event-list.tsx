import styled from "styled-components";
import EventItem from "./event-item";
import classes from "./event-list.module.css";

interface IProps {
  items: any;
}

const EventList = (props: IProps) => {
  const { items } = props;

  return (
    <ul className={classes.list}>
      {items.map((event: any, index: any) => (
        <EventItem {...event} key={`event-${index}`} />
      ))}
    </ul>
  );
};

export default EventList;
