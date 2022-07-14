import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);

  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=12079";

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time:</Text>
      <Text style={styles.timeDisplay}>
        {loading ? <ActivityIndicator size="large" /> : "Loaded"}
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.refreshBtn]}
        onPress={() => setLoading(true)}
      >
        Refresh!
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  timeDisplay: {
    fontSize: 48,
    marginTop: 20,
  },
  button: {
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
    fontSize: 24,
  },
  refreshBtn: {
    backgroundColor: "green",
    color: "white",
  },
});
