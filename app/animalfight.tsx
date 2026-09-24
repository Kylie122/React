
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Animated,
} from "react-native";

import { useState, useEffect, useRef } from "react";
import { useMoney } from "./_layout";


// Lista sa e tari


const fighters = [
  {
    name: "Farrel Lopez",
    emoji: "🐕",
    type: "Super Dog",
  },

  {
    name: "Kent Lordjaybe",
    emoji: "🦛",
    type: "Hippo King",
  },

  {
    name: "arnold schwarzenegger",
    emoji: "🦍",
    type: "Bodybuilder",
  },

  {
    name: "Rocky Garcia",
    emoji: "🐒",
    type: "Monkey on steroids",
  },

  {
    name: "Max Rivera",
    emoji: "🦮",
    type: "Batman's disciple",
  },

  {
    name: "Buddy Cruz",
    emoji: "🐕‍🦺",
    type: "Veteran Police Dog",
  },

  {
    name: "Mason Parker",
    emoji: "🐩",
    type: "Poodle of death",
  },

  {
    name: "Puss in boots",
    emoji: "🐈",
    type: "Diablo Gato",
  },

  {
    name: "Emma Carter",
    emoji: "🐈‍⬛",
    type: "God Chosen Cat",
  },

  {
    name: "Olivia Parker",
    emoji: "🐅",
    type: "Demon Tiger",
  },

  {
    name: "Zenith Thompson",
    emoji: "🫏",
    type: "Dragon Donkey",
  },

  {
    name: "allen miller",
    emoji: "🦓",
    type: "Zebra of the apocalypse",
  },

  {
    name: "michael johnson",
    emoji: "🦌",
    type: "Lord of the Wild",
  },

  {
    name: "rock johnson",
    emoji: "🦬",
    type: "Mountain",
  },

  {
    name: "robert smith",
    emoji: "🐖",
    type: "Ultimate King",
  },

  {
    name: "kevin davis",
    emoji: "🐏",
    type: "Titan",
  },

  {
    name: "thomas brown",
    emoji: "🐂",
    type: "Goliath",
  },

  {
    name: "Speedy Gonzalez",
    emoji: "🐐",
    type: "THE GOAT",
  },

  {
    name: "eddie hall",
    emoji: "🦏",
    type: "Bulletproof Rhino",
  },

  {
    name: "mohammad ali",
    emoji: "🦣",
    type: "The Hulk's Cousin",
  },

  {
    name: "jerry smith",
    emoji: "🐁",
    type: "The Blind Mouse",
  },

  {
    name: "kenzo takada",
    emoji: "🐀",
    type: "Little Giant",
  },

  {
    name: "Lolong",
    emoji: "🐊",
    type: "Devourer",
  },

  {
    name: "duke johnson",
    emoji: "🦅",
    type: "Son of Odin",
  },

  {
    name: "nami yamamoto",
    emoji: "🦢",
    type: "Swan of Hell",
  },

  {
    name: "michael anjelo",
    emoji: "🐢",
    type: "The Last Ronin",
  },

  {
    name: "kenji quinn",
    emoji: "🐓",
    type: "Hen Breader",
  },

  {
    name: "Kyle Emmanuel",
    emoji: "🐉",
    type: "Apex Predator",
  },
];


// kinsay mag away

const getRandomFighters = () => {
  const firstIndex =
    Math.floor(
      Math.random() * fighters.length
    );

  let secondIndex =
    Math.floor(
      Math.random() * fighters.length
    );


  while (
    secondIndex === firstIndex
  ) {
    secondIndex =
      Math.floor(
        Math.random() * fighters.length
      );
  }

  return {
    fighterA:
      fighters[firstIndex],

    fighterB:
      fighters[secondIndex],
  };
};

