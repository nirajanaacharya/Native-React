import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleSignout = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error Signing out", error);
    }
  };
  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <TouchableOpacity onPress={handleSignout}>Log Out</TouchableOpacity>
    </SafeAreaView>
  );
}
