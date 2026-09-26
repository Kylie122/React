
import { Stack } from "expo-router";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
} from "react";

type GameStats = {
  wins: number;
  losses: number;
};

type CasinoStats = {
  dogfight: GameStats;
  dice: GameStats & { rolls: number; sixes: number };
  slots: GameStats & { spins: number; threeOfAKind: number };
};

type MoneyContextValue = {
  money: number;
  setMoney: Dispatch<SetStateAction<number>>;
  stats: CasinoStats;
  recordDogfight: (won: boolean) => void;
  recordDiceRoll: (won: boolean, rolledSix: boolean) => void;
  recordSlotSpin: (won: boolean, threeOfAKind: boolean) => void;
};

const MoneyContext = createContext<MoneyContextValue | null>(null);

export function MoneyProvider({ children }: PropsWithChildren) {
  const [money, setMoney] = useState(1000);

  const [stats, setStats] = useState<CasinoStats>({
    dogfight: {
      wins: 0,
      losses: 0,
    },

    dice: {
      wins: 0,
      losses: 0,
      rolls: 0,
      sixes: 0,
    },

    slots: {
      wins: 0,
      losses: 0,
      spins: 0,
      threeOfAKind: 0,
    },
  });

  const recordDogfight = useCallback((won: boolean) => {
    setStats((current) => ({
      ...current,
      dogfight: {
        wins: current.dogfight.wins + Number(won),
        losses: current.dogfight.losses + Number(!won),
      },
    }));
  }, []);

  const recordDiceRoll = useCallback(
    (won: boolean, rolledSix: boolean) => {
      setStats((current) => ({
        ...current,
        dice: {
          ...current.dice,
          wins: current.dice.wins + Number(won),
          losses: current.dice.losses + Number(!won),
          rolls: current.dice.rolls + 1,
          sixes: current.dice.sixes + Number(rolledSix),
        },
      }));
    },
    []
  );

  const recordSlotSpin = useCallback(
    (won: boolean, threeOfAKind: boolean) => {
      setStats((current) => ({
        ...current,
        slots: {
          ...current.slots,
          wins: current.slots.wins + Number(won),
          losses: current.slots.losses + Number(!won),
          spins: current.slots.spins + 1,
          threeOfAKind:
            current.slots.threeOfAKind + Number(threeOfAKind),
        },
      }));
    },
    []
  );

  return (
    <MoneyContext.Provider
      value={{
        money,
        setMoney,
        stats,
        recordDogfight,
        recordDiceRoll,
        recordSlotSpin,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
}

export function useMoney() {
  const context = useContext(MoneyContext);

  if (!context) {
    throw new Error("useMoney must be used within MoneyProvider");
  }

  return context;
}

export default function Layout() {
  return (
    <MoneyProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#111111",
          },

          headerTintColor: "#F5C542",

          headerTitleStyle: {
            color: "#F5C542",
            fontWeight: "bold",
            fontSize: 20,
          },

          headerShadowVisible: false,

          contentStyle: {
            backgroundColor: "#111111",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="dogfight"
          options={{
            title: "🥊 Dog Fight",
          }}
        />

        <Stack.Screen
          name="dice"
          options={{
            title: "🎲 Dice",
          }}
        />

        <Stack.Screen
          name="slots"
          options={{
            title: "🎰 Slots",
          }}
        />

        <Stack.Screen
          name="stats"
          options={{
            title: "📊 Statistics",
          }}
        />
      </Stack>
    </MoneyProvider>
  );
}
