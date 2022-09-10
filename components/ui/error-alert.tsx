import classes from "./error-alert.module.css";

interface IProps {
  children: React.ReactNode;
}

function ErrorAlert(props: IProps) {
  const { children } = props;

  return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;
