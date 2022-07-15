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
  const [countdown, setCountdown] = useState("");
  // const [busService, setBusService] = useState("");
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=12079";

  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
      .then((response) => response.json())
      .then((json) => {
        const myBus = json.services.filter((bus) => bus.no == 151)[0];
        const nextTime = new Date(myBus.next.time);
        const nextTime_h = nextTime.getHours();
        const nextTime_m = nextTime.getMinutes();
        const nextTime_s = nextTime.getSeconds();
        const nextTime_display = nextTime_h
          .toString()
          .concat(":", nextTime_m.toString(), ":", nextTime_s.toString(), "H");

        const currentTime = Date.now();
        let timeDiff = nextTime - currentTime;
        timeDiff = Math.floor(Math.round(timeDiff / 1000) / 60);

        console.log(timeDiff, myBus.next.duration_ms);
        setArriving(nextTime_display);
        setCountdown(timeDiff);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadBusStopData();
    const interval = setInterval(loadBusStopData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus Arrival Time:</Text>
      <View style={styles.display}>
        <Text style={styles.timeDisplay}>
          {loading ? <ActivityIndicator size="large" /> : arriving}
        </Text>
        <Text style={styles.timeDisplay}>
          {loading ? "" : countdown < 1 ? "Arr" : `(${countdown}mins)`}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
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
  display: {
    display: "flex",
    flexDirection: "row",
  },
  timeDisplay: {
    fontSize: 40,
    marginTop: 20,
    marginHorizontal: 10,
    textAlign: "center",
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
