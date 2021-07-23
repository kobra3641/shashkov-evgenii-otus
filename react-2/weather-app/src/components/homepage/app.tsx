import React from "react";
import "./app.css"
import ITown from "../../interfaces/itown";
import {Layout, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import Information from "../information/information";
import {TownContext} from "../../context";
import TownAutoComplete from "./townautocomplete/town.autocomplete";
import TownWeather from "../weather/town.weather";
const {Header, Content, Footer} = Layout;

const App: React.FC<any> = () => {

    const [town, setTown] = React.useState<ITown | null>({} as ITown);

    return (
        <TownContext.Provider value={{town: town, setTown: setTown}}>
            <BrowserRouter>
                <Layout className="m-5">
                    <Header style={{backgroundColor: "#0969A2", height: "auto"}}>
                        <Row justify="center">
                            <Col>
                                <label
                                    style={{color: "#fff"}}
                                    className="m-0">
                                    Inspiration can even be found in the weather forecast.</label>
                            </Col>
                            <Col span={2} className="text-center">
                                <Link to="/">
                                    <i
                                        title="Домашняя страница"
                                        style={{cursor: "pointer", color: "#fff"}}
                                        className="fas fa-home fa-lg">
                                    </i>
                                </Link>
                            </Col>
                            <Col>
                                <TownAutoComplete/>
                            </Col>
                        </Row>
                    </Header>
                    <Content style={{backgroundColor: "#fff"}}>
                        <Switch>
                            <Route path="/" exact={true} render={(props => <Information town={town} {...props}/>)}/>
                            <Route path="/:id?" render={(() => <TownWeather/>)}/>
                        </Switch>
                    </Content>
                    <Footer style={{backgroundColor: "#64A8D1", height: "auto"}}>
                        <Row justify="center">
                            <Col style={{color: "#fff"}}>
                                {(new Date()).toLocaleDateString()}
                            </Col>
                        </Row>
                    </Footer>
                </Layout>
            </BrowserRouter>
        </TownContext.Provider>
    )
}

export default App;