export default function AnimalFight() {

  
  // kwarta


  const {
    money,
    setMoney,
  } = useMoney();

  
  // ang nag away
  

  const initialFighters =
    getRandomFighters();

  const [
    fighterA,
    setFighterA,
  ] = useState(
    initialFighters.fighterA
  );

  const [
    fighterB,
    setFighterB,
  ] = useState(
    initialFighters.fighterB
  );

  
  // Pusta
 

  const [
    selectedFighter,
    setSelectedFighter,
  ] = useState("");

  const [
    bet,
    setBet,
  ] = useState("");

  
  // Life
 

  const [
    fighterAHealth,
    setFighterAHealth,
  ] = useState(100);

  const [
    fighterBHealth,
    setFighterBHealth,
  ] = useState(100);


  // Fight
  

  const [
    fighting,
    setFighting,
  ] = useState(false);

  const [
    winner,
    setWinner,
  ] = useState("");

  const [
    message,
    setMessage,
  ] = useState("");

  
  // Rounds
 

  const [
    currentRound,
    setCurrentRound,
  ] = useState(1);

  const [
    fighterARounds,
    setFighterARounds,
  ] = useState(0);

  const [
    fighterBRounds,
    setFighterBRounds,
  ] = useState(0);

  
  // Animation

  const fighterAPosition =
    useRef(
      new Animated.Value(0)
    ).current;

  const fighterBPosition =
    useRef(
      new Animated.Value(0)
    ).current;

  
  // REFS


  const fighterAHealthRef =
    useRef(100);

  const fighterBHealthRef =
    useRef(100);

  const fighterARoundsRef =
    useRef(0);

  const fighterBRoundsRef =
    useRef(0);

  const currentRoundRef =
    useRef(1);

  const fightActiveRef =
    useRef(false);

  const fighterATimerRef =
    useRef<any>(null);

  const fighterBTimerRef =
    useRef<any>(null);

 
  // kanusa mo attack

  const getAttackDelay = () => {

    return (
      Math.floor(
        Math.random() * 201
      ) + 600
    );

  };

  
  // galaw2

  const attackAnimation = (
    attacker: string,
    damage: number
  ) => {

    const distance =
      damage >= 20
        ? 55
        : damage >= 12
        ? 40
        : 25;

    if (
      attacker === "Fighter A"
    ) {

      Animated.sequence([

        Animated.timing(
          fighterAPosition,
          {
            toValue:
              distance,

            duration: 120,

            useNativeDriver:
              true,
          }
        ),

        Animated.timing(
          fighterAPosition,
          {
            toValue: 0,

            duration: 120,

            useNativeDriver:
              true,
          }
        ),

      ]).start();

    } else {

      Animated.sequence([

        Animated.timing(
          fighterBPosition,
          {
            toValue:
              -distance,

            duration: 120,

            useNativeDriver:
              true,
          }
        ),

        Animated.timing(
          fighterBPosition,
          {
            toValue: 0,

            duration: 120,

            useNativeDriver:
              true,
          }
        ),

      ]).start();

    }

  };
 
  // stop timer

  const stopAttackTimers = () => {

    if (
      fighterATimerRef.current
    ) {

      clearTimeout(
        fighterATimerRef.current
      );

      fighterATimerRef.current =
        null;

    }

    if (
      fighterBTimerRef.current
    ) {

      clearTimeout(
        fighterBTimerRef.current
      );

      fighterBTimerRef.current =
        null;

    }

  };

  
  // ni attack si Fighter A
  

  const fighterAAttack = () => {

    if (
      !fightActiveRef.current
    ) {
      return;
    }

    let damage =
      Math.floor(
        Math.random() * 16
      ) + 5;

    // lagot

    if (
      fighterAHealthRef.current <= 30
    ) {

      damage += 8;

    }

    // likay 
    // 20%

    const dodged =
      Math.random() < 0.20;

    if (dodged) {

      attackAnimation(
        "Fighter A",
        5
      );

    } else {

      // block
      // 40%

      const blocked =
        Math.random() < 0.40;

      if (blocked) {

        damage =
          Math.ceil(
            damage * 0.60
          );

      }

      attackAnimation(
        "Fighter A",
        damage
      );

      const newHealth =
        Math.max(
          0,
          fighterBHealthRef.current -
            damage
        );

      fighterBHealthRef.current =
        newHealth;

      setFighterBHealth(
        newHealth
      );

      if (
        newHealth === 0
      ) {

        endRound(
          "Fighter A"
        );

        return;

      }

    }

    scheduleFighterAAttack();

  };

 
  // ni attack si Fighter B
  

  const fighterBAttack = () => {

    if (
      !fightActiveRef.current
    ) {
      return;
    }

    let damage =
      Math.floor(
        Math.random() * 16
      ) + 5;

    // lagot

    if (
      fighterBHealthRef.current <= 30
    ) {

      damage += 8;

    }

    // likay 
    // 20%

    const dodged =
      Math.random() < 0.20;

    if (dodged) {

      attackAnimation(
        "Fighter B",
        5
      );

    } else {

      // block
      // 30%

      const blocked =
        Math.random() < 0.30;

      if (blocked) {

        damage =
          Math.ceil(
            damage * 0.70
          );

      }

      attackAnimation(
        "Fighter B",
        damage
      );

      const newHealth =
        Math.max(
          0,
          fighterAHealthRef.current -
            damage
        );

      fighterAHealthRef.current =
        newHealth;

      setFighterAHealth(
        newHealth
      );

      if (
        newHealth === 0
      ) {

        endRound(
          "Fighter B"
        );

        return;

      }

    }

    scheduleFighterBAttack();

  };

 
  // SCHEDULE FIGHTER A


  const scheduleFighterAAttack = () => {

    if (
      !fightActiveRef.current
    ) {
      return;
    }

    const delay =
      getAttackDelay();

    fighterATimerRef.current =
      setTimeout(() => {

        fighterAAttack();

      }, delay);

  };

 
  // SCHEDULE FIGHTER B
  

  const scheduleFighterBAttack = () => {

    if (
      !fightActiveRef.current
    ) {
      return;
    }

    const delay =
      getAttackDelay();

    fighterBTimerRef.current =
      setTimeout(() => {

        fighterBAttack();

      }, delay);

  };

 
  // START battle
 

  useEffect(() => {

    if (!fighting) {
      return;
    }

    fightActiveRef.current =
      true;

    scheduleFighterAAttack();
    scheduleFighterBAttack();

    return () => {

      fightActiveRef.current =
        false;

      stopAttackTimers();

    };

  }, [fighting]);

  
  // End round


  const endRound = (
    roundWinner: string
  ) => {

    fightActiveRef.current =
      false;

    stopAttackTimers();

    setFighting(false);

    let newFighterARounds =
      fighterARoundsRef.current;

    let newFighterBRounds =
      fighterBRoundsRef.current;

    if (
      roundWinner === "Fighter A"
    ) {

      newFighterARounds++;

      fighterARoundsRef.current =
        newFighterARounds;

      setFighterARounds(
        newFighterARounds
      );

    } else {

      newFighterBRounds++;

      fighterBRoundsRef.current =
        newFighterBRounds;

      setFighterBRounds(
        newFighterBRounds
      );

    }

    
    // End game GG
   

    if (
      newFighterARounds >= 2 ||
      newFighterBRounds >= 2
    ) {

      const fightWinner =
        newFighterARounds >= 2
          ? "Fighter A"
          : "Fighter B";

      setWinner(
        fightWinner
      );

      const betAmount =
        Number(bet);

      if (
        selectedFighter ===
        fightWinner
      ) {

        setMoney(
          (oldMoney: number) =>
            oldMoney +
            betAmount
        );

        setMessage(
          `🎉 You won $${betAmount}!`
        );

      } else {

        setMoney(
          (oldMoney: number) =>
            oldMoney -
            betAmount
        );

        setMessage(
          `😢 You lost $${betAmount}.`
        );

      }

      return;

    }

    
    // NEXT ROUND
    

    const nextRound =
      currentRoundRef.current +
      1;

    currentRoundRef.current =
      nextRound;

    setCurrentRound(
      nextRound
    );

    setTimeout(() => {

      fighterAHealthRef.current =
        100;

      fighterBHealthRef.current =
        100;

      setFighterAHealth(100);
      setFighterBHealth(100);

      fighterAPosition.setValue(0);
      fighterBPosition.setValue(0);

      setFighting(true);

    }, 1000);

  };

  
  // START / FIGHT AGAIN
  

  const handleFightButton = () => {

   
    // FIGHT AGAIN
   

    if (
      winner !== ""
    ) {

      stopAttackTimers();

      fightActiveRef.current =
        false;

     
      const newFighters =
        getRandomFighters();

      setFighterA(
        newFighters.fighterA
      );

      setFighterB(
        newFighters.fighterB
      );

      // reset tari

      setSelectedFighter("");
      setBet("");

      // reset life

      setFighterAHealth(100);
      setFighterBHealth(100);

      fighterAHealthRef.current =
        100;

      fighterBHealthRef.current =
        100;

      // reset rounds

      setFighterARounds(0);
      setFighterBRounds(0);

      fighterARoundsRef.current =
        0;

      fighterBRoundsRef.current =
        0;

      setCurrentRound(1);

      currentRoundRef.current =
        1;

      // reset result

      setWinner("");
      setMessage("");

      // reset galaw

      fighterAPosition.setValue(0);
      fighterBPosition.setValue(0);

      return;

    }

   
    // START FIGHT

    const betAmount =
      Number(bet);

    if (
      betAmount <= 0
    ) {

      setMessage(
        "Enter a valid bet."
      );

      return;

    }

    if (
      betAmount > money
    ) {

      setMessage(
        "You don't have enough money."
      );

      return;

    }

    if (
      !selectedFighter
    ) {

      setMessage(
        "Choose a fighter."
      );

      return;

    }

    // RESET HEALTH

    fighterAHealthRef.current =
      100;

    fighterBHealthRef.current =
      100;

    setFighterAHealth(100);
    setFighterBHealth(100);

    // RESET ROUNDS

    fighterARoundsRef.current =
      0;

    fighterBRoundsRef.current =
      0;

    setFighterARounds(0);
    setFighterBRounds(0);

    currentRoundRef.current =
      1;

    setCurrentRound(1);

    // RESET RESULT

    setWinner("");
    setMessage("");

    // RESET MOVEMENT

    fighterAPosition.setValue(0);
    fighterBPosition.setValue(0);

    // START

    setFighting(true);

  };

 
  // RENDER

  return (

    <View style={styles.container}>

      {/* TITLE */}

      <Text style={styles.title}>
        🐾 ANIMAL FIGHT 🐾
      </Text>

      <Text style={styles.money}>
        Money: ${money}
      </Text>

      {/* ==========================================
          RESULT
          ========================================== */}

      {winner !== "" && (

        <View style={styles.topResult}>

          <Text style={styles.winner}>

            🏆{" "}

            {winner === "Fighter A"
              ? fighterA.name
              : fighterB.name}

            {" "}WINS! 🏆

          </Text>

          <Text style={styles.finalScore}>

            Final Score:{" "}
            {fighterARounds} -{" "}
            {fighterBRounds}

          </Text>

          <Text style={styles.message}>
            {message}
          </Text>

        </View>

      )}

      {/* ==========================================
          ROUND
          ========================================== */}

      <View style={styles.roundBox}>

        <Text style={styles.roundText}>
          ROUND {currentRound} / 3
        </Text>

        <Text style={styles.score}>

          {fighterA.name}{" "}
          {fighterARounds} -{" "}
          {fighterBRounds}{" "}
          {fighterB.name}

        </Text>

      </View>

      {/* ==========================================
          FIGHTERS
          ========================================== */}

      <View style={styles.fighters}>

        {/* ========================================
            FIGHTER A
            ======================================== */}

        <View style={styles.fighter}>

          <Animated.Text
            style={[
              styles.fighterEmoji,
              {
                transform: [
                  {
                    translateX:
                      fighterAPosition,
                  },

                  {
                    scaleX: -1,
                  },
                ],
              },
            ]}
          >

            {fighterA.emoji}

          </Animated.Text>

          <Text style={styles.fighterName}>
            {fighterA.name}
          </Text>

          <Text style={styles.fighterType}>
            {fighterA.type}
          </Text>

          {fighterAHealth <= 30 &&
            fighterAHealth > 0 && (

              <Text style={styles.rage}>
                😡 RAGE!
              </Text>

            )}

          <Text style={styles.healthText}>
            {fighterAHealth} HP
          </Text>

          <View style={styles.healthBar}>

            <View
              style={[
                styles.healthFill,
                {
                  width:
                    `${fighterAHealth}%`,
                },
              ]}
            />

          </View>

          <Button
            title="Pick Fighter A"
            onPress={() =>
              setSelectedFighter(
                "Fighter A"
              )
            }
            disabled={
              fighting ||
              winner !== ""
            }
          />

        </View>

        {/* ========================================
            VS
            ======================================== */}

        <Text style={styles.vs}>
          VS
        </Text>

        {/* ========================================
            FIGHTER B
            ======================================== */}

        <View style={styles.fighter}>

          <Animated.Text
            style={[
              styles.fighterEmojiRight,
              {
                transform: [
                  {
                    translateX:
                      fighterBPosition,
                  },
                ],
              },
            ]}
          >

            {fighterB.emoji}

          </Animated.Text>

          <Text style={styles.fighterName}>
            {fighterB.name}
          </Text>

          <Text style={styles.fighterType}>
            {fighterB.type}
          </Text>

          {fighterBHealth <= 30 &&
            fighterBHealth > 0 && (

              <Text style={styles.rage}>
                😡 RAGE!
              </Text>

            )}

          <Text style={styles.healthText}>
            {fighterBHealth} HP
          </Text>

          <View style={styles.healthBar}>

            <View
              style={[
                styles.healthFill,
                {
                  width:
                    `${fighterBHealth}%`,
                },
              ]}
            />

          </View>

          <Button
            title="Pick Fighter B"
            onPress={() =>
              setSelectedFighter(
                "Fighter B"
              )
            }
            disabled={
              fighting ||
              winner !== ""
            }
          />

        </View>

      </View>

      {/* ==========================================
          SELECTED FIGHTER
          ========================================== */}

      <Text style={styles.selected}>

        {selectedFighter

          ? `You picked: ${
              selectedFighter ===
              "Fighter A"
                ? fighterA.name
                : fighterB.name
            }`

          : "Choose a fighter"}

      </Text>

      {/* ==========================================
          BET
          ========================================== */}

      <Text>
        Enter your bet:
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={bet}
        onChangeText={setBet}
        placeholder="Example: 100"
        editable={
          !fighting &&
          winner === ""
        }
      />

      {/* ==========================================
          FIGHT STATUS
          ========================================== */}

      {fighting && (

        <Text style={styles.fighting}>
          ⚔️ FIGHTING! ⚔️
        </Text>

      )}

      {/* ==========================================
          MAIN BUTTON
          ========================================== */}

      <Button
        title={
          winner !== ""
            ? "FIGHT AGAIN"
            : fighting
            ? "FIGHTING..."
            : "START FIGHT"
        }
        onPress={
          handleFightButton
        }
        disabled={
          fighting ||
          (!winner &&
            !selectedFighter)
        }
      />

    </View>

  );

}


