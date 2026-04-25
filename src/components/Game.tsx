import React from "react";
import { useKeyboardControls } from "../game/hooks/useKeyboardControls";
import { Log } from "./Log";
import { Map } from "./Map";
import { Inventory } from "./inventory/Inventory";
import { Exp } from "./Exp";
import { EQ } from "./inventory/Eq";

export const Game: React.FC = () => {
  useKeyboardControls();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <EQ />
        <Exp />
        <Map />
      </div>
      <Log />
      <Inventory />
    </div>
  );
};
