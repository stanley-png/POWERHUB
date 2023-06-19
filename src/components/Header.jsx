import React, { useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import { auth } from "../utils/firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout);
      }
    });
  }, [dispatch]);

  const signOutOfApp = () => {
    dispatch(logout);
    auth.signOut();
    window.location.reload(false);

    if (user) {
      auth.signOut();
    }
    navigate("/");
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between "
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <p
            className="flex-none cursor-pointer bg-clip-text bg-gradient-to-tr from-[#13ABC4] to-[#C1224F] text-transparent text-xl font-bold sm:text-2xl lg:text-3xl lg:leading-tight"
            onClick={() => navigate("/")}
          >
            PowerHub
          </p>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
              data-hs-collapse="#navbar-image-1"
              aria-controls="navbar-image-1"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-image-1"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full bg-[#C1224F] rounded-md max-w-[60rem]  grow sm:block "
        >
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 mb-5 md:mb-0 sm:flex-row sm:items-center sm:justify-between sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:px-7">
            <p
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              onClick={() => navigate("/")}
              aria-current="page"
            >
              Home
            </p>
            <p
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              onClick={() => navigate("/alumni")}
            >
              Alumni's
            </p>
            <p
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              onClick={() => navigate("/contact-us")}
            >
              Contact Us
            </p>
            {/* <a
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              href="#"
            >
              Events
            </a> */}
            <p
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              onClick={() => navigate("/top-projects")}
            >
              Projects
            </p>
            <p
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              onClick={() => navigate("/specialization")}
            >
              Specialization
            </p>
            <a
              className="font-semibold text-white hover:text-[#EBFFFB] sm:py-6 px-4 md:px-0 cursor-pointer"
              href="https://stirring-dodol-bca1da.netlify.app/blogs"
              target="_blank"
            >
              Blog
            </a>
            {!user ? (
              <p
                className="flex items-center gap-x-2 font-medium text-white/[.8] hover:text-white sm:border-l sm:border-white/[.3] sm:my-6 sm:pl-6 px-4 md:px-0 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                <svg
                  className="w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg>
                Log in
              </p>
            ) : (
              <Menu as="div" className="">
                <div>
                  <Menu.Button className="bg-[#13ABC4] flex text-sm rounded-full ring-1 ring-opacity-5 focus:outline-none">
                    <span className="w-10 font-mono p-1 uppercase text-lg text-white h-10 border-2 rounded-full text-center">
                      {user?.displayName[0] || user?.email[0]}
                    </span>
                    {/* <img src={user.photoURL} alt="" /> */}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute -ml-16 mt-3  rounded-md shadow-lg py-1 bg-[#C1224F] font-semibold ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={classNames(
                            active ? "hover:text-[#EBFFFB]" : "",
                            "block px-4 py-2 text-sm text-white"
                          )}
                          to={user && "/"}
                        >
                          <div className="w-60">
                            <span className="">Continue Learning</span>
                          </div>
                        </Link>
                      )}
                    </Menu.Item> */}

                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => navigate("/submitProject")}
                          className={classNames(
                            active ? "hover:text-[#13ABC4]" : "",
                            "block px-4 py-2 text-sm text-white cursor-pointer"
                          )}
                        >
                          Submit Project
                        </p>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => navigate("/idea-submission")}
                          className={classNames(
                            active ? "hover:text-[#13ABC4]" : "",
                            "block px-4 py-2 text-sm text-white cursor-pointer"
                          )}
                        >
                          Submit Idea
                        </p>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => navigate("/specialization")}
                          className={classNames(
                            active ? "hover:text-[#13ABC4]" : "",
                            "block px-4 py-2 text-sm text-white cursor-pointer"
                          )}
                        >
                          Specialization
                        </p>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          onClick={() => navigate("/")}
                          className={classNames(
                            active ? "hover:text-[#13ABC4]" : "",
                            "block px-4 py-2 text-sm text-white cursor-pointer"
                          )}
                        >
                          Update Profile
                        </p>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          className={classNames(
                            active ? "hover:text-[#EBFFFB]" : "",
                            "block px-4 py-2 text-sm text-white"
                          )}
                          to={!user && "/"}
                        >
                          <div onClick={signOutOfApp} className="">
                            <span className="font-semibold">Sign Out</span>{" "}
                            <br />
                            <span className="">
                              {!user ? "Guest" : user.displayName}
                            </span>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
