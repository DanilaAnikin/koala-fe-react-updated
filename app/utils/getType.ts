import { ElementType } from "../types";

export const getType = (item: any): ElementType => {
  if ('name' in item) return 'character';
  if ('years' in item) return 'nemesis';
  if ('secretCode' in item) return 'secret';
  return 'character';
};