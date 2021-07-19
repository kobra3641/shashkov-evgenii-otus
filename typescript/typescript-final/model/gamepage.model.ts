import {EquationsElement} from "./equations.element.model";

export class GamePage {
    constructor(
        public firstNumber: number,
        public secondNumber: number,
        public equationObject: EquationsElement
    ) {
    }
}