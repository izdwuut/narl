import React from "react";
import { TileIndex } from "./TileIndex";
import type { RenderedTile } from "../game/systems/render/types";

type TileProps = {
  renderedTile: RenderedTile;
  index: number;
};

const Tile: React.FC<TileProps> = ({ renderedTile, index }) => {
  return (
    <div>
      <div
        style={{
          backgroundColor: renderedTile.background ?? "black",
          height: "48px",
          width: "48px",
          border: "1px solid white",
          color: renderedTile.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4
        }}
      >
        {renderedTile.char ?? " "}
      </div>
      <TileIndex index={index + 1} />
    </div>
  );
};

export default Tile;
