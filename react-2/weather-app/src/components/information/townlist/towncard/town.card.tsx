import React, {useContext} from "react";
import {Card, Col, Row} from "antd";
import {IWeather} from "../../../../interfaces/iweather";
import DataService from "../../../../services/data.service";
import {Async} from "react-async";
import {Link} from "react-router-dom";
import {TownContext} from "../../../../context";

const {Meta} = Card
const dataService = new DataService();

const TownCard: React.FC<any> = ({town, deleteTown}) => {

    const townContext = useContext(TownContext);

    const loadData = () => dataService.getWeather(false, town).then((data: IWeather) => {
        return data;
    });

    return(
        <Row>
            <Async promiseFn={loadData}>
                {({ data, isLoading }) => {
                    if(isLoading) return (<label>Загрузка...</label>)
                    if(data) return (
                        <Card style={{width: 240, border: "1px solid #3D9AD1"}}
                              className="m-2"
                              cover={
                                  <img
                                      alt="example"
                                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                  />
                              }
                              actions={[
                                  <Col>
                                      <Link to={`/${(town.name)}`}
                                            onClick={() => {
                                                townContext.setTown(town)
                                            }}>
                                          <i style={{color: "#3D9AD1"}}
                                             title="Подробнее"
                                             className="fas fa-align-right">

                                          </i>
                                      </Link>
                                  </Col>,
                                  <Col onClick={() => deleteTown(town)}>
                                      <i title="Удалить"
                                         style={{color: "#3D9AD1"}}
                                         className="fas fa-times"/>
                                  </Col>
                              ]}>
                            <Meta
                                title={town.name}
                                description={'Темература: ' + Math.floor(data.main.temp)}>
                            </Meta>
                        </Card>
                        )
                }}
            </Async>
        </Row>
    );

}

export default TownCard;
