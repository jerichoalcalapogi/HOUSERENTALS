import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
  Animated,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const backgroundImage = require("../assets/aa.jpg");

  const togglePassword = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.85,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();

    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Missing Information", "Please complete all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://192.168.1.102/house_rental_api/register.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const text = await response.text();
      console.log("RAW RESPONSE:", text);

      const data = JSON.parse(text);

      if (data.success) {
        Alert.alert("Success 🎉", data.message);
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Server Error", "Cannot connect to backend");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>🏡</Text>
          <Text style={styles.brand}>Join Findora Homes</Text>
          <Text style={styles.subtitle}>
            Create your account and find your new home
          </Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.card}
        >
          <Text style={styles.title}>Create Account</Text>

          <Text style={styles.description}>
            Register to start renting houses easily
          </Text>

          {/* Name */}
          <View style={styles.inputBox}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#888"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email */}
          <View style={styles.inputBox}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#888"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.inputBox}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#555"
              style={styles.icon}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />

            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
              }}
            >
              <TouchableOpacity
                onPress={togglePassword}
                style={styles.eyeBtn}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginText}>
              Already have an account?
              <Text style={styles.link}> Login</Text>
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  logo: {
    fontSize: 60,
  },

  brand: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#D0FFD6",
    textAlign: "center",
    marginTop: 5,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 25,
    padding: 25,
    elevation: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    color: "#777",
    marginVertical: 15,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  eyeBtn: {
    paddingHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 15,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  link: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});