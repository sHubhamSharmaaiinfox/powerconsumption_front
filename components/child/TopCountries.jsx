import React, { useEffect } from 'react';
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
const TopCountries = () => {

    useEffect(() => {
        const map = new jsVectorMap({
            selector: "#map",
            map: 'world', // Use the map name you installed
            backgroundColor: 'transparent',
            borderColor: '#fff',
            borderOpacity: 0.25,
            borderWidth: 0,
            color: '#000000',
            regionStyle: {
                initial: {
                    fill: '#D1D5DB',
                },
            },
            markerStyle: {
                initial: {
                    r: 5,
                    'fill': '#fff',
                    'fill-opacity': 1,
                    'stroke': '#000',
                    'stroke-width': 1,
                    'stroke-opacity': 0.4
                },
            },
            markers: [
                { coords: [35.8617, 104.1954], name: 'China : 250' },
                { coords: [25.2744, 133.7751], name: 'Australia : 250' },
                { coords: [36.77, -119.41], name: 'USA : 82%' },
                { coords: [55.37, -3.41], name: 'UK : 250' },
                { coords: [25.20, 55.27], name: 'UAE : 250' },
            ],
            series: {
                regions: [{
                    attribute: "fill",

                    scale: {
                        "US": '#487FFF ',
                        "SA": '#487FFF',
                        "AU": '#487FFF',
                        "CN": '#487FFF',
                        "GB": '#487FFF',
                    },
                    values: {
                        // But when dealing with regions's series you should specify the region key.
                        US: "US",
                        SA: "SA",
                        AU: "AU",
                        CN: "CN",
                        GB: "GB",
                    }
                }]
            },
            hoverOpacity: null,
            normalizeFunction: 'linear',
            zoomOnScroll: false,
            scaleColors: ['#000000', '#000000'],
            selectedColor: '#000000',
            selectedRegions: [],
            enableZoom: false,
            hoverColor: '#fff',
        });

        // Cleanup the map instance when the component unmounts
        return () => {
            map && map.destroy();
        };
    }, []);
    return (
        <div className="col-xxl-6 col-xl-12">
            <div className="card h-100">
                <div className="card-body">
                    <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between mb-20">
                        <h6 className="mb-2 fw-bold text-lg mb-0">Top Countries</h6>
                        <select className="form-select form-select-sm w-auto bg-base border text-secondary-light" defaultValue="Today">
                            <option value="Today">Today</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                    <div className="row gy-4">
                        <div className="col-lg-6">
                            {/* world-map */}
                            <div id="map" className="h-100 border radius-8"></div>
                        </div>
                        <div className="col-lg-6">
                            <div className="h-100 border p-16 pe-0 radius-8">
                                <div className="max-h-266-px overflow-y-auto scroll-sm pe-16">
                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12 pb-2">
                                        <div className="d-flex align-items-center w-100">
                                            <img
                                                src="assets/images/flags/flag1.png"
                                                alt=""
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="text-sm mb-0">USA</h6>
                                                <span className="text-xs text-secondary-light fw-medium">
                                                    1,240 Users
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <div className="w-100 max-w-66 ms-auto">
                                                <div
                                                    className="progress progress-sm rounded-pill"
                                                    role="progressbar"
                                                    aria-label="Success example"
                                                    aria-valuenow={25}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary-600 rounded-pill"
                                                        style={{ width: "80%" }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-secondary-light font-xs fw-semibold">
                                                80%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12 pb-2">
                                        <div className="d-flex align-items-center w-100">
                                            <img
                                                src="assets/images/flags/flag2.png"
                                                alt=""
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="text-sm mb-0">Japan</h6>
                                                <span className="text-xs text-secondary-light fw-medium">
                                                    1,240 Users
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <div className="w-100 max-w-66 ms-auto">
                                                <div
                                                    className="progress progress-sm rounded-pill"
                                                    role="progressbar"
                                                    aria-label="Success example"
                                                    aria-valuenow={25}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                >
                                                    <div
                                                        className="progress-bar bg-orange rounded-pill"
                                                        style={{ width: "60%" }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-secondary-light font-xs fw-semibold">
                                                60%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12 pb-2">
                                        <div className="d-flex align-items-center w-100">
                                            <img
                                                src="assets/images/flags/flag3.png"
                                                alt=""
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="text-sm mb-0">France</h6>
                                                <span className="text-xs text-secondary-light fw-medium">
                                                    1,240 Users
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <div className="w-100 max-w-66 ms-auto">
                                                <div
                                                    className="progress progress-sm rounded-pill"
                                                    role="progressbar"
                                                    aria-label="Success example"
                                                    aria-valuenow={25}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                >
                                                    <div
                                                        className="progress-bar bg-yellow rounded-pill"
                                                        style={{ width: "49%" }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-secondary-light font-xs fw-semibold">
                                                49%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12 pb-2">
                                        <div className="d-flex align-items-center w-100">
                                            <img
                                                src="assets/images/flags/flag4.png"
                                                alt=""
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="text-sm mb-0">Germany</h6>
                                                <span className="text-xs text-secondary-light fw-medium">
                                                    1,240 Users
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <div className="w-100 max-w-66 ms-auto">
                                                <div
                                                    className="progress progress-sm rounded-pill"
                                                    role="progressbar"
                                                    aria-label="Success example"
                                                    aria-valuenow={25}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                >
                                                    <div
                                                        className="progress-bar bg-success-main rounded-pill"
                                                        style={{ width: "100%" }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-secondary-light font-xs fw-semibold">
                                                100%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3 mb-12 pb-2">
                                        <div className="d-flex align-items-center w-100">
                                            <img
                                                src="assets/images/flags/flag5.png"
                                                alt=""
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="text-sm mb-0">South Korea</h6>
                                                <span className="text-xs text-secondary-light fw-medium">
                                                    1,240 Users
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <div className="w-100 max-w-66 ms-auto">
                                                <div
                                                    className="progress progress-sm rounded-pill"
                                                    role="progressbar"
                                                    aria-label="Success example"
                                                    aria-valuenow={25}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                >
                                                    <div
                                                        className="progress-bar bg-info-main rounded-pill"
                                                        style={{ width: "30%" }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-secondary-light font-xs fw-semibold">
                                                30%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between gap-3">
                                        <div className="d-flex align-items-center w-100">
                                            <img
                                                src="assets/images/flags/flag1.png"
                                                alt=""
                                                className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12"
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="text-sm mb-0">USA</h6>
                                                <span className="text-xs text-secondary-light fw-medium">
                                                    1,240 Users
                                                </span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 w-100">
                                            <div className="w-100 max-w-66 ms-auto">
                                                <div
                                                    className="progress progress-sm rounded-pill"
                                                    role="progressbar"
                                                    aria-label="Success example"
                                                    aria-valuenow={25}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                >
                                                    <div
                                                        className="progress-bar bg-primary-600 rounded-pill"
                                                        style={{ width: "80%" }}
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-secondary-light font-xs fw-semibold">
                                                80%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopCountries;