import {Input, AutoComplete} from 'antd';
import {withRouter} from 'react-router-dom';
import React, {useContext, useState} from "react";
import {TownContext} from "../../../context";
import russianTowns from './../../../data/russian-towns.json';
import ITown from "../../../interfaces/itown";

const {Option} = AutoComplete;

const getOptions = (arr: any[]) => arr.map(city =>
    (<Option key={city.name}
             value={city.name}
             label={city.name}>
        {city.name}
    </Option>)
);

const topTowns = ["Москва", "Санкт-Петербург", "Казань", "Екатеринбург", "Сочи", "Нижний Новгород", "Новосибирск",
    "Ростов-на-Дону", "Тюмень", "Красноярск", "Челябинск"]
    .map(topCity => russianTowns.find(city => city.name === topCity));


const TownAutoComplete = (history: any) => {
    const townContext = useContext(TownContext);
    const [dataSource, setDataSource] = useState(getOptions(topTowns));

    const handleSearch = (value: string) => {
        if (value.length > 0) {
            const arr = russianTowns.filter(city =>
                city.name.slice(0, value.length).toLowerCase() === value.toLowerCase());
            setDataSource(getOptions(arr));
        } else {
            setDataSource(getOptions(topTowns))
        }
    };

    const selectTown = (value: string) => {
        const element = russianTowns.filter(town =>
            town.name.toLowerCase() === value.toLowerCase()).pop();
        return element as ITown;
    }

    return (
        <div style={{width: 353}}>
            <AutoComplete
                disabled={history.location.pathname !== '/'}
                allowClear
                autoFocus
                style={{width: '100%'}}
                dataSource={dataSource}
                onSearch={handleSearch}
                onSelect={value => townContext.setTown(selectTown(value))}
            >
                <Input
                    placeholder="Поиск и выбор города"
                />
            </AutoComplete>
        </div>
    );
};

export default withRouter(TownAutoComplete);
