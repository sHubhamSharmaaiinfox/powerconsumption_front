import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import ThemeToggleButton from "../helper/ThemeToggleButton";
import { apiGet, apiPost } from "../services/client";
import Avatar from "react-avatar";
import { toast, ToastContainer } from "react-toastify";
const MasterLayout = ({ children }) => {
  let [sidebarActive, seSidebarActive] = useState(false);
  let [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [alertdata, setAlertData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState(null);

  const Logout = () => {
    localStorage.removeItem("token");

  };


  const AddFeedBack = async () => {
    if (!message) {
      toast.error("Enter Message!")
      return false
    }
    const data = { message }
    try {
      const res = await apiPost("userapp/add-feedback", data);
      if (res?.data?.status == true) {
        toast.success("success")
      } else {
        console.log(res);
      }
    } catch (e) {
      console.log(e);
    }

  }


  // Open Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
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
    openActiveDropdown();
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

  const getUserDetails = async () => {
    try {
      const res = await apiGet("userapp/userprofile");
      if (res?.data?.status === true) {
        setUserData(res?.data?.data);

      } else {
        console.error(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNotificationData = async () => {
    try {
      const res = await apiGet("userapp/alerts");
      if (res?.data?.status === true) {
        setAlertData(res?.data?.data);
        console.log(res);
      } else {
        console.error(res?.data?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetails();
    getNotificationData();
  }, []);



  return (
    <section className={mobileMenu ? "overlay active" : "overlay "}>
      <ToastContainer />
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
            <li className="">
              <Link to="/">
                <Icon icon="solar:home-smile-angle-outline" className="menu-icon" />
                <span>Dashboard (User)</span>
              </Link>

            </li>

            {/* <li className="">
              <Link to="/add-meter">
                <Icon icon="solar:power-linear" className="menu-icon" />
                <span>Add Meter</span>
              </Link>
            </li> */}

            <li className="">
              <Link to="/active-power">
                <Icon icon="material-symbols:multiline-chart-rounded" className="menu-icon" />
                <span>KW Data</span>
              </Link>
            </li>


            <li className="">
              <Link to="/amp-readings">
                <Icon icon="material-symbols:table-chart-view-outline-rounded" className="menu-icon" />
                <span>Apparent Power</span>
              </Link>

            </li>


            <li className="">
              <Link to="/anomalies">
                <Icon icon="material-symbols:person-alert-outline-rounded" className="menu-icon" />
                <span>Alerts</span>
              </Link>

            </li>

            {/* <li className="">
              <Link to="/pricing">
                <Icon
                  icon="fa-solid:award"
                  className="menu-icon"
                />
                <span>Packages</span>
              </Link>
            </li> */}



            <li className="dropdown">
              <Link to="#">
                <Icon icon="hugeicons:invoice-03" className="menu-icon" />
                <span>Reports</span>
              </Link>
              <ul className="sidebar-submenu">

                <li>
                  <NavLink to="/meter-list" className={(navData) =>
                    navData.isActive ? "active-page" : ""
                  }>
                    <i className="ri-circle-fill circle-icon text-primary-600 w-auto" />
                    Meter List
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
                          Alerts
                        </h6>
                      </div>
                      <span className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">
                        {alertdata?.length}
                      </span>
                    </div>
                    <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                      {alertdata?.map((item, index) => (

                        <Link
                          to="/anomalies"
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
                                {item?.alert_name}
                              </h6>
                              <p className="mb-0 text-sm text-secondary-light text-w-200-px">
                                {item?.description}
                              </p>
                            </div>
                          </div>
                          <span className="text-sm text-secondary-light flex-shrink-0">
                            {alertdata && alertdata.length > 0 && (
                              <span>{new Date(item?.created_at).toLocaleDateString()}</span>
                            )}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="text-center py-12 px-16">
                      <Link
                        to="/anomalies"
                        className="text-primary-600 fw-semibold text-md"
                      >
                        See All Alerts
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
                    <Avatar name={`${userData?.first_name || ""} ${userData?.last_name || ""}`}
                      className="w-40-px h-40-px object-fit-cover rounded-circle" />
                  </button>
                  <div className="dropdown-menu to-top dropdown-menu-sm">
                    <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                      <div>
                        <h6 className="text-lg text-primary-light fw-semibold mb-2">
                          {userData?.first_name} {userData?.last_name}
                        </h6>
                        <span className="text-secondary-light fw-medium text-sm">{userData?.role}</span>
                      </div>
                      <button type="button" className="hover-text-danger">
                        <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                      </button>
                    </div>
                    <ul className="to-top-list">
                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                          to="/view-profile"
                        >
                          <Icon icon="solar:user-linear" className="icon text-xl" /> My
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
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


        {/* Floating Feedback Button */}
        <div
          className="floating-btn"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "rgb(62 204 88)",
            color: "white",
            padding: "10px 15px",
            borderRadius: "50px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            cursor: "pointer",
            transition: "0.3s ease-in-out",
          }}
          onClick={openModal}
        >
          <Icon icon="material-symbols:contact-support-outline" width="24" height="24" />Feedback
        </div>

        {/* Feedback Modal */}
        {isModalOpen && (
          <div
            className="modal-overlay"
            onClick={handleOutsideClick}
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "9999",
            }}
          >
            <div
              className="card feedback-form"
              onClick={(e) => e.stopPropagation()} // Prevent click event from reaching the overlay
              style={{
                borderRadius: "10px",
                padding: "20px",
                width: "500px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="modal-header" style={{ display: "flex", justifyContent: "center" }}>
                <h5 className="modal-head text-center">Feedback Form</h5>

              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Feedback submitted!");
                  closeModal();
                }}
              >
                <div className="modal-body">
                  {/* <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div> */}
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Enter Message:</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-control"
                      placeholder="Your Feedback"
                      rows="4"
                      required
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer" style={{ textAlign: "right" }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={AddFeedBack}
                    style={{ padding: "8px 20px", backgroundColor: "#3ECC58", borderColor: "#3ECC58" }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer section */}
        <footer className="d-footer">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <p className="mb-0">© 2024 AIINFOX. All Rights Reserved.</p>
            </div>

          </div>
        </footer>
      </main>
    </section>
  );
};

export default MasterLayout;
