// app/notificationHelper.js
import * as Notifications from "expo-notifications";

// Request permission for notifications
export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// Schedule a notification after a certain time
export async function scheduleNotification(seconds, message) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: message || "Time's up!",
    },
    trigger: { seconds },
  });
}
