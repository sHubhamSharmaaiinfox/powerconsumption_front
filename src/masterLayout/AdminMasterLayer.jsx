import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { apiGet, apiPost } from "../services/client";
import Avatar from "react-avatar";

const AdminMasterLayer = ({ children }) => {
    let [sidebarActive, seSidebarActive] = useState(false);
    let [mobileMenu, setMobileMenu] = useState(false);
    const location = useLocation(); // Hook to get the current route
     const [adminData, setAdminData] = useState(null);
     const[notificationData, setnotificationData] = useState(null)
    const Logout = () => {
        localStorage.removeItem("token");

    };




    useEffect(() => {
        // Function to handle dropdown clicks
        const handleDropdownClick = (event) => {
            event.preventDefault();
            const clickedLink = event.currentTarget;
            const clickedDropdown = clickedLink.closest('.dropdown');

            if (!clickedDropdown) return;

            const isActive = clickedDropdown.classList.contains('open');

            // Close all dropdowns
            const allDropdowns = document.querySelectorAll('.sidebar-menu .dropdown');
            allDropdowns.forEach((dropdown) => {
                dropdown.classList.remove('open');
            });

            // Toggle the clicked dropdown
            if (!isActive) {
                clickedDropdown.classList.add('open');
            }
        };

        // Attach click event listeners to all dropdown triggers
        const dropdownTriggers = document.querySelectorAll('.sidebar-menu .dropdown > a, .sidebar-menu .dropdown > Link');

        dropdownTriggers.forEach((trigger) => {
            trigger.addEventListener('click', handleDropdownClick);
        });

        // Function to open submenu based on current route
        const openActiveDropdown = () => {
            const allDropdowns = document.querySelectorAll('.sidebar-menu .dropdown');
            allDropdowns.forEach((dropdown) => {
                const submenuLinks = dropdown.querySelectorAll('.sidebar-submenu li a');
                submenuLinks.forEach((link) => {
                    if (link.getAttribute('href') === location.pathname || link.getAttribute('to') === location.pathname) {
                        dropdown.classList.add('open');
                    }
                });
            });
        };

        // Open the submenu that contains the open route
        openActiveDropdown();



        // Cleanup event listeners on unmount
        return () => {
            dropdownTriggers.forEach((trigger) => {
                trigger.removeEventListener('click', handleDropdownClick);
            });

        };
    }, [location.pathname]);


    let sidebarControl = () => {
        seSidebarActive(!sidebarActive);
    };

    let mobileMenuControl = () => {
        setMobileMenu(!mobileMenu);
    };


  
     const getAdminDetails = async () => {
            try {
                const res = await apiGet("admin/admin-profile");
                if (res?.data?.status === true) {
                    setAdminData(res?.data?.data);
                   
                } else {
                    console.error(res?.data?.message);
                }
            } catch (error) {
                console.error(error);
            }
        };
    

        const PaymentNotification = async () => {
          
            try {
                const res = await apiGet("admin/payment-notifications");
                if (res?.data?.status === true) {
                    console.log("payment-data",res);
                    setnotificationData(res?.data?.data);
                    
                   
                } else {
                    console.error(res?.data?.message);
                }
            } catch (error) {
                console.error(error);
            }
        };


        useEffect(() => {
            PaymentNotification();
            getAdminDetails();
        }, []);
    

       
    return (
    
        <section className={mobileMenu ? "overlay active" : "overlay "}>
            <aside className={sidebarActive ? "sidebar active " : mobileMenu ? "sidebar sidebar-open" : "sidebar"}>
                <button onClick={mobileMenuControl} type="button" className="sidebar-close-btn">
                    <Icon icon="radix-icons:cross-2" />
                </button>
                <div>
                    <Link to="/" className="sidebar-logo">
                        <img
                            src="assets/images/ems-logo.png"
                            alt="site logo"
                            className="light-logo"
                        />
                        <img
                              src="assets/images/ems-logo.png"
                            alt="site logo"
                            className="dark-logo"
                        />
                        <img
                            src="assets/images/power-favicon.png"
                            alt="site logo"
                            className="logo-icon"
                        />
                    </Link>
                </div>
                <div className="sidebar-menu-area">
                    <ul className="sidebar-menu" id="sidebar-menu">
                        <li>
                            <Link to="/admin-dashboard">
                                <Icon icon="solar:home-smile-angle-outline" className="menu-icon" />
                                <span>Admin Dashboard (R)</span>
                            </Link>

                        </li>

                        {/* Users Dropdown */}
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="flowbite:users-group-outline" className="menu-icon" />
                                <span>Users</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink to="/user-list" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" /> All Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/activeuser-list" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />Active Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/inactiveuser-list" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-info-main w-auto" /> Inactive Users
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
{/* 
                        <li className="dropdown">
                            <Link to="#">
                                <Icon icon="proicons:dollar-circle" className="menu-icon" />
                                <span>Payment Management</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink to="/pending-request" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" /> Pending Requests
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/payment-history" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />History
                                    </NavLink>
                                </li>

                            </ul>
                        </li> */}
                        <li>
                            <Link to="/buy-package">
                                <Icon
                                    icon="fa-solid:award"
                                    className="menu-icon"
                                />
                                <span>Packages</span>
                            </Link>
                        </li>



                     
                        <li className="dropdown">
                            <Link to="#">
                           <Icon  icon="solar:archive-up-line-duotone" className="menu-icon" />
                                <span>Application</span>
                            </Link>
                            <ul className="sidebar-submenu">
                                <li>
                                    <NavLink to="/" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-primary-600 w-auto" /> EMS
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/EMS" className={(navData) =>
                                        navData.isActive ? "active-page" : ""
                                    }>
                                        <i className="ri-circle-fill circle-icon text-warning-main w-auto" />Coming Soon
                                    </NavLink>
                                </li>

                            </ul>
                        </li>
                  

                    </ul>
                </div>
            </aside>

            <main className={sidebarActive ? "dashboard-main active" : "dashboard-main"}>
                <div className="navbar-header">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                            <div className="d-flex flex-wrap align-items-center gap-4">
                                <button type="button" className="sidebar-toggle" onClick={sidebarControl}>
                                    {
                                        sidebarActive ? (<Icon
                                            icon="iconoir:arrow-right"
                                            className="icon text-2xl non-active"
                                        />) : (<Icon
                                            icon="heroicons:bars-3-solid"
                                            className="icon text-2xl non-active "
                                        />)
                                    }
                                </button>
                                <button onClick={mobileMenuControl} type="button" className="sidebar-mobile-toggle">
                                    <Icon
                                        icon="heroicons:bars-3-solid"
                                        className="icon"
                                    />
                                </button>
                                <form className="navbar-search">
                                    <input type="text" name="search" placeholder="Search" />
                                    <Icon icon="ion:search-outline" className="icon" />
                                </form>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="d-flex flex-wrap align-items-center gap-3">
                                {/* ThemeToggleButton */}
                                <ThemeToggleButton />



                                <div className="dropdown">
                                    <button
                                        className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        <Icon
                                            icon="iconoir:bell"
                                            className="text-primary-light text-xl"
                                        />
                                    </button>
                                    <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                                        <div className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                                            <div>
                                                <h6 className="text-lg text-primary-light fw-semibold mb-0">
                                                    Notifications
                                                </h6>
                                            </div>
                                            <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                                               {notificationData?.length}
                                            </span>
                                        </div>
                                        <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">

                                            {notificationData?.map((item,index)=>(
                                                <Link
                                                to="/pending-request"
                                                className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between"
                                            >
                                                <div className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                                    <span className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                        <Icon
                                                            icon="bitcoin-icons:verify-outline"
                                                            className="icon text-xxl"
                                                        />
                                                    </span>
                                                    <div>
                                                        <h6 className="text-md fw-semibold mb-4">
                                                        {item?.comment}
                                                        </h6>
                                                       
                                                    </div>
                                                </div>
                                                <span className="text-sm text-secondary-light flex-shrink-0">
                                                    {item?.amount}
                                                </span> 
                                            </Link>

                                            ))}
                                            
                                        </div>
                                        <div className="text-center py-12 px-16">
                                            <Link
                                                to="/pending-request"
                                                className="text-primary-600 fw-semibold text-md"
                                            >
                                                See All Notification
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* Notification dropdown end */}
                                <div className="dropdown">
                                    <button
                                        className="d-flex justify-content-center align-items-center rounded-circle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                          <Avatar name={`${adminData?.first_name || ""} ${adminData?.last_name || ""}`} 
                                          className="w-40-px h-40-px object-fit-cover rounded-circle"/>
                                    </button>
                                    <div className="dropdown-menu to-top dropdown-menu-sm">
                                        <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                                            <div>
                                                <h6 className="text-lg text-primary-light fw-semibold mb-2">
                                                    {adminData?.first_name}  {adminData?.last_name}
                                                </h6>
                                                <span className="text-secondary-light fw-medium text-sm">Admin</span>
                                            </div>
                                            <button type="button" className="hover-text-danger">
                                                <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                                            </button>
                                        </div>
                                        <ul className="to-top-list">
                                            <li>
                                                <Link
                                                    className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                                                    to="/admin-profile"
                                                >
                                                    <Icon icon="solar:user-linear" className="icon text-xl" /> My
                                                    Profile
                                                </Link>
                                            </li>
                                          
                                            <li>
                                                <Link
                                                    className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
                                                    to="/"
                                                    onClick={Logout}
                                                >
                                                    <Icon icon="lucide:power" className="icon text-xl" /> Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* Profile dropdown end */}

                            </div>
                        </div>
                    </div>
                </div>

                {/* dashboard-main-body */}
                <div className="dashboard-main-body">{children}</div>

                {/* Footer section */}
                <footer className="d-footer">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto">
                            <p className="mb-0">© 2024 Aiinfox. All Rights Reserved.</p>
                        </div>
                        <div className="col-auto">
                            <p className="mb-0">
                                Made by <span className="text-primary-600">Aiinfox</span>
                            </p>
                        </div>
                    </div>
                </footer>
            </main>
        </section>
    );
};

export default AdminMasterLayer;
