import React, { Component } from 'react';
import {
    // G2,
    Chart,
    Geom,
    // Axis,
    Tooltip,
    Coord,
    // Label,
    // Legend,
    // View,
    // Guide,
    Shape,
    // Facet,
    // Util
  } from "bizcharts";
import DataSet from "@antv/data-set";

class HotWords extends Component {
    state = {
        dv: null
    }

    componentDidMount() {
        // requestAnimationFrame(() => {
          this.initHotWords();
          this.dataRenderChart();
        // });
        // window.addEventListener('resize', this.resize, { passive: true });
    }

    componentDidUpdate(preProps) {
        const { data } = this.props;
        if (JSON.stringify(preProps.data) !== JSON.stringify(data)) {
            this.dataRenderChart(this.props);
        }
    }

    componentWillUnmount() {
        this.isUnmount = true;
        // window.cancelAnimationFrame(this.requestRef);
        // window.removeEventListener('resize', this.resize);
    }

    saveRootRef = node => {
        this.root = node;
    };
    
    initHotWords = () => {
        function getTextAttrs(cfg) {
            return Object.assign(
                {},
                {
                  fillOpacity: cfg.opacity,
                  fontSize: cfg.origin._origin.size,
                  rotate: cfg.origin._origin.rotate,
                  text: cfg.origin._origin.text,
                  textAlign: "center",
                  fontFamily: cfg.origin._origin.font,
                  fill: cfg.color,
                  textBaseline: "Alphabetic"
                },
                cfg.style
            );
          } 

          // 给point注册一个词云的shape
          Shape.registerShape("point", "cloud", {
            drawShape(cfg, container) {
              const attrs = getTextAttrs(cfg);
              return container.addShape("text", {
                attrs: Object.assign(attrs, {
                  x: cfg.x,
                  y: cfg.y
                })
              });
            }
          });
    }

    dataRenderChart = (nextProps) => {
        const { data, height } = nextProps || this.props;

        if (data.length < 1) {
            return;
        }

        const h = height;
        const w = this.root.offsetWidth;

        const dv = new DataSet.View().source(data);
        const range = dv.range("price");
        const min = range[1];
        const max = range[0];
        dv.transform({
            type: "tag-cloud",
            fields: ["type", "price"],
            size: [w, 161],
            font: "Verdana",
            padding: 0,
            timeInterval: 5000,
    
            // max execute time
            // rotate() {
            //     let random = ~~(Math.random() * 4) % 4;

            //     if (random === 2) {
            //     random = 0;
            //     }

            //     return random * 90; // 0, 90, 270
            // },
            rotate() {
                return 0;
              },

            fontSize(d) {
                if (d.value) {
                    const divisor = (max - min) !== 0 ? (max - min) : 1;
                    return ( (((d.value - min) / divisor) > 100)? 50:(d.value - min) / divisor) * 2 + 12;
                }

                return 0;
            }
        });

        if (this.isUnmount) {
            return;
        }
        this.setState({ dv, h, w });
    }
    render() {
        const { height } = this.props;
        const { dv, w } = this.state;
        return (
            <div>
                <div
                    ref={this.saveRootRef}
                    style={{ width: '100%', height }}    
                >
                    <Chart
                        width={w}
                        height={161}
                        data={dv}
                        scale={{
                            x: { nice: false },
                            y: { nice: false }
                          }}
                        padding={0}
                        forceFit
                        >
                        <Tooltip showTitle={false} />
                        <Coord reflect="y" />
                        <Geom
                            type="point"
                            position="x*y"
                            color="category"
                            shape="cloud"
                            tooltip={[
                                'text*value',
                                function trans(text, value) {
                                return { name: text, value };
                                },
                            ]}
                        />
                    </Chart>
                </div>
            </div>
        );
    }
}

export default HotWords;