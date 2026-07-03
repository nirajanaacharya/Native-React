import { useAuth, useSignUp } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const isLoading = fetchStatus === "fetching";

  if (signUp.status == "complete" || isSignedIn) {
    return null;
  }

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress: email,
      password,
      firstName,
      lastName,
    });
    if (error) {
      alert(error.message);
    }
    if (!error) await signUp.verifications.sendEmailCode();
  };

  const onVerifyPress = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });
    if (signUp.status == "complete") {
      await signUp.finalize({
        navigate: ({ decorateUrl }) => {
          const url = decorateUrl("/");
          router.replace(url as any);
        },
      });
    }
  };

  if (
    signUp.status == "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length == 0
  ) {
    return (
      <View>
        <View className="px-6  items-start">
          <Image
            source={require("../../assets/images/state.png")}
            className="w-full h-24 mb-1"
            resizeMode="contain"
          />
          <Text className="text-3xl font-bold text-gray-800 mb-2">
            Verify Your Account.
          </Text>
          <Text className="text-lg text-gray-600 mb-6">
            We sent code to {email}
          </Text>
        </View>
        <TextInput
          placeholder="Enter Code.."
          value={code}
          onChangeText={setCode}
          className=" w-full border border-gray-300 rounded-xl py-3 px-4 mb-4"
          placeholderTextColor="#9CA3AF"
          keyboardType="number-pad"
        />
        {errors.fields.code && (
          <Text className="text-red-500 text-sm mb-4">
            {errors.fields.code.message}
          </Text>
        )}
        <TouchableOpacity
          onPress={onVerifyPress}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Verify</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => signUp.verifications.sendEmailCode()}
          className="py-2"
        >
          <Text className="text-blue-600">I need a new code </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className="bg-white"
      keyboardShouldPersistTaps="handled"
    >
      <View className="px-6  items-start">
        <Image
          source={require("../../assets/images/state.png")}
          className="w-full h-24 mb-1"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-2">
          Create a new account
        </Text>
        <Text className="text-lg text-gray-600 mb-6">
          Find Your Dream Home.
        </Text>
      </View>

      <View className=" flex-row gap-3 mb-4 w-full">
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          className="ml-1 flex-1 border border-gray-300 rounded-xl py-3 px-4"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          className="mr-1 flex-1 border border-gray-300 rounded-xl py-3 px-4"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="words"
        />
      </View>
      <View>
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          className="ml-1 flex-1 border border-gray-300 rounded-xl py-3 px-4 mb-6"
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {errors.fields.emailAddress && (
          <Text className="text-red-500 text-sm mb-4">
            {errors.fields.emailAddress.message}
          </Text>
        )}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="ml-1 flex-1 border border-gray-300 rounded-xl py-3 px-4 mb-6"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
        />
        {errors.fields.password && (
          <Text className="text-red-500 text-sm mb-4">
            {errors.fields.password.message}
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          onPress={onSignUpPress}
          disabled={isLoading}
          className="w-full bg-blue-600 py-4 rounded-xl items-center mb-4"
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">Sign Up</Text>
          )}
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <Text>Already have an account?</Text>
          <Link href="/sign-in">
            <Text className="text-blue-600 ml-1">Sign in</Text>
          </Link>
        </View>
        {/* <View nativeId = "clerk-captcha" /> */}
      </View>
    </ScrollView>
  );
}
