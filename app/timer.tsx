// app/TimerScreen.js
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import {
  requestNotificationPermission,
  scheduleNotification,
} from "../components/notificationHelper"; // Import helper for notifications

export default function TimerScreen() {
  const [seconds, setSeconds] = useState(10); // Time for the timer
  const [isRunning, setIsRunning] = useState(false); // Running state for the timer
  const [remainingTime, setRemainingTime] = useState(seconds); // Remaining time for the timer
  let timerId;

  // Function to start the timer
  const startTimer = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      alert("Notifications are not allowed!");
      return;
    }

    setIsRunning(true);
    timerId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          alert("Time's up!"); // Alert when the timer ends
          scheduleNotification(0, "Your task timer has ended!"); // Trigger push notification
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // Timer countdown every second
  };

  // Function to pause the timer
  const pauseTimer = () => {
    clearInterval(timerId);
    setIsRunning(false);
  };

  // Function to resume the timer
  const resumeTimer = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) {
      alert("Notifications are not allowed!");
      return;
    }

    setIsRunning(true);
    timerId = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          alert("Time's up!"); // Alert when the timer ends
          scheduleNotification(0, "Your task timer has ended!"); // Push notification
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      <Text>Task Timer: {remainingTime} seconds</Text>
      <Button
        title={isRunning ? "Pause Timer" : "Start Timer"}
        onPress={isRunning ? pauseTimer : startTimer}
      />
      {isRunning && <Button title="Resume Timer" onPress={resumeTimer} />}
    </View>
  );
}
