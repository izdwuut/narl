import type { GameState } from "../../state/state";
import type { ActionResolution } from "../actions/types";
import { resolveCurseItemAction } from "../curse/resolveCurseItemAction";
import { resolveMobDropItemAction } from "../drop/resolveMobDropItemAction";
import { resolveRemoveEntityAction } from "./resolveRemoveEntityAction";
import { WorldActionType } from "./types";

type AnyWorldResolver = (state: GameState, action: any) => ActionResolution;

export const worldActionResolvers = {
  [WorldActionType.CURSE_ITEM]: resolveCurseItemAction,
  [WorldActionType.DROP_ITEM]: resolveMobDropItemAction,
  [WorldActionType.REMOVE_ENTITY]: resolveRemoveEntityAction,
} satisfies Record<WorldActionType, AnyWorldResolver>;
