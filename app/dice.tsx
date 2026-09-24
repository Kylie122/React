
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";

import { useState, useRef } from "react";
import { useMoney } from "./_layout";

export default function Dice() {

  const { money, setMoney } = useMoney();

  const [dice, setDice] = useState(1);

  const [bet, setBet] = useState("");

  const [choice, setChoice] = useState("");

  const [specificNumber, setSpecificNumber] =
    useState(1);

  const [message, setMessage] = useState("");
 

  const [rolling, setRolling] =
    useState(false);


  const diceAnimation = useRef(
    new Animated.Value(1)
  ).current;


  const rollDice = () => {

    const betAmount = Number(bet);

    if (betAmount <= 0) {

      setMessage(
        "Enter a valid bet."
      );

      return;
    }

    if (betAmount > money) {

      setMessage(
        "You don't have enough money."
      );

      return;
    }

    if (choice === "") {

      setMessage(
        "Choose a bet type."
      );

      return;
    }

    if (rolling) {
      return;
    }

    setRolling(true);
    setMessage("");

    const finalRoll =
      Math.floor(
        Math.random() * 6
      ) + 1;

    diceAnimation.setValue(1);

    Animated.sequence([

      Animated.timing(
        diceAnimation,
        {
          toValue: 0.5,
          duration: 150,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        diceAnimation,
        {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        diceAnimation,
        {
          toValue: 0.6,
          duration: 150,
          useNativeDriver: true,
        }
      ),

      Animated.timing(
        diceAnimation,
        {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }
      ),

    ]).start();

    let count = 0;

    const rollingAnimation =
      setInterval(() => {

        const randomNumber =
          Math.floor(
            Math.random() * 6
          ) + 1;

        setDice(randomNumber);

        count++;

        if (count >= 8) {

          clearInterval(
            rollingAnimation
          );

          setDice(finalRoll);

          checkResult(
            finalRoll,
            betAmount
          );

          setRolling(false);
        }

      }, 150);
  };

  const checkResult = (
    roll: number,
    betAmount: number
  ) => {

    let won = false;

    if (choice === "odd") {

      if (roll % 2 !== 0) {

        won = true;
      }
    }

    else if (choice === "even") {

      if (roll % 2 === 0) {

        won = true;
      }
    }

    else if (choice === "higher") {

      if (roll >= 4) {

        won = true;
      }
    }

    else if (choice === "lower") {

      if (roll <= 3) {

        won = true;
      }
    }

    else if (choice === "specific") {

      if (
        roll === specificNumber
      ) {

        won = true;
      }
    }

    if (won) {

      let multiplier = 2;

      if (
        choice === "specific"
      ) {

        multiplier = 5;
      }


      const winnings =
        betAmount * multiplier;


      setMoney(
        (oldMoney: number) =>
          oldMoney + winnings
      );


      setMessage(
        `🎉 YOU WIN! +$${winnings}`
      );
    }

    else {

      setMoney(
        (oldMoney: number) =>
          oldMoney - betAmount
      );


      setMessage(
        `😢 You lost $${betAmount}.`
      );
    }
  };

  const selectChoice = (
    newChoice: string
  ) => {

    if (rolling) {
      return;
    }

    setChoice(newChoice);

    setMessage("");
  };

  const selectNumber = (
    number: number
  ) => {

    if (rolling) {
      return;
    }

    setSpecificNumber(number);

    setMessage("");
  };

  return (

    <View style={styles.container}>

      {/* ====================================
          TITLE
          ==================================== */}

      <Text style={styles.title}>
        🎲 DICE
      </Text>


      {/* ====================================
          MONEY
          ==================================== */}

      <Text style={styles.money}>
        Money: ${money}
      </Text>


      {/* ====================================
          DICE
          ==================================== */}

      <Animated.Text
        style={[
          styles.dice,
          {
            transform: [
              {
                scale: diceAnimation,
              },
            ],
          },
        ]}
      >
        🎲
      </Animated.Text>


      {/* ====================================
          NUMBER
          ==================================== */}

      <Text style={styles.number}>

        {rolling
          ? "ROLLING..."
          : dice}

      </Text>


      {/* ====================================
          PAYOUT INFO
          ==================================== */}

      <Text style={styles.info}>
        Odd / Even / High / Low = 2x
      </Text>

      <Text style={styles.info}>
        Specific number = 5x
      </Text>


      {/* ====================================
          BET INPUT
          ==================================== */}

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={bet}
        onChangeText={setBet}
        placeholder="Enter bet"
        editable={!rolling}
      />


      {/* ====================================
          BET TYPE
          ==================================== */}

      <Text style={styles.chooseText}>
        Choose your bet:
      </Text>


      {/* ====================================
          ODD / EVEN
          ==================================== */}

      <View style={styles.buttons}>

        <Button
          title="ODD"
          onPress={() =>
            selectChoice("odd")
          }
          disabled={rolling}
        />

        <Button
          title="EVEN"
          onPress={() =>
            selectChoice("even")
          }
          disabled={rolling}
        />

      </View>


      {/* ====================================
          HIGH / LOW
          ==================================== */}

      <View style={styles.buttons}>

        <Button
          title="HIGH 4-6"
          onPress={() =>
            selectChoice("higher")
          }
          disabled={rolling}
        />

        <Button
          title="LOW 1-3"
          onPress={() =>
            selectChoice("lower")
          }
          disabled={rolling}
        />

      </View>


      {/* ====================================
          SPECIFIC NUMBER
          ==================================== */}

      <Button
        title="SPECIFIC NUMBER"
        onPress={() =>
          selectChoice("specific")
        }
        disabled={rolling}
      />


      {/* ====================================
          NUMBER SELECTION
          ==================================== */}

      {choice === "specific" && (

        <View style={styles.numberChoices}>

          <Text>
            Pick a number:
          </Text>


          {/* 1 2 3 */}

          <View style={styles.buttons}>

            {[1, 2, 3].map(
              (number) => (

                <Button
                  key={number}
                  title={`${number}`}
                  onPress={() =>
                    selectNumber(
                      number
                    )
                  }
                  disabled={rolling}
                />

              )
            )}

          </View>


          {/* 4 5 6 */}

          <View style={styles.buttons}>

            {[4, 5, 6].map(
              (number) => (

                <Button
                  key={number}
                  title={`${number}`}
                  onPress={() =>
                    selectNumber(
                      number
                    )
                  }
                  disabled={rolling}
                />

              )
            )}

          </View>


          {/* SELECTED NUMBER */}

          <Text
            style={
              styles.selectedNumber
            }
          >
            Selected: {specificNumber}
          </Text>

        </View>

      )}


      {/* ====================================
          SELECTED BET
          ==================================== */}

      <Text style={styles.selected}>

        {choice === "odd" &&
          "You picked: ODD"}

        {choice === "even" &&
          "You picked: EVEN"}

        {choice === "higher" &&
          "You picked: HIGH 4-6"}

        {choice === "lower" &&
          "You picked: LOW 1-3"}

        {choice === "specific" &&
          `You picked: NUMBER ${specificNumber}`}

        {choice === "" &&
          "Choose a bet type"}

      </Text>


      {/* ====================================
          ROLL BUTTON
          ==================================== */}

      <Button
        title={
          rolling
            ? "ROLLING..."
            : "ROLL DICE"
        }
        onPress={rollDice}
        disabled={
          rolling ||
          choice === ""
        }
      />


      {/* ====================================
          RESULT
          ==================================== */}

      <Text style={styles.message}>
        {message}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
  },

  money: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  dice: {
    fontSize: 80,
    marginBottom: 5,
  },

  number: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    fontSize: 14,
    marginBottom: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: 150,
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
  },

  chooseText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  buttons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  numberChoices: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  selectedNumber: {
    fontSize: 16,
    marginTop: 5,
  },

  selected: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 15,
  },

  message: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

});

