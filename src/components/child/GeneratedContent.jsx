import React from 'react';
import ReactApexChart from 'react-apexcharts';
import useReactApexChart from '../../hook/useReactApexChart';

const GeneratedContent = () => {
    let { paymentStatusChartSeries, paymentStatusChartOptions } = useReactApexChart();
    return (
        <div className="col-xxl-6">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between">
                        <h6 className="mb-2 fw-bold text-lg mb-0">Generated Content</h6>
                        <select className="form-select form-select-sm w-auto bg-base border text-secondary-light" defaultValue="">
                            <option value="" disabled>
                                Select Timeframe
                            </option>
                            <option value="Today">Today</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                    <ul className="d-flex flex-wrap align-items-center mt-3 gap-3">
                        <li className="d-flex align-items-center gap-2">
                            <span className="w-12-px h-12-px rounded-circle bg-primary-600" />
                            <span className="text-secondary-light text-sm fw-semibold">
                                Word:
                                <span className="text-primary-light fw-bold">500</span>
                            </span>
                        </li>
                        <li className="d-flex align-items-center gap-2">
                            <span className="w-12-px h-12-px rounded-circle bg-yellow" />
                            <span className="text-secondary-light text-sm fw-semibold">
                                Image:
                                <span className="text-primary-light fw-bold">300</span>
                            </span>
                        </li>
                    </ul>
                    <div className="mt-40">
                        <div className="margin-16-minus">
                            <ReactApexChart options={paymentStatusChartOptions} series={paymentStatusChartSeries} type="bar" height={250} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratedContent;