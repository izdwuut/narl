import React from "react";
import { useKeyboardControls } from "../game/hooks/useKeyboardControls";
import { Exp } from "./Exp";
import { Log } from "./Log";
import { Map } from "./Map";
import { EQ } from "./inventory/Eq";
import { Inv } from "./inventory/inv/Inv";

export const Game: React.FC = () => {
  useKeyboardControls();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 900,
        backgroundColor: "black",
        padding: 16,
      }}
    >
      <EQ />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 16,
          marginRight: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "48px",
          }}
        >
          <Exp />
          <Map />
        </div>
        <Log />
      </div>
      <Inv />
    </div>
  );
};
