import React, { useEffect, useState,useRef } from "react";
import "datatables.net-dt/js/dataTables.dataTables.js";
import { apiPost } from "../services/client";
import { useSearchParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { WS_URL } from "../config";


const MeterDataTable = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [cardsData, setCardsData] = useState(null);
    const socketRef = useRef(null);
    let activePowerSeries = [{
        name: "Active Power",
        data: cardsData?.data ? [cardsData?.data?.ActivePower_K_W?.R,cardsData?.data?.ActivePower_K_W?.Y,cardsData?.data?.ActivePower_K_W?.B] :[0, 0, 0]
    },{
        name: "Apparent power",
        data: cardsData?.data ? [cardsData?.data?.ApparentPower_KVA?.R, cardsData?.data?.ApparentPower_KVA?.Y, cardsData?.data?.ApparentPower_KVA?.B] : [0,0,0]
    }
    ]

let voltageSeries = [{
    name: "Voltage P-N",
    data: cardsData?.data ? [cardsData?.data?.Voltage_P_N?.R_N,cardsData?.data?.Voltage_P_N?.Y_N,cardsData?.data?.Voltage_P_N?.B_N] :[0, 0, 0]
},{
    name: "Current",
    data: cardsData?.data ? [cardsData?.data?.Current?.R, cardsData?.data?.Current?.Y, cardsData?.data?.Current?.B] : [0,0,0]
}
]

let thdVoltageSeries = [{
    name: "THD Voltage",
    data: cardsData?.data ? [cardsData?.data?.THD_Voltage?.R,cardsData?.data?.THD_Voltage?.Y,cardsData?.data?.THD_Voltage?.B] :[0, 0, 0]
},{
    name: "THD Current",
    data: cardsData?.data ? [cardsData?.data?.THD_Current?.R, cardsData?.data?.THD_Current?.Y, cardsData?.data?.THD_Current?.B] : [0,0,0]
}
]


    let defaultLineChartOptions = {

        legend: {
            show: false
        },
        chart: {
            type: 'area',
            width: '100%',
            height: 270,
            toolbar: {
                show: false
            },
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ["#45B369", "#487fff"],
            lineCap: 'round'
        },
        grid: {
            show: true,
            borderColor: '#D1D5DB',
            strokeDashArray: 1,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            row: {
                colors: undefined,
                opacity: 0.5
            },
            column: {
                colors: undefined,
                opacity: 0.5
            },
            padding: {
                top: -20,
                right: 0,
                bottom: -10,
                left: 0
            },
        },
        fill: {
            type: 'gradient',
            colors: ["#45B369", "#487fff"],
            gradient: {
                shade: 'light',
                type: 'vertical',
                shadeIntensity: 0.5,
                gradientToColors: [undefined, `${"#487fff"}00`], // Apply transparency to both colors
                inverseColors: false,
                opacityFrom: [0.4, 0.4], // Starting opacity for both colors
                opacityTo: [0.3, 0.3], // Ending opacity for both colors
                stops: [0, 100],
            },
        },
        markers: {
            colors: ["#45B369", "#487fff"], // Use two colors for the markers
            strokeWidth: 3,
            size: 0,
            hover: {
                size: 10
            }
        },
        xaxis: {

            categories: ["R","Y","N"],
            tooltip: {
                enabled: false
            },
            labels: {
                formatter: function (value) {
                    return value;
                },
                style: {
                    fontSize: "14px"
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value;
                },
                style: {
                    fontSize: "14px"
                }
            },
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            }
        }
    };


    const getCardsData = async () => {
        const data = { id };
        const res = await apiPost('userapp/meter-cards-data', data);
        if (res?.data?.status === true) {
            setCardsData(res?.data?.data);
            console.log(res?.data?.data);
         
        } else {
            console.log(res?.data?.message);
        }
    };






    let createChartSix = (color1, color2) => {

        let series = [{
            name: 'Frequency',
            data: cardsData?.data ? [cardsData?.data?.Frequency?.R, cardsData?.data?.Frequency?.Y, cardsData?.data?.Frequency?.B] : [0,0,0]
        },{
            name: 'Power Factor',
            data: cardsData?.data ? [cardsData?.data?.PowerFactor?.R, cardsData?.data?.PowerFactor?.Y, cardsData?.data?.PowerFactor?.B] : [0,0,0]
        }]
        let options = {

            legend: {
                show: false
            },
            chart: {
                type: 'area',
                width: '100%',
                height: 270,
                toolbar: {
                    show: false
                },
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 3,
                colors: [color1, color2],
                lineCap: 'round'
            },
            grid: {
                show: true,
                borderColor: '#D1D5DB',
                strokeDashArray: 1,
                position: 'back',
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                row: {
                    colors: undefined,
                    opacity: 0.5
                },
                column: {
                    colors: undefined,
                    opacity: 0.5
                },
                padding: {
                    top: -20,
                    right: 0,
                    bottom: -10,
                    left: 0
                },
            },
            fill: {
                type: 'gradient',
                colors: [color1, color2],
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: [undefined, `${color2}00`], // Apply transparency to both colors
                    inverseColors: false,
                    opacityFrom: [0.4, 0.4], // Starting opacity for both colors
                    opacityTo: [0.3, 0.3], // Ending opacity for both colors
                    stops: [0, 100],
                },
            },
            markers: {
                colors: [color1, color2], // Use two colors for the markers
                strokeWidth: 3,
                size: 0,
                hover: {
                    size: 10
                }
            },
            xaxis: {

                categories: ["R","Y","N"],
                tooltip: {
                    enabled: false
                },
                labels: {
                    formatter: function (value) {
                        return value;
                    },
                    style: {
                        fontSize: "14px"
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return value;
                    },
                    style: {
                        fontSize: "14px"
                    }
                },
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                }
            }
        };
        return <ReactApexChart options={options} series={series} type="area"
            height={270} />
    }



    useEffect(() => {
        getCardsData();
        const wsUrl = WS_URL+`live-data/${id}/`;
        socketRef.current = new WebSocket(wsUrl);
        socketRef.current.onopen = () => {
          console.log("WebSocket connection established");
        }; 
        socketRef.current.onmessage = (event) => {
          const data = JSON.parse(event?.data);
          setCardsData(data);
        
        };
        socketRef.current.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
        socketRef.current.onclose = (event) => {
          console.log("WebSocket connection closed:", event.code, event.reason);
        };
    
        
        return () => {
          if (socketRef.current) {
            socketRef.current.close();
            console.log("WebSocket connection disconnected");
          }
        };
    }, []);

    return (
        <>
        <section className="row gy-4 mt-1 mb-24">
            <div className="col-xxl-8 card-dash">
                <div className="d-flex flex-wrap gap-3">
                    {/* Card 1 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Voltage P-N</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R-N</b>
                                    <p className="text-warning">{cardsData?.data?.Voltage_P_N?.R_N ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y-N</b>
                                    <p className="text-primary">{cardsData?.data?.Voltage_P_N?.Y_N ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B-N</b>
                                    <p className="text-success">{cardsData?.data?.Voltage_P_N?.B_N ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Voltage P-P</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R-N</b>
                                    <p className="text-warning">{cardsData?.data?.Voltage_P_P?.R_N ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y-N</b>
                                    <p className="text-primary">{cardsData?.data?.Voltage_P_P?.Y_N ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B-N</b>
                                    <p className="text-success">{cardsData?.data?.Voltage_P_P?.B_N ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Current</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.Current?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.Current?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.Current?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Frequency</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.Frequency?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.Frequency?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.Frequency?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Active Power (KW)</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.ActivePower_K_W?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.ActivePower_K_W?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.ActivePower_K_W?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 6 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Apparent Power (KVA)</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.ApparentPower_KVA?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.ApparentPower_KVA?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.ApparentPower_KVA?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 7 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Power Factor</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.PowerFactor?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.PowerFactor?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.PowerFactor?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 8 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">Phase Angle</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.PhaseAngle?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.PhaseAngle?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.PhaseAngle?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 9 */}
                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">THD Voltage</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.THD_Voltage?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.THD_Voltage?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.THD_Voltage?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="card flex-grow-1" style={{ flex: "1 1 calc(33.33% - 1rem)", maxWidth: "calc(33.33% - 1rem)" }}>
                        <div className="card-inner p-3">
                            <div className="col">
                                <h6 className="mb-2 fw-bold text-lg">THD Current</h6>
                            </div>
                            <div className="col d-flex justify-content-between mt-3">
                                <div className="col">
                                    <b>R</b>
                                    <p className="text-warning">{cardsData?.data?.THD_Current?.R ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>Y</b>
                                    <p className="text-primary">{cardsData?.data?.THD_Current?.Y ?? 0}</p>
                                </div>
                                <div className="col">
                                    <b>B</b>
                                    <p className="text-success">{cardsData?.data?.THD_Current?.B ?? 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



<div className="col-xxl-4 col-md-6">
            
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Frequency vs power factor</h6>
                </div>
                <div className="card-body  d-flex justify-content-center align-items-center">
                {createChartSix('#45B369', '#487fff')}
                </div>
            </div>
        </div>

        </section>



        <section className="row gy-4 mt-1">

        <div className="col-lg-4 col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Active power vs Apperent Power</h6>
                </div>
                <div className="card-body p-24">{ cardsData?
                    <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions} series={activePowerSeries} type="area"
                        height={264} /> :<></>
                }
                </div>
            </div>
        </div>


        <div className="col-lg-4 col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Voltage(P-N) vs Current</h6>
                </div>
                <div className="card-body p-24">{ cardsData?
                    <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions} series={voltageSeries} type="area"
                        height={264} /> :<></>
                }
                </div>
            </div>
        </div>
        <div className="col-lg-4 col-md-6">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">THD Voltage vs THD Current</h6>
                </div>
                <div className="card-body p-24">{ cardsData?
                    <ReactApexChart id="defaultLineChart" className="apexcharts-tooltip-style-1" options={defaultLineChartOptions} series={thdVoltageSeries} type="area"
                        height={264} /> :<></>
                }
                </div>
            </div>
        </div>
        </section>

        </>
    );
};

export default MeterDataTable;
