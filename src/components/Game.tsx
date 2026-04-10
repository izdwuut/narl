import React from "react";
import { useKeyboardControls } from "../game/hooks/useKeyboardControls";
import { Log } from "./Log";
import { Map } from "./Map";
import { Inventory } from "./inventory/Inventory";

export const Game: React.FC = () => {
  useKeyboardControls();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Map />
      </div>
      <Log />
      <Inventory />
    </div>
  );
};
