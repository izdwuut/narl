import { useEffect } from "react";
import { useInit } from "../game/hooks/useInit";
import { Game } from "./Game";

export const Main = () => {
  const { init, initialized } = useInit();

  useEffect(() => {
    if (!initialized) {
      init();
    }
  }, [initialized, init]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return <Game />;
};
