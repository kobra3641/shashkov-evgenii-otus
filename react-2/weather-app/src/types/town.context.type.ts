import ITown from "../interfaces/itown";
import React, {SetStateAction} from "react";

type TownContextType = {
    town: ITown | null
    setTown: React.Dispatch<SetStateAction<ITown | null>>
}

export default TownContextType
