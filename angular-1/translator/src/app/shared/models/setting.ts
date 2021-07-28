import {Language} from "./language";

export interface Setting {
  language: Language | undefined,
  counter: number,
  time: number
}
