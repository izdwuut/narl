import React from 'react';
import Tile from './Tile';
import { useRenderedMap } from '../game/hooks/useRenderedMap';
import { useKeyboardControls } from '../game/hooks/useKeyboardControls';


export const Map: React.FC = () => {
    const renderedMap = useRenderedMap();

    return renderedMap.map((tile) => (
        <Tile renderedTile={tile} key={tile.id} />
    ))
};