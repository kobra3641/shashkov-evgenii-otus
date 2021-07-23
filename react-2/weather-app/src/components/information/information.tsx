import React, {useContext, useEffect, useState} from "react";
import IInformation from "../../interfaces/iinformation";
import "./information.css"
import DataService from "../../services/data.service";
import {TownContext} from "../../context";
import TownList from "./townlist/town.list";

const dataService = new DataService();

const Information: React.FC<IInformation> = ({town}) => {

    const townContext = useContext(TownContext);
    const [towns, setTowns] = useState(dataService.getFromStorage());

    const deleteTown = (city: any) => {
        let towns = dataService.getFromStorage();
        towns = towns.filter(item => item.name !== city.name);
        localStorage.setItem(dataService.storageWeatherPerTownName, JSON.stringify(towns));
        setTowns(dataService.getFromStorage());
        townContext.setTown(null);
    };

    useEffect(() => {
        if (town && "name" in town && !towns.find(item => item.name === town.name)) {
            const townsForStorage = towns;
            townsForStorage.push(town);
            localStorage.setItem(dataService.storageWeatherPerTownName, JSON.stringify(townsForStorage));
            setTowns(dataService.getFromStorage());
        }
    }, [town, towns]);

    return (
        <TownList towns={towns} deleteTown={deleteTown}/>
    )
};

export default Information
