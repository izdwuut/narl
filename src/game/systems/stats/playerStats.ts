import { getComponentByType } from "../../../core/ecs/queries/component";
import { HpComponent } from "../../model/components/mobs/HpComponent";
import { PlayerEntity } from "../../model/entities/PlayerEntity";

enum PlayerStat {
  HP = "HP",
}

export type PlayerStats = Record<PlayerStat, string>;

export const getPlayerStats = (player: PlayerEntity): PlayerStats => {
  const hpCompoment = getComponentByType(player, HpComponent);

  return {
    [PlayerStat.HP]: `${hpCompoment?.hp ?? HpComponent.DEFAULT_HP} / ${hpCompoment?.maxHp ?? HpComponent.DEFAULT_MAX_HP}`,
  };
};
