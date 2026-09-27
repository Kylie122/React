import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useRef, useState } from "react";
import { useMoney } from "./_layout";

export default function Slots() {
  const { money, setMoney, recordSlotSpin } = useMoney();

  const symbols = [
    "🍒",
    "🍒",
    "🍋",
    "🍋",
    "🍊",
    "🍊",
    "⭐",
  ];

  const [slots, setSlots] = useState([
    "❓",
    "❓",
    "❓",
  ]);

  const [bet, setBet] = useState("");
  const [message, setMessage] = useState("");
  const [spinning, setSpinning] = useState(false);

  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;
  const animation3 = useRef(new Animated.Value(0)).current;

  const getRandomSymbol = () => {
    return symbols[
      Math.floor(Math.random() * symbols.length)
    ];
  };

  const spin = () => {
    const betAmount = Number(bet);

    if (betAmount <= 0) {
      setMessage("Enter a valid bet.");
      return;
    }

    if (betAmount > money) {
      setMessage("You don't have enough money.");
      return;
    }

    if (spinning) {
      return;
    }

    setSpinning(true);
    setMessage("");

    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    animation1.setValue(0);
    animation2.setValue(0);
    animation3.setValue(0);

    setSlots([
      "❓",
      "❓",
      "❓",
    ]);

    setTimeout(() => {
      setSlots((oldSlots) => [
        result1,
        oldSlots[1],
        oldSlots[2],
      ]);

      Animated.spring(animation1, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, 500);

    setTimeout(() => {
      setSlots((oldSlots) => [
        oldSlots[0],
        result2,
        oldSlots[2],
      ]);

      Animated.spring(animation2, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, 1200);

    setTimeout(() => {
      setSlots([
        result1,
        result2,
        result3,
      ]);

      Animated.spring(animation3, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      if (
        result1 === result2 &&
        result2 === result3
      ) {
        recordSlotSpin(true, true);

        if (result1 === "⭐") {
          setMoney(money + betAmount * 5);

          setMessage(
            '⭐ JACKPOT! You won $${betAmount * 10}!'
          );
        } else {
          setMoney(money + betAmount * 3);

          setMessage(
           '🎉 Three of a kind! You won $${betAmount * 5}!'
          );
        }
      } else {
        recordSlotSpin(false, false);

        setMoney(money - betAmount);

        setMessage(
         '😢 You lost $${betAmount}.'
        );
      }

      setSpinning(false);
    }, 1900);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎰 SLOTS</Text>

      <Text style={styles.subtitle}>
        Spin the reels and get lucky
      </Text>

      <View style={styles.moneyCard}>
        <Text style={styles.moneyLabel}>
          YOUR BALANCE
        </Text>

        <Text style={styles.money}>
          ${money}
        </Text>
      </View>

      <View style={styles.machine}>
        <Text style={styles.machineTitle}>
          LUCKY DOG SLOTS
        </Text>

        <View style={styles.slotMachine}>
          <View style={styles.slotBox}>
            <Animated.Text
              style={[
                styles.symbol,
                {
                  transform: [
                    {
                      scale: animation1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {slots[0]}
            </Animated.Text>
          </View>

          <View style={styles.slotBox}>
            <Animated.Text
              style={[
                styles.symbol,
                {
                  transform: [
                    {
                      scale: animation2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {slots[1]}
            </Animated.Text>
          </View>

          <View style={styles.slotBox}>
            <Animated.Text
              style={[
                styles.symbol,
                {
                  transform: [
                    {
                      scale: animation3.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              {slots[2]}
            </Animated.Text>
          </View>
        </View>

        <View style={styles.paytable}>
          <View style={styles.payRow}>
            <Text style={styles.paySymbol}>
              ⭐ ⭐ ⭐
            </Text>

            <Text style={styles.jackpot}>
              JACKPOT ×5
            </Text>
          </View>

          <View style={styles.payRow}>
            <Text style={styles.paySymbol}>
              🍒 🍋 🍊
            </Text>

            <Text style={styles.win}>
              ANY 3 MATCH ×3
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.betCard}>
        <Text style={styles.betTitle}>
          PLACE YOUR BET
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bet}
          onChangeText={setBet}
          placeholder="Enter bet amount"
          placeholderTextColor="#666666"
          editable={!spinning}
        />

        <Pressable
          style={[
            styles.spinButton,
            spinning && styles.disabledButton,
          ]}
          onPress={spin}
          disabled={spinning}
        >
          <Text style={styles.spinButtonText}>
            {spinning ? "🎰 SPINNING..." : "🎰 SPIN"}
          </Text>
        </Pressable>
      </View>

      {message !== "" && (
        <View
          style={[
            styles.messageBox,
            message.includes("won") && styles.winBox,
            message.includes("JACKPOT") && styles.winBox,
            message.includes("lost") && styles.lossBox,
          ]}
        >
          <Text
            style={[
              styles.message,
              message.includes("won") && styles.winMessage,
              message.includes("JACKPOT") && styles.winMessage,
              message.includes("lost") && styles.lossMessage,
            ]}
          >
            {message}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingHorizontal: 20,
    paddingTop: 25,
    alignItems: "center",
  },

  title: {
    color: "#F5C542",
    fontSize: 30,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#777777",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 18,
  },

  moneyCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    paddingVertical: 11,
    marginBottom: 15,
  },

  moneyLabel: {
    color: "#777777",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  money: {
    color: "#F5C542",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 2,
  },

  machine: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 20,
    width: "100%",
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },

  machineTitle: {
    color: "#F5C542",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 14,
  },

  slotMachine: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },

  slotBox: {
    width: 82,
    height: 88,
    backgroundColor: "#F5C542",
    borderWidth: 3,
    borderColor: "#8C6F17",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  symbol: {
    fontSize: 45,
  },

  paytable: {
    width: "100%",
    backgroundColor: "#141414",
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
  },

  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },

  paySymbol: {
    fontSize: 17,
  },

  jackpot: {
    color: "#F5C542",
    fontSize: 11,
    fontWeight: "bold",
  },

  win: {
    color: "#4CAF50",
    fontSize: 11,
    fontWeight: "bold",
  },

  betCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2D2D2D",
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
    padding: 15,
  },

  betTitle: {
    color: "#F5C542",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 9,
    color: "#FFFFFF",
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    textAlign: "center",
    fontSize: 16,
  },

  spinButton: {
    backgroundColor: "#F5C542",
    width: "80%",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },

  disabledButton: {
    opacity: 0.4,
  },

  spinButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "bold",
  },

  messageBox: {
    width: "100%",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 15,
    backgroundColor: "#1C1C1C",
  },

  winBox: {
    borderWidth: 1,
    borderColor: "#4CAF50",
  },

  lossBox: {
    borderWidth: 1,
    borderColor: "#E74C3C",
  },

  message: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  winMessage: {
    color: "#4CAF50",
  },

  lossMessage: {
    color: "#E74C3C",
  },
});