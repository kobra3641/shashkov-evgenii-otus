import React from "react";
import IInformation from "../../interfaces/iinformation";
import "./information.css"

const Information: React.FC<IInformation> = ({data, town}) => {

    const {temp, overcast, wind, humidity} = data;

    const today = new Date(), date = today.getDate() + '.' + (today.getMonth() + 1 + '.' + today.getFullYear());

    return (
        <div className="card background m-3">
            <div className="card-header border-form text-center background">
                <label className="mx-2">
                    {town}
                </label>
                <label>
                    <i className={`fas fa-${overcast}`}></i>
                </label>
            </div>
            <div className="card-body">
                <div className="row justify-content-center text-center">
                    <label>
                        {'Today: ' + date}
                        <i className="fas fa-clock mx-2"></i>
                    </label>
                </div>
                <div className="row justify-content-center text-center">
                    <label>
                        {'Temperature: ' + temp}
                        <i className="fas fa-thermometer-half mx-2"> </i>
                    </label>
                </div>
                <div className="row justify-content-center text-center">
                    <label>
                        {'Wind: ' + wind + ' m/s'}
                        <i className="fas fa-wind mx-2"> </i>
                    </label>
                </div>
                <div className="row justify-content-center text-center">
                    <label>
                        {'Humidity: ' + humidity + ' %'}
                        <i className="fas fa-tint mx-2"> </i>
                    </label>
                </div>
            </div>
        </div>
    )
};

export default Information