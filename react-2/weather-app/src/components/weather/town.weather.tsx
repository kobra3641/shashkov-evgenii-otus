import React, {useContext} from "react";
import DataService from "../../services/data.service";
import {TownContext} from "../../context";
import {Col, Row} from "antd";
import {Async} from "react-async";

const dataService = new DataService();

const TownWeather = () => {

    const {town} = useContext(TownContext);

    const viewData = (data: any) => {
        return (data.list
            .filter((item: any) => item.dt_txt.split(' ')[1] === '12:00:00')
            .map((item: any) =>
                (<Col key={item.dt_txt} className="m-2"
                      style={{width: '200px', border: "1px solid #3D9AD1", borderRadius: "0.5rem"}}>
                    <Row justify="center" className="mt-2">
                        <label className="text-center">
                            <i className="fas fa-clock mx-2"/>
                            {'Дата: ' + new Date(item.dt_txt.split(' ')[0]).toLocaleDateString()}
                        </label>
                    </Row>
                    <Row justify="center">
                        <label className="text-center">
                            <i className="fas fa-thermometer-half mx-2"/>
                            {'Температура: ' + Math.floor(item.main.temp)}
                        </label>
                    </Row>
                    <Row justify="center">
                        <label className="text-center">
                            <i className="fas fa-cloud mx-2"/>
                            {'Давление: ' + Math.floor(item.main.pressure * 0.75)}
                        </label>
                    </Row>
                    <Row justify="center">
                        <label className="text-center">
                            <i className="fas fa-tint mx-2"/>
                            {'Влажность: ' + item.main.humidity + ' %'}
                        </label>
                    </Row>
                    <Row justify="center">
                        <label className="text-center">
                            <i className="fas fa-wind mx-2"/>
                            {'Ветер: ' + Math.floor(item.wind.speed) + ' м/с'}
                        </label>
                    </Row>
                </Col>)
            ));
    }

    const loadDataWithTown = () =>
        town && "name" in town ? dataService.getWeather(true, town).then((data: any) => {
                return data;
            }) : loadDataWithUrl();

    const loadDataWithUrl = () =>
        dataService.getWeatherByUrl().then((data: any) => {
           return data;
        });

    return(
        <Row justify="center">
            <Async promiseFn={loadDataWithTown}>
                {({ data, isLoading }) => {
                    if (isLoading) return (<label>Загрузка...</label>)
                    if (data) return viewData(data)
                    }
                }
            </Async>
        </Row>
    )
};

export default TownWeather;
