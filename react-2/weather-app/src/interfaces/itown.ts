import ICoords from "./icoords";

interface ITown {
    coords?: ICoords,
    district?: string,
    name: string,
    population?: number,
    subject?: string
}

export default ITown
