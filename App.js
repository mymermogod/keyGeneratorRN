import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import Slider from "@react-native-community/slider";
import Clipboard from "expo-clipboard";

const charset =
  "abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWYZ0123456789!@#$%&*()-_=+[]{}}/?;:><";

export default function App() {
  const [password, setPassword] = useState("");
  const [size, setSize] = useState(5);
  // const [arrSize, setArrsize] = useState([])

  function generatePass() {
    const randPassword = Array(Number(size))
      .fill(charset)
      .map((x) => x[Math.floor(Math.random() * x.length)])
      .join("");

    setPassword(randPassword);
  }

  function copyPassword() {
    Clipboard.setString(password);
    Alert.alert(
      "Senha copiada",
      "Sua senha foi copaida com sucesso!",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require("./src/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.wrapper}>
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={25}
          minimumTrackTintColor="#ffa200"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#ffa200"
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
        <Text style={styles.buttonText}>Gerar senha</Text>
      </TouchableOpacity>

      <View style={styles.wrapper}>
        <Text style={styles.password} onLongPress={copyPassword}>
          {password}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f3ff",
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  wrapper: {
    marginVertical: 15,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 6,
  },
  slider: {
    height: 50,
  },
  button: {
    backgroundColor: "#ffa200",
    width: "85%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  password: {
    padding: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
