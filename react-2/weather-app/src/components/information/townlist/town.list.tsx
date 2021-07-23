import {Col, Row} from "antd";
import React from "react";
import ITown from "../../../interfaces/itown";
import TownCard from "./towncard/town.card";

const TownList: React.FC<any> = ({towns, deleteTown}) => {
    return (
        <Row justify="center">
            {towns.map((town: ITown) =>
                (<Col key={town.name}>
                    <TownCard town={town} deleteTown={deleteTown}></TownCard>
                </Col>)
            )}
        </Row>
    )
}

export default TownList;