// STYLES

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
    marginBottom: 10,
  },

  money: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

 
  // RESULT
  

  topResult: {
    alignItems: "center",
    marginBottom: 12,
  },

  winner: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },

  finalScore: {
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 3,
  },

  message: {
    fontSize: 18,
    marginTop: 3,
    textAlign: "center",
  },

 
  // ROUND
  

  roundBox: {
    alignItems: "center",
    marginBottom: 10,
  },

  roundText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  score: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 3,
    textAlign: "center",
  },

  
  // FIGHTERS


  fighters: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },

  fighter: {
    alignItems: "center",
    gap: 5,
    width: 135,
  },

  fighterEmoji: {
    fontSize: 65,
  },

  fighterEmojiRight: {
    fontSize: 65,
  },

  fighterName: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  fighterType: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },

  rage: {
    fontSize: 15,
    fontWeight: "bold",
  },

  vs: {
    fontSize: 20,
    fontWeight: "bold",
  },

  healthText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  healthBar: {
    width: 105,
    height: 13,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    overflow: "hidden",
  },

  healthFill: {
    height: "100%",
    backgroundColor: "green",
  },

  
  // BET


  selected: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: 140,
    padding: 8,
    marginTop: 5,
    marginBottom: 8,
    textAlign: "center",
  },


  // FIGHTING
  
  fighting: {
    fontSize: 21,
    fontWeight: "bold",
    marginBottom: 8,
  },

});

