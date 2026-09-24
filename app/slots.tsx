import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Animated,
  ScrollView,
  Pressable,
  Easing,
} from "react-native";

import { useState, useRef } from "react";
import { useMoney } from "./_layout";

export default function Slots() {
  const { money, setMoney } = useMoney();

  const symbols = [
    "🍒",
    "🍒",
    "🍒",
    "🍒",

    "🍋",
    "🍋",
    "🍋",
    "🍋",

    "🍊",
    "🍊",
    "🍊",
    "🍊",

    "🍇",
    "🍇",
    "🍇",
    "🍇",

    "🍉",
    "🍉",
    "🍉",

    "🍎",
    "🍎",
    "🍎",

    "🔔",
    "🔔",

    "⭐",

    "💎",

    "7️⃣",
  ];

  const CELL_HEIGHT = 60;
  const STRIP_RANDOM_COUNT = 18;

  const [slots, setSlots] = useState([
    ["❓", "❓", "❓"],
    ["❓", "❓", "❓"],
    ["❓", "❓", "❓"],
  ]);

  function getRandomSymbol() {
    return symbols[
      Math.floor(
        Math.random() * symbols.length
      )
    ];
  }

  const getRandomReel = () => {
    return [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ];
  };

  const createInitialStrip = () => {
    const strip: string[] = [];

    for (
      let i = 0;
      i < STRIP_RANDOM_COUNT;
      i++
    ) {
      strip.push(getRandomSymbol());
    }

    strip.push("❓");
    strip.push("❓");
    strip.push("❓");

    return strip;
  };

  const [reelStrips, setReelStrips] =
    useState([
      createInitialStrip(),
      createInitialStrip(),
      createInitialStrip(),
    ]);

  const [bet, setBet] = useState("");
  const [message, setMessage] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [winningCells, setWinningCells] =
    useState<string[]>([]);
  const [hasWon, setHasWon] =
    useState(false);

  const animation1 = useRef(
    new Animated.Value(0)
  ).current;

  const animation2 = useRef(
    new Animated.Value(0)
  ).current;

  const animation3 = useRef(
    new Animated.Value(0)
  ).current;

  const createFinalStrip = (
    finalReel: string[]
  ) => {
    const strip: string[] = [];

    for (
      let i = 0;
      i < STRIP_RANDOM_COUNT;
      i++
    ) {
      strip.push(getRandomSymbol());
    }

    strip.push(finalReel[0]);
    strip.push(finalReel[1]);
    strip.push(finalReel[2]);

    return strip;
  };

  const getPayout = (
    symbol: string
  ) => {
    if (symbol === "7️⃣") {
      return 100;
    }

    if (symbol === "💎") {
      return 20;
    }

    if (symbol === "⭐") {
      return 10;
    }

    if (symbol === "🔔") {
      return 8;
    }

    return 5;
  };

  const checkWinningLines = (
    grid: string[][],
    betAmount: number
  ) => {
    let totalWinnings = 0;
    let winningLines = 0;
    let jackpot = false;

    const newWinningCells: string[] = [];

    const checkLine = (
      cells: [number, number][]
    ) => {
      const values = cells.map(
        ([row, column]) =>
          grid[row][column]
      );
      if (
        values[0] === values[1] &&
        values[1] === values[2]
      ) {
        const symbol = values[0];

        const payout =
          getPayout(symbol);

        totalWinnings +=
          betAmount * payout;

        winningLines++;
        cells.forEach(
          ([row, column]) => {
            const key =
              `${row}-${column}`;

            if (
              !newWinningCells.includes(
                key
              )
            ) {
              newWinningCells.push(key);
            }
          }
        );
        if (symbol === "7️⃣") {
          jackpot = true;
        }
      }
    };

    checkLine([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);

    checkLine([
      [1, 0],
      [1, 1],
      [1, 2],
    ]);

    checkLine([
      [2, 0],
      [2, 1],
      [2, 2],
    ]);

    checkLine([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);

    checkLine([
      [0, 1],
      [1, 1],
      [2, 1],
    ]);

    checkLine([
      [0, 2],
      [1, 2],
      [2, 2],
    ]);

    checkLine([
      [0, 0],
      [1, 1],
      [2, 2],
    ]);

    checkLine([
      [0, 2],
      [1, 1],
      [2, 0],
    ]);

    setWinningCells(
      newWinningCells
    );

    if (winningLines > 0) {
      setHasWon(true);

      setMoney(
        (oldMoney: number) =>
          oldMoney + totalWinnings
      );

      if (jackpot) {
        setMessage(
          `🎉🎉 JACKPOT! 🎉🎉\n` +
          `${winningLines} winning line(s)!\n` +
          `You won $${totalWinnings}!`
        );
      } else {
        setMessage(
          `🎉 YOU WIN!\n` +
          `${winningLines} winning line(s)!\n` +
          `You won $${totalWinnings}!`
        );
      }

      return;
    }
    setHasWon(false);
    setWinningCells([]);

    setMoney(
      (oldMoney: number) =>
        oldMoney - betAmount
    );

    setMessage(
      `😢 You lost $${betAmount}.`
    );
  };

  const spin = () => {
    const betAmount = Number(bet);

    if (
      !Number.isFinite(betAmount) ||
      betAmount <= 0
    ) {
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

    if (spinning) {
      return;
    }

    setSpinning(true);
    setMessage("");
    setHasWon(false);
    setWinningCells([]);

    const finalReel1 =
      getRandomReel();

    const finalReel2 =
      getRandomReel();

    const finalReel3 =
      getRandomReel();

    setReelStrips([
      createFinalStrip(finalReel1),
      createFinalStrip(finalReel2),
      createFinalStrip(finalReel3),
    ]);

    animation1.setValue(0);
    animation2.setValue(0);
    animation3.setValue(0);

    const finalGrid = [
      [
        finalReel1[0],
        finalReel2[0],
        finalReel3[0],
      ],

      [
        finalReel1[1],
        finalReel2[1],
        finalReel3[1],
      ],

      [
        finalReel1[2],
        finalReel2[2],
        finalReel3[2],
      ],
    ];

    const finalPosition =
      -(
        STRIP_RANDOM_COUNT *
        CELL_HEIGHT
      );

    Animated.parallel([
      Animated.sequence([
        Animated.delay(0),

        Animated.timing(animation1, {
          toValue: finalPosition,
          duration: 1400,
          easing:
            Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(350),

        Animated.timing(animation2, {
          toValue: finalPosition,
          duration: 1600,
          easing:
            Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(700),

        Animated.timing(animation3, {
          toValue: finalPosition,
          duration: 1800,
          easing:
            Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),

    ]).start(() => {

      setSlots(finalGrid);

      checkWinningLines(
        finalGrid,
        betAmount
      );

      setSpinning(false);
    });
  };

  const setQuickBet = (
    amount: number
  ) => {
    if (spinning) {
      return;
    }

    setBet(String(amount));
    setMessage("");
    setWinningCells([]);
    setHasWon(false);
  };

  const setMaxBet = () => {
    if (spinning) {
      return;
    }

    setBet(String(money));
    setMessage("");
    setWinningCells([]);
    setHasWon(false);
  };

  const isWinningCell = (
    row: number,
    column: number
  ) => {
    return winningCells.includes(
      `${row}-${column}`
    );
  };

  const renderReel = (
    reelIndex: number,
    animation: Animated.Value
  ) => {
    return (
      <View style={styles.reelWindow}>

        <Animated.View
          style={{
            transform: [
              {
                translateY: animation,
              },
            ],
          }}
        >

          {reelStrips[
            reelIndex
          ].map(
            (symbol, index) => (

              <View
                key={
                  `${reelIndex}-${index}`
                }
                style={styles.reelCell}
              >

                <Text
                  style={styles.symbol}
                >
                  {symbol}
                </Text>

              </View>

            )
          )}

        </Animated.View>

      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      showsVerticalScrollIndicator={false}
    >

      {/* TITLE */}

      <Text style={styles.title}>
        🎰 SLOTS 🎰
      </Text>

      {/* MONEY */}

      <Text style={styles.money}>
        Money: ${money}
      </Text>

      {/* SLOT MACHINE */}

      <View style={styles.machine}>

        {renderReel(
          0,
          animation1
        )}

        {renderReel(
          1,
          animation2
        )}

        {renderReel(
          2,
          animation3
        )}

      </View>

      {/* WINNING LINE INFO */}

      <Text style={styles.lineInfo}>
        ─── Horizontal ───
      </Text>

      <Text style={styles.lineInfo}>
        │ Vertical │ Diagonal │
      </Text>

      {/* PAYOUTS */}

      <Text style={styles.info}>
        🍒 🍋 🍊 🍇 🍉 🍎 = 5x
      </Text>

      <Text style={styles.info}>
        🔔 = 8x | ⭐ = 10x
      </Text>

      <Text style={styles.info}>
        💎 = 20x | 7️⃣ = 100x JACKPOT
      </Text>

      {/* BET INPUT */}

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={bet}
        onChangeText={setBet}
        placeholder="Enter bet"
        editable={!spinning}
      />

      {/* QUICK BET */}

      <Text style={styles.quickTitle}>
        QUICK BET
      </Text>

      <View style={styles.quickBetRow}>

        <Pressable
          style={styles.quickButton}
          onPress={() =>
            setQuickBet(10)
          }
          disabled={spinning}
        >
          <Text style={styles.quickText}>
            $10
          </Text>
        </Pressable>

        <Pressable
          style={styles.quickButton}
          onPress={() =>
            setQuickBet(25)
          }
          disabled={spinning}
        >
          <Text style={styles.quickText}>
            $25
          </Text>
        </Pressable>

        <Pressable
          style={styles.quickButton}
          onPress={() =>
            setQuickBet(50)
          }
          disabled={spinning}
        >
          <Text style={styles.quickText}>
            $50
          </Text>
        </Pressable>

        <Pressable
          style={styles.quickButton}
          onPress={() =>
            setQuickBet(100)
          }
          disabled={spinning}
        >
          <Text style={styles.quickText}>
            $100
          </Text>
        </Pressable>

        <Pressable
          style={styles.quickButton}
          onPress={setMaxBet}
          disabled={spinning}
        >
          <Text style={styles.quickText}>
            MAX
          </Text>
        </Pressable>

      </View>

      {/* SPIN BUTTON */}

      <View style={styles.spinButton}>

        <Button
          title={
            spinning
              ? "🎰 SPINNING..."
              : "🎰 SPIN"
          }
          onPress={spin}
          disabled={spinning}
        />

      </View>

      {/* ====================================
          WIN RESULT GRID
          
          IMPORTANT:
          This only appears when hasWon === true.
          ==================================== */}

      {!spinning &&
        hasWon &&
        slots[0][0] !== "❓" && (

          <View style={styles.resultGrid}>

            {[0, 1, 2].map(
              (row) => (

                <View
                  key={row}
                  style={styles.resultRow}
                >

                  {[0, 1, 2].map(
                    (column) => (

                      <View
                        key={
                          `${row}-${column}`
                        }
                        style={[
                          styles.resultCell,
                          isWinningCell(
                            row,
                            column
                          ) &&
                            styles.winningCell,
                        ]}
                      >

                        <Text
                          style={
                            styles.resultSymbol
                          }
                        >
                          {
                            slots[row][
                              column
                            ]
                          }
                        </Text>

                      </View>

                    )
                  )}

                </View>

              )
            )}

          </View>

        )}

      {/* RESULT MESSAGE */}

      {message !== "" && (
        <Text style={styles.message}>
          {message}
        </Text>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 3,
  },

  money: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 7,
  },

  machine: {
    flexDirection: "row",
    gap: 5,
    marginTop: 5,
    marginBottom: 5,
  },

  reelWindow: {
    width: 65,
    height: 180,
    overflow: "hidden",
    borderWidth: 2,
    borderRadius: 8,
  },

  reelCell: {
    width: 61,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },

  symbol: {
    fontSize: 29,
  },

  lineInfo: {
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 0,
  },

  info: {
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 1,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    width: 130,
    padding: 7,
    marginTop: 5,
    marginBottom: 4,
    textAlign: "center",
  },

  quickTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },

  quickBetRow: {
    flexDirection: "row",
    gap: 4,
    marginBottom: 7,
  },

  quickButton: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },

  quickText: {
    fontSize: 11,
    fontWeight: "bold",
  },

  spinButton: {
    marginBottom: 8,
  },

  resultGrid: {
    marginTop: 3,
  },

  resultRow: {
    flexDirection: "row",
  },

  resultCell: {
    width: 42,
    height: 42,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  winningCell: {
    borderWidth: 3,
    transform: [
      {
        scale: 1.08,
      },
    ],
  },

  resultSymbol: {
    fontSize: 22,
  },

  message: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 7,
    textAlign: "center",
  },

});