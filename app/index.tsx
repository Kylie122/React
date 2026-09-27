import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { useMoney } from "./_layout";

const GAMES = [
  { title: "Dog Fight", desc: "Bet on your fighter", icon: "🥊", route: "/dogfight" },
  { title: "Dice", desc: "Roll the dice", icon: "🎲", route: "/dice" },
  { title: "Slots", desc: "Spin and win", icon: "🎰", route: "/slots" },
];

export default function Home() {
  const { money } = useMoney();
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <View style={styles.container}>
      <View style={[styles.content, { maxWidth: isDesktop ? 1020 : 480 }]}>
        <View style={styles.header}>
          <View style={[styles.logoBadge, isDesktop && styles.logoBadgeDesk]}>
            <Text style={{ fontSize: isDesktop ? 46 : 36 }}>🐶</Text>
          </View>
          <Text style={[styles.title, isDesktop && { fontSize: 36 }]}>DOG CASINO</Text>
          <Text style={styles.subtitle}>Play • Bet • Win</Text>
        </View>

        <View style={[styles.moneyCard, isDesktop && styles.moneyCardDesk]}>
          <View style={styles.moneyHeader}>
            <View style={styles.indicator} />
            <Text style={styles.moneyLabel}>YOUR BALANCE</Text>
          </View>
          <Text style={[styles.moneyText, isDesktop && { fontSize: 48 }]}>${money}</Text>
        </View>

        <Text style={styles.sectionHeader}>SELECT GAME</Text>

        <View style={[styles.gamesGroup, isDesktop && styles.gamesGroupDesk]}>
          {GAMES.map((game) => (
            <Pressable
              key={game.route}
              onPress={() => router.push(game.route as any)}
              style={({ pressed }) => [
                styles.card,
                isDesktop && styles.cardDesk,
                pressed && styles.pressed,
              ]}
            >
              <View style={[styles.iconBox, isDesktop && styles.iconBoxDesk]}>
                <Text style={{ fontSize: isDesktop ? 30 : 24 }}>{game.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.cardTitle, isDesktop && { fontSize: 20 }]}>{game.title}</Text>
                <Text style={[styles.cardDesc, isDesktop && { fontSize: 14, marginTop: 4 }]}>
                  {game.desc}
                </Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </Pressable>
          ))}

          <Pressable
            onPress={() => router.push("/stats")}
            style={({ pressed }) => [
              styles.statsBtn,
              isDesktop && styles.statsBtnDesk,
              pressed && styles.pressed,
            ]}
          >
            <Text style={{ fontSize: isDesktop ? 22 : 18, marginRight: 8 }}>📊</Text>
            <Text style={[styles.statsText, isDesktop && { fontSize: 18 }]}>Statistics</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>Good luck, player!</Text>
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
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  logoBadge: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#1A1A22",
    borderWidth: 1,
    borderColor: "#F5C54233",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  logoBadgeDesk: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  title: {
    color: "#F5C542",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    letterSpacing: 3,
  },
  subtitle: {
    color: "#6E6E7A",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  moneyCard: {
    width: "100%",
    backgroundColor: "#14141B",
    borderWidth: 1,
    borderColor: "#F5C54240",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  moneyCardDesk: {
    paddingVertical: 28,
    borderRadius: 24,
  },
  moneyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
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
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  moneyText: {
    color: "#F5C542",
    fontSize: 36,
    fontWeight: "800",
  },
  sectionHeader: {
    color: "#52525E",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 14,
    textAlign: "center",
  },
  gamesGroup: {
    width: "100%",
    gap: 14,
  },
  gamesGroupDesk: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 18,
  },
  card: {
    width: "100%",
    backgroundColor: "#14141B",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#22222E",
  },
  cardDesk: {
    width: "31.8%",
    padding: 22,
    borderRadius: 22,
  },
  pressed: {
    backgroundColor: "#1C1C26",
    borderColor: "#F5C54260",
    transform: [{ scale: 0.98 }],
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#1F1F2B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  iconBoxDesk: {
    width: 58,
    height: 58,
    borderRadius: 18,
    marginRight: 18,
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  cardDesc: {
    color: "#71717A",
    fontSize: 12,
    marginTop: 2,
  },
  arrow: {
    color: "#F5C542",
    fontSize: 24,
    fontWeight: "300",
    paddingLeft: 8,
  },
  statsBtn: {
    width: "100%",
    backgroundColor: "#1C1C26",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2A2A38",
  },
  statsBtnDesk: {
    paddingVertical: 22,
    borderRadius: 22,
    marginTop: 6,
  },
  statsText: {
    color: "#E4E4E7",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    color: "#42424D",
    textAlign: "center",
    marginTop: 32,
    fontSize: 13,
    fontWeight: "600",
  },
});
