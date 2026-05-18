import { useContext } from "react";
import { GameContext } from "../state/context";
import { dispatchGameAction } from "../systems/actions/gameAction/dispatchGameAction";
import { InternalActionType } from "../systems/internal/type";

type Init = {
  initialized: boolean;
  init: () => void;
};

export const useInit = (): Init => {
  const { gameState, setGameState } = useContext(GameContext);

  const init = () => {
    const nextState = dispatchGameAction({ type: InternalActionType.INIT })(
      gameState,
    );
    setGameState(nextState);
  };

  return { initialized: gameState.initialized, init };
};
