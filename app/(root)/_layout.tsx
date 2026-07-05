import { useAuth } from "@clerk/expo";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { useUserSync } from "../../hooks/useAuthSync";

export default function _layout() {
  const { isSignedIn, isLoaded } = useAuth();
  useUserSync();
  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }
  return <Slot />;
}
