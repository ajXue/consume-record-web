import React, { Component } from 'react';
import moment from 'moment';

import { Row, Col, Tabs, DatePicker } from 'antd';
import { Chart, Geom, Axis, Tooltip} from "bizcharts";
import { getConsumeByDateApi } from "../../../../api/getData"
import "./index.scss"

const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

class CosumeList extends Component {
    state = {
        chartsData: []
    }

    componentWillMount() {
        this.getConsumeByDateFn(this.defaultDateApiFn().startDate, this.defaultDateApiFn().endDate);
    }

    callback = () => {
              
    }

    /**
     * 按照日期查询消费记录 
     */
    getConsumeByDateFn(startTime, endTime) {
        getConsumeByDateApi({
          startTime,
          endTime
        }).then( res => {
            if(res.code === "1") {
                let resData = res.data.resData, arr = [];
                for(let item in resData) {
                    let num = 0; 
                    num = resData[item].reduce((total, num) => {
                       return total + num.price;
                    }, 0)
                    arr.push({"date": item, "price": num})
                }
                this.setState({
                  chartsData: arr
                })
            }
        })
    }

    /**
     * 接口需要的初始化日期 - 本月
     */
    defaultDateApiFn() {
      return {
        startDate: moment().startOf('month').format('YYYY-MM-DD 00:00:01'),
        endDate: moment().endOf('month').format('YYYY-MM-DD 23:59:59')
      }
    }

    /**
     * defaultDateFn()
     * 日期控件的初始日期时间 - 本月 
     */
    defaultDateFn() { 
      let [startDate, endDate] = [
        moment(moment().startOf('month').format('YYYY-MM-DD 00:00:01'), "YYYY-MM-DD HH:mm:ss"),
        moment(moment().endOf('month').format('YYYY-MM-DD 23:59:59'), "YYYY-MM-DD HH:mm:ss"),
      ]
      return {
        startDate,
        endDate
      };
    }

    /**
     * 日期onchange 
     */
    rangePickerChange = (date, dateString) => {
        this.getConsumeByDateFn(dateString[0], dateString[1])
    }

    /** 
     * 日期按钮切换
     * @param { String } d day:今日、week：本周、year：本年
     */
    dateBtnChange = d => {
        switch(d) {
          case "day":
            break;
          case "week":
            break;
          case "year":
            break;
          default:

            break;
        }
    }

    /**
     * Tabs添加日期控件 
     */
    datePickerDataFn() {
      return (
        <div>
          <span className="cs-pointer" style={{marginLeft: "24px"}} onClick={this.dateBtnChange("day")}>今日</span>
          <span className="cs-pointer" style={{marginLeft: "24px"}} onClick={this.dateBtnChange("week")}>本周</span>
          <span className="cs-pointer" style={{marginLeft: "24px"}} onClick={this.dateBtnChange("year")}>本月</span>
          <RangePicker defaultValue={[this.defaultDateFn().startDate, this.defaultDateFn().endDate]} onChange={this.rangePickerChange}  style={{marginLeft: "24px", width: "256px"}} />
        </div>
      )
    }


    render() {
        const defaultDate = {
          startDate: moment().startOf('month').format('YYYY-MM-DD 00:00:01'),
          endDate: moment().endOf('month').format('YYYY-MM-DD 23:59:59')
        }
        const cols = {
            sales: { tickInterval: 20}
        };
        return (
            <div className="CosumeList-container">
              <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={this.datePickerDataFn()}>
                <TabPane tab="消费额" key="1">
                    <Row>
                        <Col xl={{span: 16}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}}>
                            <Chart height={250} data={this.state.chartsData} scale={cols} forceFit>
                                <Axis name="year" />
                                <Axis name="sales" min={0} />
                                <Tooltip
                                    crosshairs={{
                                      type: "y"
                                    }}
                                />
                                <Tooltip showTitle={false} crosshairs={false} />
                                <Geom type="interval" position="date*price" tooltip={tooltip} />
                            </Chart>
                        </Col>
                        <Col xl={{span: 8}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}}>
                        
                        </Col>
                    </Row>

                </TabPane>
                <TabPane tab="访问额" key="2">
                  
                </TabPane>
              </Tabs>
                
                
            </div>
        );
    }
}

export default CosumeList;