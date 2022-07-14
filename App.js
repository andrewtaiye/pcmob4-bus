import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arriving, setArriving] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=12079";

  function loadBusStopData() {
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const myBus = json.services.filter((bus) => bus.no == 154)[0];
        console.log(myBus.next.time);
        setArriving(myBus.next.time);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time:</Text>
      <Text style={styles.timeDisplay}>
        {loading ? <ActivityIndicator size="large" /> : arriving}
      </Text>
      <TouchableOpacity
        onPress={() => {
          setLoading(true);
          loadBusStopData();
        }}
      >
        <Text style={[styles.button, styles.refreshBtn]}>Refresh!</Text>
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
    fontSize: 40,
    marginTop: 20,
  },
  button: {
    padding: 15,
    marginTop: 20,
    borderRadius: 15,
  },
  refreshBtn: {
    backgroundColor: "green",
    color: "white",
    fontSize: 24,
  },
});
