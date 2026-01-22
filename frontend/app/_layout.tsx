import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="onboarding" />

      {/* 👇 THIS ENABLES THE BOTTOM TABS */}
      <Stack.Screen name="(navigation)" />
    </Stack>
  );
}
