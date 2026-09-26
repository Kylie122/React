import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!fighting) {
      return;
    }

    const fightTimer = setInterval(() => {
      const attacker = Math.random() < 0.5 ? "Dog A" : "Dog B";

      if (attacker === "Dog A") {
        const damage = Math.floor(Math.random() * 16) + 10;

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
        const damage = Math.floor(Math.random() * 16) + 10;

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

    return () => {
      clearInterval(fightTimer);
    };
  }, [fighting]);

  useEffect(() => {
    if (winner === "") {
      return;
    }

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
      <Text style={styles.title}>🐕 DOG FIGHT 🐕</Text>

      <View style={styles.moneyCard}>
        <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
        <Text style={styles.money}>${money}</Text>
      </View>

      <View style={styles.arena}>
        <Text style={styles.arenaTitle}>⚔️ FIGHT ARENA ⚔️</Text>

        <View style={styles.dogs}>
          <View
            style={[
              styles.dogCard,
              selectedDog === "Dog A" && styles.selectedCard,
            ]}
          >
            <Text style={styles.dogEmojiRight}>🐕</Text>

            <Text style={styles.dogName}>DOG A</Text>

            <Text style={styles.healthText}>
              {dogAHealth} HP
            </Text>

            <View style={styles.healthBar}>
              <View
                style={[
                  styles.healthFill,
                  {
                    width: `${dogAHealth}%`,
                  },
                ]}
              />
            </View>

            <Pressable
              style={[
                styles.pickButton,
                selectedDog === "Dog A" && styles.selectedButton,
              ]}
              onPress={() => setSelectedDog("Dog A")}
              disabled={fighting}
            >
              <Text style={styles.pickButtonText}>
                {selectedDog === "Dog A" ? "SELECTED" : "PICK DOG A"}
              </Text>
            </Pressable>
          </View>

          <Text style={styles.vs}>VS</Text>

          <View
            style={[
              styles.dogCard,
              selectedDog === "Dog B" && styles.selectedCard,
            ]}
          >
            <Text style={styles.dogEmoji}>🐕</Text>

            <Text style={styles.dogName}>DOG B</Text>

            <Text style={styles.healthText}>
              {dogBHealth} HP
            </Text>

            <View style={styles.healthBar}>
              <View
                style={[
                  styles.healthFill,
                  {
                    width: `${dogBHealth}%`,
                  },
                ]}
              />
            </View>

            <Pressable
              style={[
                styles.pickButton,
                selectedDog === "Dog B" && styles.selectedButton,
              ]}
              onPress={() => setSelectedDog("Dog B")}
              disabled={fighting}
            >
              <Text style={styles.pickButtonText}>
                {selectedDog === "Dog B" ? "SELECTED" : "PICK DOG B"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.betCard}>
        <Text style={styles.betTitle}>PLACE YOUR BET</Text>

        <Text style={styles.selected}>
          {selectedDog
            ? `Selected: ${selectedDog}`
            : "Choose your dog"}
        </Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bet}
          onChangeText={setBet}
          placeholder="Enter amount"
          placeholderTextColor="#666666"
          editable={!fighting}
        />

        {fightMessage !== "" && (
          <Text style={styles.fightMessage}>
            {fightMessage}
          </Text>
        )}

        {message !== "" && winner === "" && (
          <Text style={styles.errorMessage}>
            {message}
          </Text>
        )}

        <Pressable
          style={[
            styles.startButton,
            (!selectedDog || fighting) && styles.disabledButton,
          ]}
          onPress={startFight}
          disabled={!selectedDog || fighting}
        >
          <Text style={styles.startButtonText}>
            {fighting ? "⚔️ FIGHTING..." : "🔥 START FIGHT"}
          </Text>
        </Pressable>
      </View>

      {winner !== "" && (
        <View style={styles.result}>
          <Text style={styles.winner}>
            {selectedDog === winner ? "🎉 YOU WIN!" : "😢 YOU LOSE!"}
          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

          <Pressable
            style={styles.againButton}
            onPress={resetFight}
          >
            <Text style={styles.againText}>
              FIGHT AGAIN
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  title: {
    color: "#F5C542",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 15,
  },

  moneyCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 12,
  },

  moneyLabel: {
    color: "#777777",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  money: {
    color: "#F5C542",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 2,
  },

  arena: {
    backgroundColor: "#181818",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    padding: 12,
    marginBottom: 12,
  },

  arenaTitle: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 10,
  },

  dogs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  dogCard: {
    backgroundColor: "#202020",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#303030",
    width: "42%",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 7,
  },

  selectedCard: {
    borderColor: "#F5C542",
    borderWidth: 2,
  },

  dogEmoji: {
    fontSize: 52,
  },

  dogEmojiRight: {
    fontSize: 52,
    transform: [{ scaleX: -1 }],
  },

  dogName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
  },

  healthText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
  },

  healthBar: {
    width: "90%",
    height: 9,
    backgroundColor: "#333333",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 4,
  },

  healthFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },

  pickButton: {
    backgroundColor: "#333333",
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 8,
    marginTop: 8,
  },

  selectedButton: {
    backgroundColor: "#F5C542",
  },

  pickButtonText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },

  vs: {
    color: "#F5C542",
    fontSize: 16,
    fontWeight: "bold",
  },

  betCard: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2D2D2D",
    padding: 15,
    alignItems: "center",
  },

  betTitle: {
    color: "#F5C542",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 6,
  },

  selected: {
    color: "#888888",
    fontSize: 13,
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#111111",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 9,
    color: "#FFFFFF",
    width: "80%",
    paddingVertical: 9,
    paddingHorizontal: 12,
    textAlign: "center",
    fontSize: 16,
  },

  fightMessage: {
    color: "#F5C542",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },

  errorMessage: {
    color: "#E74C3C",
    fontSize: 13,
    marginTop: 8,
  },

  startButton: {
    backgroundColor: "#F5C542",
    borderRadius: 10,
    width: "80%",
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },

  disabledButton: {
    opacity: 0.4,
  },

  startButtonText: {
    color: "#111111",
    fontSize: 15,
    fontWeight: "bold",
  },

  result: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#F5C542",
    borderRadius: 10,
    alignItems: "center",
    padding: 8,
    marginTop: 8,
  },

  winner: {
    color: "#F5C542",
    fontSize: 17,
    fontWeight: "bold",
  },

  message: {
    color: "#FFFFFF",
    fontSize: 13,
    marginTop: 2,
  },

  againButton: {
    backgroundColor: "#333333",
    borderRadius: 7,
    paddingVertical: 6,
    paddingHorizontal: 18,
    marginTop: 6,
  },

  againText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 11,
  },
});
