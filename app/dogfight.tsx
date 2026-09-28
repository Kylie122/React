import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useMoney } from "./_layout";

export default function Dogfight() {
  const { money, setMoney, recordDogfight } = useMoney();

  const [selectedDog, setSelectedDog] = useState("");
  const [bet, setBet] = useState("");
  const [dogAHealth, setDogAHealth] = useState(100);
  const [dogBHealth, setDogBHealth] = useState(100);
  const [fighting, setFighting] = useState(false);
  const [winner, setWinner] = useState("");
  const [fightMessage, setFightMessage] = useState("");
  const [message, setMessage] = useState("");

  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  useEffect(() => {
    if (!fighting) return;

    const fightTimer = setInterval(() => {
      const attacker = Math.random() < 0.5 ? "Dog A" : "Dog B";
      const damage = Math.floor(Math.random() * 16) + 10;

      if (attacker === "Dog A") {
        setDogBHealth((oldHealth) => {
          const newHealth = Math.max(0, oldHealth - damage);
          setFightMessage(`💥 Dog A attacks! -${damage} HP`);
          if (newHealth === 0) {
            setWinner("Dog A");
            setFighting(false);
          }
          return newHealth;
        });
      } else {
        setDogAHealth((oldHealth) => {
          const newHealth = Math.max(0, oldHealth - damage);
          setFightMessage(`💥 Dog B attacks! -${damage} HP`);
          if (newHealth === 0) {
            setWinner("Dog B");
            setFighting(false);
          }
          return newHealth;
        });
      }
    }, 600);

    return () => clearInterval(fightTimer);
  }, [fighting]);

  useEffect(() => {
    if (winner === "") return;

    const betAmount = Number(bet);

    if (selectedDog === winner) {
      recordDogfight(true);
      setMoney((oldMoney: number) => oldMoney + betAmount);
      setMessage(`🎉 You won $${betAmount}!`);
    } else {
      recordDogfight(false);
      setMoney((oldMoney: number) => oldMoney - betAmount);
      setMessage(`😢 You lost $${betAmount}.`);
    }
  }, [winner, selectedDog, bet, recordDogfight, setMoney]);

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

  const startFight = () => {
    const betAmount = Number(bet);

    if (betAmount <= 0) {
      setMessage("Enter a valid bet.");
      return;
    }

    if (betAmount > money) {
      setMessage("You don't have enough money.");
      return;
    }

    setDogAHealth(100);
    setDogBHealth(100);
    setWinner("");
    setMessage("");
    setFightMessage("⚔️ THE FIGHT BEGINS!");
    setFighting(true);
  };

  const resetFight = () => {
    setSelectedDog("");
    setBet("");
    setDogAHealth(100);
    setDogBHealth(100);
    setFighting(false);
    setWinner("");
    setFightMessage("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={[styles.content, { maxWidth: isDesktop ? 800 : 500 }]}>
        <Text style={[styles.title, isDesktop && { fontSize: 34 }]}>
          🐕 DOG FIGHT 🐕
        </Text>

        <View style={[styles.moneyCard, isDesktop && styles.moneyCardDesk]}>
          <View style={styles.moneyHeader}>
            <View style={styles.indicator} />
            <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
          </View>
          <Text style={[styles.moneyText, isDesktop && { fontSize: 42 }]}>
            ${money}
          </Text>
        </View>

        <View style={[styles.arena, isDesktop && styles.arenaDesk]}>
          <Text style={[styles.arenaTitle, isDesktop && { fontSize: 13 }]}>
            ⚔️ FIGHT ARENA ⚔️
          </Text>

          <View style={styles.dogs}>
            <View
              style={[
                styles.dogCard,
                isDesktop && styles.dogCardDesk,
                selectedDog === "Dog A" && styles.selectedCard,
              ]}
            >
              <Text style={[styles.dogEmojiRight, isDesktop && { fontSize: 62 }]}>
                🐕
              </Text>
              <Text style={[styles.dogName, isDesktop && { fontSize: 18 }]}>
                DOG A
              </Text>
              <Text style={[styles.healthText, isDesktop && { fontSize: 14 }]}>
                {dogAHealth} HP
              </Text>

              <View style={[styles.healthBar, isDesktop && { height: 10 }]}>
                <View
                  style={[styles.healthFill, { width: `${dogAHealth}%` }]}
                />
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.pickButton,
                  isDesktop && styles.pickButtonDesk,
                  selectedDog === "Dog A" && styles.selectedButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => setSelectedDog("Dog A")}
                disabled={fighting}
              >
                <Text
                  style={[
                    styles.pickButtonText,
                    isDesktop && { fontSize: 12 },
                    selectedDog === "Dog A" && { color: "#0B0B0E" },
                  ]}
                >
                  {selectedDog === "Dog A" ? "SELECTED" : "PICK DOG A"}
                </Text>
              </Pressable>
            </View>

            <Text style={[styles.vs, isDesktop && { fontSize: 24, marginHorizontal: 16 }]}>
              VS
            </Text>

            <View
              style={[
                styles.dogCard,
                isDesktop && styles.dogCardDesk,
                selectedDog === "Dog B" && styles.selectedCard,
              ]}
            >
              <Text style={[styles.dogEmoji, isDesktop && { fontSize: 62 }]}>
                🐕
              </Text>
              <Text style={[styles.dogName, isDesktop && { fontSize: 18 }]}>
                DOG B
              </Text>
              <Text style={[styles.healthText, isDesktop && { fontSize: 14 }]}>
                {dogBHealth} HP
              </Text>

              <View style={[styles.healthBar, isDesktop && { height: 10 }]}>
                <View
                  style={[styles.healthFill, { width: `${dogBHealth}%` }]}
                />
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.pickButton,
                  isDesktop && styles.pickButtonDesk,
                  selectedDog === "Dog B" && styles.selectedButton,
                  pressed && styles.pressed,
                ]}
                onPress={() => setSelectedDog("Dog B")}
                disabled={fighting}
              >
                <Text
                  style={[
                    styles.pickButtonText,
                    isDesktop && { fontSize: 12 },
                    selectedDog === "Dog B" && { color: "#0B0B0E" },
                  ]}
                >
                  {selectedDog === "Dog B" ? "SELECTED" : "PICK DOG B"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={[styles.betCard, isDesktop && styles.betCardDesk]}>
          <Text style={[styles.betTitle, isDesktop && { fontSize: 15 }]}>
            PLACE YOUR BET
          </Text>
          <Text style={[styles.selected, isDesktop && { fontSize: 14 }]}>
            {selectedDog ? `Selected: ${selectedDog}` : "Choose your dog"}
          </Text>

          <TextInput
            style={[styles.input, isDesktop && styles.inputDesk]}
            keyboardType="numeric"
            value={bet}
            onChangeText={setBet}
            placeholder="Enter amount"
            placeholderTextColor="#666666"
            editable={!fighting}
          />

          <View style={styles.presetRow}>
            <Pressable
              style={({ pressed }) => [
                styles.presetButton,
                fighting && styles.disabledButton,
                pressed && !fighting && styles.pressed,
              ]}
              onPress={() => addBet(10)}
              disabled={fighting}
            >
              <Text style={styles.presetText}>+$10</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.presetButton,
                fighting && styles.disabledButton,
                pressed && !fighting && styles.pressed,
              ]}
              onPress={() => addBet(50)}
              disabled={fighting}
            >
              <Text style={styles.presetText}>+$50</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.presetButton,
                fighting && styles.disabledButton,
                pressed && !fighting && styles.pressed,
              ]}
              onPress={() => addBet(100)}
              disabled={fighting}
            >
              <Text style={styles.presetText}>+$100</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.presetButtonMax,
                fighting && styles.disabledButton,
                pressed && !fighting && styles.pressed,
              ]}
              onPress={setMaxBet}
              disabled={fighting}
            >
              <Text style={styles.presetTextMax}>MAX</Text>
            </Pressable>
          </View>

          {fightMessage !== "" && (
            <Text style={[styles.fightMessage, isDesktop && { fontSize: 16 }]}>
              {fightMessage}
            </Text>
          )}

          {message !== "" && winner === "" && (
            <Text style={[styles.errorMessage, isDesktop && { fontSize: 14 }]}>
              {message}
            </Text>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.startButton,
              isDesktop && styles.startButtonDesk,
              (!selectedDog || fighting) && styles.disabledButton,
              pressed && !(!selectedDog || fighting) && styles.pressed,
            ]}
            onPress={startFight}
            disabled={!selectedDog || fighting}
          >
            <Text style={[styles.startButtonText, isDesktop && { fontSize: 17 }]}>
              {fighting ? "⚔️ FIGHTING..." : "🔥 START FIGHT"}
            </Text>
          </Pressable>
        </View>

        <Modal
          visible={winner !== ""}
          transparent
          animationType="fade"
          onRequestClose={resetFight}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalCard, isDesktop && styles.modalCardDesk]}>
              <Text style={[styles.winner, isDesktop && { fontSize: 26 }]}>
                {selectedDog === winner ? "🎉 YOU WIN!" : "😢 YOU LOSE!"}
              </Text>
              <Text style={[styles.messageText, isDesktop && { fontSize: 16 }]}>
                {message}
              </Text>
              <Pressable
                style={({ pressed }) => [
                  styles.againButton,
                  isDesktop && { paddingVertical: 12, paddingHorizontal: 28 },
                  pressed && styles.pressed,
                ]}
                onPress={resetFight}
              >
                <Text style={[styles.againText, isDesktop && { fontSize: 14 }]}>
                  FIGHT AGAIN
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0B0E",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 35,
  },
  content: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "stretch",
  },
  title: {
    color: "#F5C542",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 18,
  },
  moneyCard: {
    width: "100%",
    backgroundColor: "#14141B",
    borderWidth: 1,
    borderColor: "#F5C54240",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  moneyCardDesk: {
    paddingVertical: 22,
    borderRadius: 22,
  },
  moneyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4CAF50",
    marginRight: 6,
  },
  moneyLabel: {
    color: "#8E8E9A",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  moneyText: {
    color: "#F5C542",
    fontSize: 32,
    fontWeight: "800",
  },
  arena: {
    backgroundColor: "#14141B",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#22222E",
    padding: 16,
    marginBottom: 16,
  },
  arenaDesk: {
    padding: 22,
    borderRadius: 24,
  },
  arenaTitle: {
    color: "#6E6E7A",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1.5,
    marginBottom: 14,
  },
  dogs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dogCard: {
    backgroundColor: "#1C1C26",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A38",
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  dogCardDesk: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  selectedCard: {
    borderColor: "#F5C542",
    borderWidth: 2,
  },
  dogEmoji: {
    fontSize: 50,
  },
  dogEmojiRight: {
    fontSize: 50,
    transform: [{ scaleX: -1 }],
  },
  dogName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 4,
  },
  healthText: {
    color: "#E4E4E7",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 4,
  },
  healthBar: {
    width: "90%",
    height: 8,
    backgroundColor: "#2A2A38",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 6,
  },
  healthFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  pickButton: {
    backgroundColor: "#2A2A38",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  pickButtonDesk: {
    paddingVertical: 12,
    borderRadius: 12,
  },
  selectedButton: {
    backgroundColor: "#F5C542",
  },
  pickButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  vs: {
    color: "#F5C542",
    fontSize: 20,
    fontWeight: "900",
    marginHorizontal: 10,
  },
  betCard: {
    backgroundColor: "#14141B",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#22222E",
    padding: 18,
    alignItems: "center",
  },
  betCardDesk: {
    padding: 24,
    borderRadius: 24,
  },
  betTitle: {
    color: "#F5C542",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  selected: {
    color: "#8E8E9A",
    fontSize: 12,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#0B0B0E",
    borderWidth: 1,
    borderColor: "#2A2A38",
    borderRadius: 12,
    color: "#FFFFFF",
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  inputDesk: {
    paddingVertical: 14,
    fontSize: 18,
  },
  presetRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    width: "100%",
  },
  presetButton: {
    flex: 1,
    backgroundColor: "#1C1C26",
    borderWidth: 1,
    borderColor: "#2A2A38",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  presetText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
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
    fontSize: 12,
    fontWeight: "800",
  },
  fightMessage: {
    color: "#F5C542",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 12,
  },
  errorMessage: {
    color: "#E74C3C",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 8,
  },
  startButton: {
    backgroundColor: "#F5C542",
    borderRadius: 14,
    width: "100%",
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 14,
  },
  startButtonDesk: {
    paddingVertical: 18,
    borderRadius: 16,
  },
  disabledButton: {
    opacity: 0.4,
  },
  startButtonText: {
    color: "#0B0B0E",
    fontSize: 15,
    fontWeight: "800",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#14141B",
    borderWidth: 2,
    borderColor: "#F5C542",
    borderRadius: 20,
    alignItems: "center",
    padding: 22,
    shadowColor: "#F5C542",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  modalCardDesk: {
    maxWidth: 440,
    padding: 28,
    borderRadius: 24,
  },
  winner: {
    color: "#F5C542",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1,
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  againButton: {
    backgroundColor: "#F5C542",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 18,
    width: "100%",
    alignItems: "center",
  },
  againText: {
    color: "#0B0B0E",
    fontWeight: "800",
    fontSize: 13,
    letterSpacing: 0.5,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
});
