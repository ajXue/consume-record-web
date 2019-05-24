import React, { Component } from 'react';

import { Row, Col } from 'antd';

import { G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import "./index.scss"

class CosumeList extends Component {
    render() {
        const data = [
            {
              year: "1951 年",
              sales: 38
            },
            {
              year: "1952 年",
              sales: 52
            },
            {
              year: "1956 年",
              sales: 61
            },
            {
              year: "1957 年",
              sales: 145
            },
            {
              year: "1958 年",
              sales: 48
            },
            {
              year: "1959 年",
              sales: 38
            },
            {
              year: "1960 年",
              sales: 38
            },
            {
              year: "1962 年",
              sales: 38
            }
          ];
          const cols = {
            sales: {
              tickInterval: 20
            }
          };
        return (
            <div className="CosumeList-container">
                <Row>
                    <Col xl={{span: 16}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}} sm={{span: 24}}>
                        <Chart height={400} data={data} scale={cols} forceFit>
                            <Axis name="year" />
                            <Axis name="sales" />
                            <Tooltip
                                crosshairs={{
                                type: "y"
                                }}
                            />
                            <Geom type="interval" position="year*sales" />
                        </Chart>
                    </Col>
                    <Col xl={{span: 8}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}} sm={{span: 24}}>
                    
                    </Col>
                </Row>
                
            </div>
        );
    }
}

export default CosumeList;