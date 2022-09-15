import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData: any) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props: any) {
  const [activeNotification, setActiveNotification]: any = useState();

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null); //activeNotification 초기화
      }, 3000);

      return () => {
        clearTimeout(timer); //동시 여러개 타이머 실행방지
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: any) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null); //초기화
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
