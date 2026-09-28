import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useMoney } from "./_layout";

export default function Dice() {
  const { money, setMoney, recordDiceRoll } = useMoney();

  const [dice, setDice] = useState<number | null>(null);
  const [bet, setBet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [lastWin, setLastWin] = useState<boolean | null>(null);
  const [resultAmount, setResultAmount] = useState(0);

  const rollDice = () => {
    const betAmount = Number(bet);

    if (isNaN(betAmount) || betAmount <= 0) {
      setErrorMessage("Enter a valid bet amount.");
      return;
    }

    if (betAmount > money) {
      setErrorMessage("Insufficient balance.");
      return;
    }

    setErrorMessage("");

    const roll = Math.floor(Math.random() * 6) + 1;
    setDice(roll);

    const won = roll === 6;
    recordDiceRoll(won, won);

    if (won) {
      const winGain = betAmount * 5;
      setMoney(money + winGain);
      setLastWin(true);
      setResultAmount(winGain);
    } else {
      setMoney(money - betAmount);
      setLastWin(false);
      setResultAmount(betAmount);
    }

    setShowModal(true);
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
      <View style={styles.wrapper}>
        <Text style={styles.title}>🎲 LUCKY DICE</Text>
        <Text style={styles.subtitle}>Roll a 6 to multiply your bet by 5x</Text>

        <View style={styles.moneyCard}>
          <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
          <Text style={styles.money}>${money.toLocaleString()}</Text>
        </View>

        <View style={styles.gameCard}>
          <Text style={styles.cardLabel}>YOUR ROLL</Text>

          <View style={styles.diceBox}>
            <Text style={styles.diceText}>{dice !== null ? dice : "?"}</Text>
          </View>

          <View style={styles.payoutBadge}>
            <Text style={styles.payoutText}>WIN 5× BET</Text>
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
          />

          <View style={styles.presetRow}>
            <Pressable style={styles.presetButton} onPress={() => addBet(10)}>
              <Text style={styles.presetText}>+$10</Text>
            </Pressable>
            <Pressable style={styles.presetButton} onPress={() => addBet(50)}>
              <Text style={styles.presetText}>+$50</Text>
            </Pressable>
            <Pressable style={styles.presetButton} onPress={() => addBet(100)}>
              <Text style={styles.presetText}>+$100</Text>
            </Pressable>
            <Pressable style={styles.presetButtonMax} onPress={setMaxBet}>
              <Text style={styles.presetTextMax}>MAX</Text>
            </Pressable>
          </View>

          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}

          <Pressable style={styles.rollButton} onPress={rollDice}>
            <Text style={styles.rollButtonText}>🎲 ROLL DICE</Text>
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
            <Text style={styles.modalEmoji}>{lastWin ? "🎉" : "💔"}</Text>
            <Text
              style={[
                styles.modalTitle,
                lastWin ? styles.winTitle : styles.lossTitle,
              ]}
            >
              {lastWin ? "YOU WON!" : "YOU LOST"}
            </Text>
            <Text style={styles.modalDiceText}>You rolled a {dice}</Text>
            <Text style={styles.modalAmount}>
              {lastWin ? `+$${resultAmount}` : `-$${resultAmount}`}
            </Text>

            <Pressable
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.modalButtonText}>PLAY AGAIN</Text>
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
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  wrapper: {
    width: "100%",
    maxWidth: 680,
    alignItems: "center",
  },
  title: {
    color: "#F5C542",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 2,
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
    marginBottom: 16,
  },
  cardLabel: {
    color: "#8E8E9F",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 14,
  },
  diceBox: {
    width: 110,
    height: 110,
    backgroundColor: "#F5C542",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F5C542",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  diceText: {
    color: "#0B0B0E",
    fontSize: 64,
    fontWeight: "bold",
  },
  payoutBadge: {
    backgroundColor: "#222230",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 18,
    borderWidth: 1,
    borderColor: "#F5C542",
  },
  payoutText: {
    color: "#F5C542",
    fontSize: 13,
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
  rollButton: {
    backgroundColor: "#F5C542",
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  rollButtonText: {
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
  modalDiceText: {
    color: "#8E8E9F",
    fontSize: 15,
    marginTop: 6,
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
