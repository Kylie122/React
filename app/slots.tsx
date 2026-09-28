import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useMoney } from "./_layout";

export default function Slots() {
  const router = useRouter();
  const { money, setMoney, recordSlotSpin } = useMoney();

  const symbols = ["🍒", "🍒", "🍋", "🍋", "🍊", "🍊", "⭐"];

  const [slots, setSlots] = useState(["❓", "❓", "❓"]);
  const [bet, setBet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lastWin, setLastWin] = useState<boolean | null>(null);
  const [resultAmount, setResultAmount] = useState(0);
  const [winTitleText, setWinTitleText] = useState("");

  const animation1 = useRef(new Animated.Value(0)).current;
  const animation2 = useRef(new Animated.Value(0)).current;
  const animation3 = useRef(new Animated.Value(0)).current;

  const getRandomSymbol = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const spin = () => {
    const betAmount = Number(bet);

    if (isNaN(betAmount) || betAmount <= 0) {
      setErrorMessage("Enter a valid bet amount.");
      return;
    }

    if (betAmount > money) {
      setErrorMessage("Insufficient balance.");
      return;
    }

    if (spinning) {
      return;
    }

    setSpinning(true);
    setErrorMessage("");

    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();

    animation1.setValue(0);
    animation2.setValue(0);
    animation3.setValue(0);

    setSlots(["❓", "❓", "❓"]);

    setTimeout(() => {
      setSlots((oldSlots) => [result1, oldSlots[1], oldSlots[2]]);
      Animated.spring(animation1, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, 500);

    setTimeout(() => {
      setSlots((oldSlots) => [oldSlots[0], result2, oldSlots[2]]);
      Animated.spring(animation2, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }, 1200);

    setTimeout(() => {
      setSlots([result1, result2, result3]);
      Animated.spring(animation3, {
        toValue: 1,
        useNativeDriver: true,
      }).start();

      if (result1 === result2 && result2 === result3) {
        recordSlotSpin(true, true);

        if (result1 === "⭐") {
          const winGain = betAmount * 10;
          setMoney(money + winGain);
          setLastWin(true);
          setResultAmount(winGain);
          setWinTitleText("JACKPOT!");
        } else {
          const winGain = betAmount * 5;
          setMoney(money + winGain);
          setLastWin(true);
          setResultAmount(winGain);
          setWinTitleText("3 OF A KIND!");
        }
      } else {
        recordSlotSpin(false, false);
        setMoney(money - betAmount);
        setLastWin(false);
        setResultAmount(betAmount);
        setWinTitleText("YOU LOST");
      }

      setSpinning(false);
      setShowModal(true);
    }, 1900);
  };

  const addBet = (amount: number) => {
    const current = Number(bet) || 0;
    const updated = current + amount;
    if (updated <= money) {
      setBet(updated.toString());
    } else {
      setBet(money.toString());
    }
  };

  const setMaxBet = () => {
    setBet(money.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Pressable
          style={({ pressed }) => [
            styles.backPressable,
            pressed && styles.pressed,
          ]}
          onPress={() => router.push("/")}
        >
        </Pressable>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.title}>🎰 LUCKY SLOTS</Text>
        <Text style={styles.subtitle}>Spin the reels and match 3 to win</Text>

        <View style={styles.moneyCard}>
          <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
          <Text style={styles.money}>${money.toLocaleString()}</Text>
        </View>

        <View style={styles.gameCard}>
          <Text style={styles.cardLabel}>SLOT MACHINE</Text>

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
              <Text style={styles.paySymbol}>⭐ ⭐ ⭐</Text>
              <Text style={styles.jackpotText}>JACKPOT 10× BET</Text>
            </View>
            <View style={styles.payRow}>
              <Text style={styles.paySymbol}>🍒 🍋 🍊</Text>
              <Text style={styles.winText}>ANY 3 MATCH 5× BET</Text>
            </View>
          </View>
        </View>

        <View style={styles.betCard}>
          <Text style={styles.betTitle}>PLACE YOUR BET</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={bet}
            onChangeText={setBet}
            placeholder="0"
            placeholderTextColor="#555566"
            editable={!spinning}
          />

          <View style={styles.presetRow}>
            <Pressable
              style={styles.presetButton}
              onPress={() => addBet(10)}
              disabled={spinning}
            >
              <Text style={styles.presetText}>+$10</Text>
            </Pressable>
            <Pressable
              style={styles.presetButton}
              onPress={() => addBet(50)}
              disabled={spinning}
            >
              <Text style={styles.presetText}>+$50</Text>
            </Pressable>
            <Pressable
              style={styles.presetButton}
              onPress={() => addBet(100)}
              disabled={spinning}
            >
              <Text style={styles.presetText}>+$100</Text>
            </Pressable>
            <Pressable
              style={styles.presetButtonMax}
              onPress={setMaxBet}
              disabled={spinning}
            >
              <Text style={styles.presetTextMax}>MAX</Text>
            </Pressable>
          </View>

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <Pressable
            style={[styles.spinButton, spinning && styles.disabledButton]}
            onPress={spin}
            disabled={spinning}
          >
            <Text style={styles.spinButtonText}>
              {spinning ? "🎰 SPINNING..." : "🎰 SPIN REELS"}
            </Text>
          </Pressable>
        </View>
      </View>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalCard,
              lastWin ? styles.winBorder : styles.lossBorder,
            ]}
          >
            <Text style={styles.modalEmoji}>
              {lastWin ? (winTitleText === "JACKPOT!" ? "⭐" : "🎉") : "💔"}
            </Text>
            <Text
              style={[
                styles.modalTitle,
                lastWin ? styles.winTitle : styles.lossTitle,
              ]}
            >
              {winTitleText}
            </Text>
            <Text style={styles.modalResultSymbols}>
              {slots[0]} {slots[1]} {slots[2]}
            </Text>
            <Text style={styles.modalAmount}>
              {lastWin ? `+$${resultAmount}` : `-$${resultAmount}`}
            </Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>SPIN AGAIN</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0E",
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  topHeader: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  backPressable: {
    flexDirection: "row",
    alignItems: "center",
  },
  backText: {
    color: "#F5C542",
    fontSize: 16,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.7,
  },
  wrapper: {
    width: "100%",
    maxWidth: 680,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#F5C542",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
    marginTop: 8,
  },
  subtitle: {
    color: "#8E8E9F",
    fontSize: 14,
    marginTop: 4,
    marginBottom: 20,
    textAlign: "center",
  },
  moneyCard: {
    backgroundColor: "#16161E",
    borderWidth: 1,
    borderColor: "#222230",
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 16,
  },
  moneyLabel: {
    color: "#8E8E9F",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  money: {
    color: "#F5C542",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 4,
  },
  gameCard: {
    backgroundColor: "#16161E",
    borderWidth: 1,
    borderColor: "#222230",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cardLabel: {
    color: "#8E8E9F",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 16,
  },
  slotMachine: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  slotBox: {
    flex: 1,
    maxWidth: 110,
    height: 110,
    backgroundColor: "#0B0B0E",
    borderWidth: 2,
    borderColor: "#F5C542",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F5C542",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  symbol: {
    fontSize: 52,
  },
  paytable: {
    width: "100%",
    backgroundColor: "#0B0B0E",
    borderWidth: 1,
    borderColor: "#222230",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 20,
    gap: 6,
  },
  payRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paySymbol: {
    fontSize: 16,
  },
  jackpotText: {
    color: "#F5C542",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  winText: {
    color: "#4EAE62",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  betCard: {
    backgroundColor: "#16161E",
    borderWidth: 1,
    borderColor: "#222230",
    borderRadius: 20,
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  betTitle: {
    color: "#F5C542",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 14,
  },
  input: {
    backgroundColor: "#0B0B0E",
    borderWidth: 1,
    borderColor: "#222230",
    borderRadius: 12,
    color: "#FFFFFF",
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  presetRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
    width: "100%",
  },
  presetButton: {
    flex: 1,
    backgroundColor: "#222230",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  presetText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
  },
  presetButtonMax: {
    flex: 1,
    backgroundColor: "#F5C542",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  presetTextMax: {
    color: "#0B0B0E",
    fontSize: 13,
    fontWeight: "bold",
  },
  errorText: {
    color: "#E75E5E",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 12,
  },
  spinButton: {
    backgroundColor: "#F5C542",
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
  spinButtonText: {
    color: "#0B0B0E",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: "#16161E",
    borderRadius: 24,
    padding: 24,
    width: "100%",
    maxWidth: 440,
    alignItems: "center",
  },
  winBorder: {
    borderWidth: 2,
    borderColor: "#4EAE62",
  },
  lossBorder: {
    borderWidth: 2,
    borderColor: "#E75E5E",
  },
  modalEmoji: {
    fontSize: 52,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  winTitle: {
    color: "#4EAE62",
  },
  lossTitle: {
    color: "#E75E5E",
  },
  modalResultSymbols: {
    fontSize: 24,
    marginTop: 8,
  },
  modalAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 12,
  },
  modalButton: {
    backgroundColor: "#F5C542",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  modalButtonText: {
    color: "#0B0B0E",
    fontSize: 16,
    fontWeight: "bold",
  },
});
