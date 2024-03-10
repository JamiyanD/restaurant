import React, { useState, ChangeEvent } from "react";

const USER_URL = `${process.env.BACKEND_URL}/users`;

export default function LoginPage() {
  const [shown, setShown] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  function handleChangeRegister() {
    setShown(true);
  }

  function handleChangeLogin() {
    setShown(false);
  }

  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleRepasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setRepassword(e.target.value);
  }
  function handlePhonenumberChange(e: ChangeEvent<HTMLInputElement>) {
    setPhonenumber(e.target.value);
  }

  async function handleRegister(e: any) {
    e.preventDefault();
    const data = {
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
      date: Date(),
    };
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const FETCHED_DATA = await fetch(USER_URL, options);
    const FETCHED_JSON = await FETCHED_DATA.json();
    console.log(FETCHED_JSON);
  }

  return (
    <div>
      {!shown && (
        <div className="my-40 m-auto max-w-5xl  xl:flex lg:flex md:flex sm:flex-none">
          <div className="bg-white py-10 px-20 sm:w-screen xl:w-7/12 lg:w-7/12 md:w-7/12">
            <p className="font-bold text-4xl pb-10">Нэвтрэх</p>
            <form className="flex flex-col">
              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label htmlFor="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </label>
                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="email"
                  type="text"
                  placeholder="Email"
                />
              </div>
              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label className="" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>

                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="password"
                  type="password"
                  placeholder="Нууц үг"
                />
              </div>

              <a
                className="inline-block align-baseline font-bold text-sm text-[#E0510D] hover:text-blue-800  mb-6"
                href="#"
              >
                Forgot your password?
              </a>
              <button
                className="bg-white text-[#E0510D] outline outline-[#E0510D] hover:bg-[#E0510D] hover:text-white  font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline sm: w-3/6 "
                type="button"
              >
                Нэвтрэх
              </button>
            </form>
          </div>

          <div
            className="shadow-md bg-cover bg-no-repeat bg-center sm:w-screen xl:w-5/12 lg:w-5/12 md:w-5/12 text-center sm: h-[424px]"
            style={{
              backgroundImage:
                "url(" +
                "https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466120130465-9BNATBEVMW9VCWH2KMA2/Stocksy_comp_461841-color.jpg?format=2500w" +
                ")",
            }}
          >
            <p className="font-bold text-3xl my-6 text-gray-50">Hello!</p>
            <p className="mb-6 text-gray-50">
              Enter your personal details and start journey with us
            </p>
            <button
              className=" hover:bg-white text-white hover:text-black font-bold  rounded-lg outline hover:outline-none w-3/6 py-2 px-4 "
              type="button"
              onClick={handleChangeRegister}
            >
              Бүртгүүлэх
            </button>
          </div>
        </div>
      )}

      {shown && (
        <div className="my-40 m-auto max-w-5xl  xl:flex lg:flex md:flex sm:flex-none">
          <div className="bg-white py-10 px-20 sm:w-screen xl:w-7/12 lg:w-7/12 md:w-7/12">
            <p className="font-bold text-4xl pb-10">Бүртгүүлэх</p>
            <form
              className="flex flex-col"
              onSubmit={(e) => void handleRegister(e)}
            >
              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label htmlFor="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </label>
                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Таны нэр"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>

              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label htmlFor="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </label>
                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="email"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </label>
                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="phonenumber"
                  type="number"
                  placeholder="Утасны дугаар"
                  value={phonenumber}
                  onChange={handlePhonenumberChange}
                />
              </div>
              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </label>
                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="password"
                  type="password"
                  placeholder="Нууц үг"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              <div className="flex border-b-2 border-gray-600 mb-4 md:w-4/5 sm:w-5/5">
                <label className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </label>
                <input
                  className=" text-gray-700 pl-6 pb-2"
                  id="repassword"
                  type="repassword"
                  placeholder="Нууц үг давтах"
                  value={repassword}
                  onChange={handleRepasswordChange}
                />
              </div>

              <a
                className="inline-block align-baseline font-bold text-sm text-[#E0510D] hover:text-blue-800  mb-6"
                href="#"
              >
                Forgot your password?
              </a>
              <button
                className="bg-white text-[#E0510D] outline outline-[#E0510D] hover:bg-[#E0510D] hover:text-white  font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline sm: w-3/6 "
                type="submit"
              >
                Бүртгүүлэх
              </button>
            </form>
          </div>

          <div
            className="shadow-md bg-cover bg-no-repeat bg-center sm:w-screen xl:w-5/12 lg:w-5/12 md:w-5/12 text-center sm: h-[424px]"
            style={{
              backgroundImage:
                "url(" +
                "https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466120517882-GMTUN8QUTQPXD3SSUKAE/Stocksy_comp_486556.jpg?format=2500w" +
                ")",
            }}
          >
            <p className="font-bold text-3xl my-6 text-gray-50">Hello!</p>
            <p className="mb-6 text-gray-50">
              Enter your personal details and start journey with us
            </p>
            <button
              className=" hover:bg-white text-white hover:text-black font-bold  rounded-lg outline hover:outline-none w-3/6 py-2 px-4 "
              type="button"
              onClick={handleChangeLogin}
            >
              Нэвтрэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
