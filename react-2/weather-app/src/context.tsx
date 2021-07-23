import {createContext} from "react";
import TownContextType from "./types/town.context.type";

export const TownContext = createContext<TownContextType>({town: null, setTown: () => {}});
