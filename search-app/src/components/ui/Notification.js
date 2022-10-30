import ErrorIcon from "./icons/ErrorIcon";
import InfoIcon from "./icons/InfoIcon";
import SuccessIcon from "./icons/SuccessIcon";
import classes from "./Notification.module.css";

function Notification(props) {
  const { type, message } = props;
  let divClass = classes.info;
  let icon = null;
  if (type === "pending") {
    divClass = classes.info;
    icon = <InfoIcon />;
  }
  if (type === "success") {
    divClass = classes.success;
    icon = <SuccessIcon />;
  }
  if (type === "error") {
    divClass = classes.error;
    icon = <ErrorIcon />;
  }
  return (
    <div className={`${divClass} ${classes.notification}`}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  );
}

export default Notification;
