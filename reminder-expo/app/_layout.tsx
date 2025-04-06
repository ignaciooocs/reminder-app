import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
      <Stack.Screen name="(main)/Home" />
    </Stack>
  );
}
