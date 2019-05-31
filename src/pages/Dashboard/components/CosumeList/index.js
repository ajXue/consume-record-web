import React, { Component } from 'react';
import moment from 'moment';

import { Row, Col, Tabs, DatePicker } from 'antd';
import { Chart, Geom, Axis, Tooltip} from "bizcharts";
import { getConsumeByDateApi } from "../../../../api/getData"
import "./index.scss"

import SortList from "../../../../components/SortList"
import HotWords from "../../../../components/Charts/HotWords"

const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;

class CosumeList extends Component {
    state = {
        loading: true,
        currentSelected: "month",
        chartsData: [],
        listData: [],
        listDataCut: []
    }

    componentDidMount() {
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
            this.setState({ loading: false });
            if(res.code === "1") {
                let [chartArr, listArr, resData, typeData] = [[], [], res.data.resData, res.data.typeData];

                // 组装图表数据
                if(Object.keys(resData).length !== 0) {
                  for(let item in resData) {
                      let num = 0; 
                      num = resData[item].reduce((total, num) => {
                         return total + num.price;
                      }, 0)
                      chartArr.push({"date": item.replace(/-/g, ""), "price": num})
                  }
                  chartArr = chartArr.reverse();
                } else {
                  chartArr = [{"date": moment().format("YYYY-MM-DD"), "price": 0}];
                }

                // 组装列表数据
                if(Object.keys(typeData).length !== 0) {
                  Object.keys(typeData).forEach(item => {
                    let price = typeData[item].reduce((t, n) => {
                        return (parseFloat(t + n.price).toFixed(2));
                    }, 0)
                    listArr.push({"type": item, "textName": typeData[item][0]["textName"], "price": price})
                  })
                } else {
                  listArr = [{"type": "", "textName": "暂无数据", "price": 0}];
                }

                // 排序（降序）
                listArr.sort(function(a, b) { return b.price - a.price })
                this.setState({
                  chartsData: chartArr,
                  listData: listArr,
                  listDataCut: [...listArr].slice(0, 7)
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
        this.setState({currentSelected: d});
        switch(d) {
          case "day":
            this.getConsumeByDateFn(moment().format('YYYY-MM-DD 00:00:01'), moment().format('YYYY-MM-DD 23:59:59'));
            break;
          case "week":
            this.getConsumeByDateFn(moment().subtract(7, "days").format('YYYY-MM-DD 00:00:01'), moment().format('YYYY-MM-DD 23:59:59'));
            break;
          case "month":
            this.getConsumeByDateFn(this.defaultDateApiFn().startDate, this.defaultDateApiFn().endDate);
            break;
          default:
            this.getConsumeByDateFn(this.defaultDateApiFn().startDate, this.defaultDateApiFn().endDate);
            break;
        }
    }

    /**
     * Tabs添加日期控件 
     */
    datePickerDataFn() {
      return (
        <div>
          <span className={`cs-pointer ${this.state.currentSelected === "day"? "isActived": ""}`} style={{marginLeft: "24px"}} onClick={() => this.dateBtnChange("day")}>今日</span>
          <span className={`cs-pointer ${this.state.currentSelected === "week"? "isActived": ""}`} style={{marginLeft: "24px"}} onClick={() => this.dateBtnChange("week")}>本周</span>
          <span className={`cs-pointer ${this.state.currentSelected === "month"? "isActived": ""}`} style={{marginLeft: "24px"}} onClick={() => this.dateBtnChange("month")}>本月</span>
          <RangePicker defaultValue={[this.defaultDateFn().startDate, this.defaultDateFn().endDate]} onChange={this.rangePickerChange}  style={{marginLeft: "24px", width: "256px"}} />
        </div>
      )
    }


    render() {
        // const defaultDate = {
        //   startDate: moment().startOf('month').format('YYYY-MM-DD 00:00:01'),
        //   endDate: moment().endOf('month').format('YYYY-MM-DD 23:59:59')
        // }
        const cols = {
            sales: { tickInterval: 20},
            date: { tickCount:7},
        };
        return (
            <div className="CosumeList-container">
              <Tabs defaultActiveKey="1" onChange={this.callback} tabBarExtraContent={this.datePickerDataFn()}>
                <TabPane tab="消费额/日" key="1">
                    <Row>
                        <Col xl={{span: 16}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}}>
                            <div style={{marginBottom: "20px"}}>
                              <h4>消费趋势</h4>
                            </div>
                            <Chart padding={[ 20, 40, 50, 40]} height={250} data={this.state.chartsData} scale={cols} forceFit>
                                <Axis name="year" />
                                <Axis name="sales" min={0} />
                                <Tooltip
                                    crosshairs={{
                                      type: "y"
                                    }}
                                />
                                <Geom type="interval" size={20} position="date*price" />
                            </Chart>
                        </Col>
                        <Col xl={{span: 8}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}}>
                          <div className="sortList">
                            <div style={{marginBottom: "20px"}}>
                              <h4>消费排行</h4>
                            </div>
                            <SortList sortListData={this.state.listDataCut} />
                          </div>  
                        </Col>
                    </Row>

                </TabPane>
                <TabPane tab="消费额/月" key="2">
                    <Row>
                        <Col xl={{span: 16}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}}>
                            <div style={{marginBottom: "20px"}}>
                              <h4>消费趋势</h4>
                            </div>
                            <Chart padding={[ 20, 40, 50, 40]} height={250} data={this.state.chartsData} scale={cols} forceFit>
                                <Axis name="year" />
                                <Axis name="sales" min={0} />
                                <Tooltip
                                    crosshairs={{
                                      type: "y"
                                    }}
                                />
                                <Geom type="interval" size={20} position="date*price" />
                            </Chart>
                        </Col>
                        <Col xl={{span: 8}} lg={{span: 12}} md={{span: 12}} sm={{span: 24}}>
                          <div className="sortList">
                            <div style={{marginBottom: "20px"}}>
                              <h4>消费排行</h4>
                            </div>
                            {/* <SortList sortListData={this.state.listDataCut} /> */}
                            <HotWords data={this.state.listData} />
                          </div>  
                        </Col>
                    </Row>          
                </TabPane>
              </Tabs>
                
            </div>
        );
    }
}

export default CosumeList;