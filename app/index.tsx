import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useMoney } from "./_layout";

export default function Home() {
  const { money } = useMoney();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        DANAO CASINO
      </Text>

      <Text style={styles.money}>
        Money: ${money}
      </Text>

      <Link href="/animalfight" asChild>
        <Button title="Animal Fight" />
      </Link>

      <Link href="/dice" asChild>
        <Button title="Dice" />
      </Link>

      <Link href="/slots" asChild>
        <Button title="Slots" />
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 15,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  money: {
    fontSize: 24,
    marginBottom: 20,
  },
});