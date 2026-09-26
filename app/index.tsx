import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useMoney } from "./_layout";

export default function Home() {
  const { money } = useMoney();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🐶</Text>

      <Text style={styles.title}>DOG CASINO</Text>
      <Text style={styles.subtitle}>Play • Bet • Win</Text>

      <View style={styles.moneyCard}>
        <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
        <Text style={styles.money}>${money}</Text>
      </View>

      <View style={styles.games}>
        <Link href="/dogfight" asChild>
          <Pressable style={styles.gameCard}>
            <Text style={styles.gameIcon}>🥊</Text>
            <View>
              <Text style={styles.gameTitle}>Dog Fight</Text>
              <Text style={styles.gameDescription}>Bet on your fighter</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/dice" asChild>
          <Pressable style={styles.gameCard}>
            <Text style={styles.gameIcon}>🎲</Text>
            <View>
              <Text style={styles.gameTitle}>Dice</Text>
              <Text style={styles.gameDescription}>Roll the dice</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/slots" asChild>
          <Pressable style={styles.gameCard}>
            <Text style={styles.gameIcon}>🎰</Text>
            <View>
              <Text style={styles.gameTitle}>Slots</Text>
              <Text style={styles.gameDescription}>Spin and win</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </Link>

        <Link href="/stats" asChild>
          <Pressable style={styles.statsButton}>
            <Text style={styles.statsIcon}>📊</Text>
            <Text style={styles.statsText}>Statistics</Text>
          </Pressable>
        </Link>
      </View>

      <Text style={styles.footer}>Good luck, player!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  logo: {
    fontSize: 45,
    textAlign: "center",
    marginBottom: 5,
  },

  title: {
    color: "#F5C542",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
  },

  subtitle: {
    color: "#888888",
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 25,
  },

  moneyCard: {
    backgroundColor: "#1C1C1C",
    borderWidth: 1,
    borderColor: "#3A3A3A",
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 25,
  },

  moneyLabel: {
    color: "#888888",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  money: {
    color: "#F5C542",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 5,
  },

  games: {
    gap: 12,
  },

  gameCard: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2D2D2D",
  },

  gameIcon: {
    fontSize: 32,
    marginRight: 15,
  },

  gameTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  gameDescription: {
    color: "#777777",
    fontSize: 13,
    marginTop: 3,
  },

  arrow: {
    color: "#F5C542",
    fontSize: 30,
    marginLeft: "auto",
  },

  statsButton: {
    backgroundColor: "#252525",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
  },

  statsIcon: {
    fontSize: 20,
    marginRight: 8,
  },

  statsText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  footer: {
    color: "#555555",
    textAlign: "center",
    marginTop: "auto",
    marginBottom: 25,
    fontSize: 13,
  },
});
