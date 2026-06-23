import React, { useState, useContext } from "react";
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
<<<<<<< HEAD
=======
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
>>>>>>> 410b0891 (finals)
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../AppContext";
<<<<<<< HEAD
=======
import { Ionicons } from "@expo/vector-icons";
>>>>>>> 410b0891 (finals)

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const { setCurrentUser } = useContext(UserContext);
  const backgroundImage = require("../assets/aa.jpg");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing Information", "Please enter email and password");
        return;
      }

      const response = await fetch(
        "http://192.168.1.102/house_rental_api/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await response.text();
      console.log("LOGIN RESPONSE:", text);

      const data = JSON.parse(text);

      if (data.success) {
        const rawStoredUser = await AsyncStorage.getItem("user");
        const storedUser = rawStoredUser ? JSON.parse(rawStoredUser) : null;
        const localPassword =
          storedUser && storedUser.email === email && storedUser.password
            ? storedUser.password
            : password;

        const savedUser = {
          ...data.user,
          password: localPassword,
          profilePic: storedUser?.profilePic || null,
        };

        console.log("USER DATA:", savedUser);

        // 🔥 CLEAR OLD SESSION
        await AsyncStorage.multiRemove([
          "currentUser",
          "user",
          "isLoggedIn",
          "favorites",
          "rentals",
        ]);

        // ✅ SET NEW USER
        await AsyncStorage.setItem("currentUser", savedUser.email);
        await AsyncStorage.setItem("user", JSON.stringify(savedUser));
        await AsyncStorage.setItem("isLoggedIn", "true");

        setCurrentUser(savedUser.email);

        console.log("CURRENT USER:", savedUser.email);

        Alert.alert("Welcome Back 🏠", "Login Successful");

        // 🚨 FORCE RESET NAVIGATION
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        const rawStoredUser = await AsyncStorage.getItem("user");
        const storedUser = rawStoredUser ? JSON.parse(rawStoredUser) : null;

        if (
          storedUser &&
          storedUser.email === email &&
          storedUser.password === password
        ) {
          await AsyncStorage.multiRemove([
            "currentUser",
            "user",
            "isLoggedIn",
            "favorites",
            "rentals",
          ]);

          await AsyncStorage.setItem("currentUser", storedUser.email);
          await AsyncStorage.setItem("user", JSON.stringify(storedUser));
          await AsyncStorage.setItem("isLoggedIn", "true");

        setCurrentUser(storedUser.email);
          navigation.reset({
            index: 0,
            routes: [{ name: "Dashboard" }],
          });
          return;
        }

        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      imageStyle={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.header}>
        <Text style={styles.logo}></Text>
        <Text style={styles.brand}>Findora Homes</Text>
        <Text style={styles.subtitle}>
          Find your perfect home today
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.card}
      >
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.description}>
          Login to continue renting your dream house
        </Text>

        <View style={styles.inputBox}>
          <Text style={styles.icon}>📧</Text>
          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#888"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>
            Don't have an account?
            <Text style={styles.link}> Register</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      </View>
=======
  const [showPassword, setShowPassword] = useState(false);
  const { setCurrentUser } = useContext(UserContext);

  const backgroundImage = require("../assets/aa.jpg");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Missing Information", "Please enter email and password");
        return;
      }

      const response = await fetch(
        "http://192.168.10.240/house_rental_api/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const text = await response.text();
      const data = JSON.parse(text);

      if (data.success) {
        await AsyncStorage.multiRemove([
          "currentUser",
          "user",
          "isLoggedIn",
          "favorites",
          "rentals",
        ]);

        await AsyncStorage.setItem("currentUser", data.user.email);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        await AsyncStorage.setItem("isLoggedIn", "true");

        setCurrentUser(data.user.email);

        Alert.alert("Success", "Login Successful");

        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Cannot connect to server");
    }
  };

  return (
    <ImageBackground style={{ flex: 1 }} source={backgroundImage}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.overlay}>
              {/* HEADER */}
              <View style={styles.header}>
                <Text style={styles.brand}>Findora Homes</Text>
                <Text style={styles.subtitle}>
                  Find your perfect home today
                </Text>
              </View>

              {/* CARD */}
              <View style={styles.card}>
                <Text style={styles.title}>Welcome Back</Text>

                <Text style={styles.description}>
                  Login to continue renting your dream house
                </Text>

                {/* EMAIL */}
                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* PASSWORD */}
                <View style={styles.inputBox}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="#555"
                    />
                  </TouchableOpacity>
                </View>

                {/* BUTTON */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleLogin}
                >
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>

                {/* REGISTER */}
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.register}>
                    Don't have an account?
                    <Text style={styles.link}> Register</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
>>>>>>> 410b0891 (finals)
    </ImageBackground>
  );
}

<<<<<<< HEAD
/* styles */
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  header: { alignItems: "center", marginBottom: 30 },
  logo: { fontSize: 65 },
  brand: { fontSize: 34, fontWeight: "bold", color: "#fff" },
  subtitle: { color: "#D0FFD6", fontSize: 15, marginTop: 5 },
  card: {
    backgroundColor: "rgba(255,255,255,0.93)",
=======
/* STYLES */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  header: {
    alignItems: "center",
    marginBottom: 25,
  },

  brand: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#D0FFD6",
    fontSize: 15,
    marginTop: 5,
  },

  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
>>>>>>> 410b0891 (finals)
    borderRadius: 25,
    padding: 25,
    elevation: 8,
  },
<<<<<<< HEAD
=======

>>>>>>> 410b0891 (finals)
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "center",
  },
<<<<<<< HEAD
=======

>>>>>>> 410b0891 (finals)
  description: {
    textAlign: "center",
    color: "#777",
    marginVertical: 15,
  },
<<<<<<< HEAD
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  icon: { fontSize: 20, marginRight: 10 },
  input: { flex: 1, paddingVertical: 15, fontSize: 16 },
=======

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 15,
    height: 55,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },

  eyeButton: {
    paddingHorizontal: 10,
  },

>>>>>>> 410b0891 (finals)
  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 15,
    marginTop: 10,
  },
<<<<<<< HEAD
=======

>>>>>>> 410b0891 (finals)
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
<<<<<<< HEAD
  register: { textAlign: "center", marginTop: 20, color: "#777" },
  link: { color: "#2E7D32", fontWeight: "bold" },
=======

  register: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  link: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
>>>>>>> 410b0891 (finals)
});