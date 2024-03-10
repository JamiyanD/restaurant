import React from "react";

export default function login() {
  return (
    <div className="auth-body-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 pr-0">
            <div className="card mb-0 shadow-none">
              <div className="card-body">
                <h3 className="text-center m-0">
                  <a href="index.html" className="logo logo-admin">
                    <img
                      src="assets/images/logo-sm.png"
                      height="60"
                      alt="logo"
                      className="my-3"
                    />
                  </a>
                </h3>

                <div className="px-2 mt-2">
                  <h4 className="text-muted font-size-18 mb-2 text-center">
                    Welcome Back !
                  </h4>
                  <p className="text-muted text-center">
                    Sign in to continue to Amezia.
                  </p>

                  <form className="form-horizontal my-4" action="index.html">
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon1">
                            <i className="far fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="userpassword">Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="basic-addon2">
                            <i className="fa fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                        />
                      </div>
                    </div>

                    <div className="form-group row mt-4">
                      <div className="col-sm-6">
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customControlInline"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customControlInline"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-6 text-right">
                        <a
                          href="pages-recoverpw-2.html"
                          className="text-muted font-13"
                        >
                          <i className="mdi mdi-lock"></i> Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div className="form-group mb-0 row">
                      <div className="col-12 mt-2">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In <i className="fas fa-sign-in-alt ml-1"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="m-2 text-center bg-light p-4 text-primary">
                  <h4 className="">Don't have an account ? </h4>
                  <p className="font-size-13">
                    Join <span>Amezia</span> Now
                  </p>
                  <a
                    href="#"
                    className="btn btn-primary waves-effect waves-light"
                  >
                    Free Resister
                  </a>
                </div>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    © 2018-2020 Amezia. Crafted with{" "}
                    <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 p-0 vh-100  d-flex justify-content-center">
            <div className="accountbg d-flex align-items-center">
              <div className="account-title text-center text-white">
                <h4 className="mt-3 text-white">
                  Welcome To <span className="text-warning">AMEZIA</span>{" "}
                </h4>
                <h1 className="text-white">Let's Get Started</h1>
                <p className="mt-3 font-size-14">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam laoreet tellus ut tincidunt euismod.
                </p>
                <div className="border w-25 mx-auto border-warning"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
