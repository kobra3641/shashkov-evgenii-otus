import React, {Component} from "react";
import SelectTown from '../select-town/select-town'
import "./app.css"
import DataService from "../../services/data.service";
import IApp from "../../interfaces/iapp";
import Favorites from "../favorites/favorites";
import Information from "../information/information";

class App extends Component<IApp> {

    state = {
        weatherData: this.props.weatherData,
        town: this.props.town,
        favorites: this.props.favorites,
        isLoading: this.props.isLoading
    };

    componentDidMount(): void {
        const dataService = new DataService();
        dataService.getData().then((data: any[]) => {
            this.setState({
                weatherData: data,
                isLoading: false
            })
            console.log(data);
        })
    }

    onClickFavorites = () => {
        const value = this.state.town;
        const arr = this.state.favorites;
        if (arr.indexOf(value) === -1) {
            arr.push(value);
            this.setState({
                favorites: arr
            })
        }
    };

    onSelectChange = (value: string) => {
        this.setState({
            town: value
        })
    };

    onClickFavoriteDelete = (value: string) => {
        const arr = this.state.favorites;
        const item = arr.indexOf(value);
        arr.splice(item, 1);
        this.setState({
            favorites: arr
        })
    };

    render() {
        const {weatherData, isLoading, town, favorites} = this.state;
        return (
            <div className="container">
                <header className="row justify-content-center align-items-center my-3 border-form">
                    <div className="col-7 py-1">
                        <label className="m-0">Inspiration can even be found in the weather forecast.</label>
                    </div>
                    <div className="d-flex justify-content-center">
                        <i className="fas fa-heart red-heart fa-sm"
                           onClick={this.onClickFavorites}>
                        </i>
                    </div>
                    <div className="col-4 py-1">
                        {
                            Array.isArray(weatherData) && !isLoading &&
                            <SelectTown
                                onSelectChange={this.onSelectChange}
                                data={weatherData}
                                town={town}/>
                        }
                    </div>
                </header>
                <main>
                    <aside className="row justify-content-around py-2">
                        <div className="col-5 border-form">
                        {town !== '' &&
                        <Information
                            town={town}
                            data={weatherData.filter((item) => item.town === town)[0].weather}/>
                        }
                        </div>
                        {favorites.length > 0 &&
                        <div className="col-5 border-form">
                            <Favorites
                                favorites={favorites}
                                onClickFavoriteDelete={this.onClickFavoriteDelete}
                                onSelectChange={this.onSelectChange}/>
                        </div>
                        }
                    </aside>
                </main>
            </div>
        )
    }
}

export default App;
