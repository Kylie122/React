import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useState } from "react";
import { useMoney } from "./_layout";

export default function Dice() {
  const { money, setMoney, recordDiceRoll } = useMoney();

  const [dice, setDice] = useState(1);
  const [bet, setBet] = useState("");
  const [message, setMessage] = useState("");

  const rollDice = () => {
    const betAmount = Number(bet);

    if (betAmount <= 0) {
      setMessage("Enter a valid bet.");
      return;
    }

    if (betAmount > money) {
      setMessage("You don't have enough money.");
      return;
    }

    const roll = Math.floor(Math.random() * 6) + 1;

    setDice(roll);

    recordDiceRoll(roll === 6, roll === 6);

    if (roll === 6) {
      setMoney(money + betAmount * 5);
      setMessage(`🎉 You won $${betAmount * 5}!`);
    } else {
      setMoney(money - betAmount);
      setMessage(`😢 You lost $${betAmount}.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎲 DICE</Text>

      <Text style={styles.subtitle}>
        Roll the lucky number
      </Text>

      <View style={styles.moneyCard}>
        <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
        <Text style={styles.money}>${money}</Text>
      </View>

      <View style={styles.diceCard}>
        <Text style={styles.diceLabel}>YOUR ROLL</Text>

        <View style={styles.diceBox}>
          <Text style={styles.dice}>{dice}</Text>
        </View>

        <Text style={styles.instruction}>
          Roll a 6 to win!
        </Text>

        <Text style={styles.payout}>
          WIN ×5
        </Text>
      </View>

      <View style={styles.betCard}>
        <Text style={styles.betTitle}>PLACE YOUR BET</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={bet}
          onChangeText={setBet}
          placeholder="Enter bet amount"
          placeholderTextColor="#666666"
        />

        <Pressable
          style={styles.rollButton}
          onPress={rollDice}
        >
          <Text style={styles.rollButtonText}>
            🎲 ROLL DICE
          </Text>
        </Pressable>
      </View>

      {message !== "" && (
        <View
          style={[
            styles.messageBox,
            message.includes("won") && styles.winBox,
            message.includes("lost") && styles.lossBox,
          ]}
        >
          <Text
            style={[
              styles.message,
              message.includes("won") && styles.winMessage,
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

  diceCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2D2D2D",
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
    paddingVertical: 18,
    marginBottom: 15,
  },

  diceLabel: {
    color: "#888888",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },

  diceBox: {
    width: 105,
    height: 105,
    backgroundColor: "#F5C542",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  dice: {
    color: "#111111",
    fontSize: 65,
    fontWeight: "bold",
  },

  instruction: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },

  payout: {
    color: "#4CAF50",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 4,
  },

  betCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#2D2D2D",
    borderRadius: 18,
    width: "100%",
    alignItems: "center",
    padding: 1
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

  rollButton: {
    backgroundColor: "#F5C542",
    width: "80%",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 12,
  },

  rollButtonText: {
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
  },

  winMessage: {
    color: "#4CAF50",
  },

  lossMessage: {
    color: "#E74C3C",
  },
});
