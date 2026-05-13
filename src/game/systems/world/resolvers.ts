import { WorldActionType } from "../actions/gameAction/types";
import { resolveCurseItemAction } from "../curse/resolveCurseItemAction";
import { resolveDropAction } from "../drop/resolveDropAction";
import { resolveRemoveEntityAction } from "./resolveRemoveEntityAction";

type WorldActionResolver =
  | typeof resolveCurseItemAction
  | typeof resolveDropAction
  | typeof resolveRemoveEntityAction;

export const worldActionResolvers = {
  [WorldActionType.CURSE_ITEM]: resolveCurseItemAction,
  [WorldActionType.DROP_ITEM]: resolveDropAction,
  [WorldActionType.REMOVE_ENTITY]: resolveRemoveEntityAction,
} satisfies Record<WorldActionType, WorldActionResolver>;
