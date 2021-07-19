import {EquationsElement} from "./equations.element.model";
import {BestScore} from "./bestscore.model";

export class Equations {
    constructor(
        public questionAmount: number,
        public equationsArray: EquationsElement[],
        public playerGuessArray: boolean[],
        public bestScoreArray: BestScore[]
    ) {
    }
}