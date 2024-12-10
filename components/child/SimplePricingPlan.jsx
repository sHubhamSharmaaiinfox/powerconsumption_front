import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const SimplePricingPlan = () => {
    return (
        <div className="card h-100 p-0 radius-12 overflow-hidden mt-24">
            <div className="card-header border-bottom bg-base py-16 px-24">
                <h6 className="mb-0 text-lg">Simple Pricing Plan</h6>
            </div>
            <div className="card-body p-40">
                <div className="row justify-content-center">
                    <div className="col-xxl-10">
                        <div className="text-center">
                            <h4 className="mb-16">Simple, Transparent Pricing</h4>
                            <p className="mb-0 text-lg text-secondary-light">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit dolor
                                posuere vel venenatis eu sit massa volutpat.
                            </p>
                        </div>
                        <div className="pricing-tab">
                            <div className="form-switch switch-primary d-flex align-items-center gap-3 mt-40 justify-content-center">
                                <label
                                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                                    htmlFor="yes"
                                >
                                    Monthly
                                </label>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="yes"
                                />
                                <label
                                    className="form-check-label line-height-1 fw-medium text-secondary-light"
                                    htmlFor="yes"
                                >
                                    Annually
                                </label>
                            </div>
                        </div>
                        <div className="row gy-4">
                            <div className="col-xxl-4 col-sm-6">
                                <div className="pricing-plan position-relative radius-24 overflow-hidden border bg-base">
                                    <div className="d-flex align-items-center gap-16">
                                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-primary-50">
                                            <img src="assets/images/pricing/price-icon4.png" alt="" />
                                        </span>
                                        <div className="">
                                            <span className="fw-medium text-md text-secondary-light">
                                                For individuals
                                            </span>
                                            <h6 className="mb-0">Basic</h6>
                                        </div>
                                    </div>
                                    <p className="mt-16 mb-0 text-secondary-light mb-28">
                                        Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                                        adipiscing elit.{" "}
                                    </p>
                                    <h3 className="mb-24">
                                        $99{" "}
                                        <span className="fw-medium text-md text-secondary-light">
                                            /monthly
                                        </span>{" "}
                                    </h3>
                                    <span className="mb-20 fw-medium">What’s included</span>
                                    <ul>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                All analytics features
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Up to 250,000 tracked visits
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Normal support
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Up to 3 team members
                                            </span>
                                        </li>
                                    </ul>
                                    <button

                                        className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"

                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-sm-6">
                                <div className="pricing-plan featured-item position-relative radius-24 overflow-hidden border bg-primary-600 text-white z-1">
                                    <img
                                        src="assets/images/pricing/pricing-shape.png"
                                        alt=""
                                        className="position-absolute end-0 top-10 z-n1"
                                    />
                                    <span className="bg-white bg-opacity-25 text-white radius-24 py-8 px-24 text-sm position-absolute end-0 top-0 z-1 rounded-start-top-0 rounded-end-bottom-0">
                                        Popular
                                    </span>
                                    <div className="d-flex align-items-center gap-16">
                                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-base">
                                            <img src="assets/images/pricing/price-icon2.png" alt="" />
                                        </span>
                                        <div className="">
                                            <span className="fw-medium text-md text-white">
                                                For startups
                                            </span>
                                            <h6 className="mb-0 text-white">Pro</h6>
                                        </div>
                                    </div>
                                    <p className="mt-16 mb-0 text-white mb-28">
                                        Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                                        adipiscing elit.{" "}
                                    </p>
                                    <h3 className="mb-24 text-white">
                                        $199{" "}
                                        <span className="fw-medium text-md text-white">/monthly</span>{" "}
                                    </h3>
                                    <span className="mb-20 fw-medium">What’s included</span>
                                    <ul>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-lg   "
                                                />
                                            </span>
                                            <span className="text-white text-lg">
                                                All analytics features
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-lg   "
                                                />
                                            </span>
                                            <span className="text-white text-lg">
                                                Up to 250,000 tracked visits
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-lg   "
                                                />
                                            </span>
                                            <span className="text-white text-lg">Normal support</span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-white rounded-circle text-primary-600">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-lg   "
                                                />
                                            </span>
                                            <span className="text-white text-lg">
                                                Up to 3 team members
                                            </span>
                                        </li>
                                    </ul>
                                    <button

                                        className="bg-white text-primary-600 text-white text-center border border-white text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"

                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>
                            <div className="col-xxl-4 col-sm-6">
                                <div className="pricing-plan position-relative radius-24 overflow-hidden border bg-base">
                                    <div className="d-flex align-items-center gap-16">
                                        <span className="w-72-px h-72-px d-flex justify-content-center align-items-center radius-16 bg-primary-50">
                                            <img src="assets/images/pricing/price-icon5.png" alt="" />
                                        </span>
                                        <div className="">
                                            <span className="fw-medium text-md text-secondary-light">
                                                For big companies
                                            </span>
                                            <h6 className="mb-0">Enterprise</h6>
                                        </div>
                                    </div>
                                    <p className="mt-16 mb-0 text-secondary-light mb-28">
                                        Lorem ipsum dolor sit amet doloroli sitiol conse ctetur
                                        adipiscing elit.{" "}
                                    </p>
                                    <h3 className="mb-24">
                                        $399{" "}
                                        <span className="fw-medium text-md text-secondary-light">
                                            /monthly
                                        </span>{" "}
                                    </h3>
                                    <span className="mb-20 fw-medium">What’s included</span>
                                    <ul>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                All analytics features
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Up to 250,000 tracked visits
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16 mb-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Normal support
                                            </span>
                                        </li>
                                        <li className="d-flex align-items-center gap-16">
                                            <span className="w-24-px h-24-px d-flex justify-content-center align-items-center bg-primary-600 rounded-circle">
                                                <Icon
                                                    icon="iconamoon:check-light"
                                                    className="text-white text-lg "
                                                />
                                            </span>
                                            <span className="text-secondary-light text-lg">
                                                Up to 3 team members
                                            </span>
                                        </li>
                                    </ul>
                                    <button

                                        className="bg-primary-600 bg-hover-primary-700 text-white text-center border border-primary-600 text-sm btn-sm px-12 py-10 w-100 radius-8 mt-28"

                                    >
                                        Get started
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimplePricingPlan