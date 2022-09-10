import { ReactNode } from "react";
import classes from "./event-content.module.css";

interface IProps {
  children: ReactNode;
}

function EventContent(props: IProps) {
  const { children } = props;

  return <section className={classes.content}>{children}</section>;
}

export default EventContent;
