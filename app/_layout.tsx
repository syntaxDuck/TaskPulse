import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" opitons={{ title: "Home" }} />
      <Stack.Screen name="timer" opitons={{ title: "Timer" }} />
    </Stack>
  );
}
