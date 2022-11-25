import React, { createContext, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import AddReference from "./components/add-reference/AddReference";
import Math from "./components/math/Math";
import Science from "./components/science/Science";
import Language from "./components/language/Language";
import History from "./components/history/History";
import Sociology from "./components/sociology/Sociology";
import Geography from "./components/geography/Geography";
import Music from "./components/music/Music";
import Programming from "./components/programming/Programming";
import { QueryClient, QueryClientProvider } from "react-query";
import SideBar from "./components/sidebar";
import { AiOutlineAlignLeft } from "react-icons/ai";

export const SearchContext = createContext();
export const CloseContext = createContext();

const queryClient = new QueryClient();

function App() {
  const menuBarRef = useRef(null);
  const asideRef = useRef(null);
  const searchRef = useRef(null);
  const clickClose = () => {
    menuBarRef.current.className =
      "hidden md:hidden flex-col items-center w-screen absolute top-0 bg-gray-300 rounded-b-xl";
    asideRef.current.className = "hidden md:flex absolute md:static w-64";
    searchRef.current.className =
      "absolute bg-gray-500 md:bg-transparent right-0 md:static w-screen h-screen md:w-1/3 md:h-auto mx-3 hidden md:flex flex-col items-center";
  };
  const clickMenuButton = () => {
    if (
      menuBarRef.current.className ===
      "hidden md:hidden flex-col items-center w-screen absolute top-0 bg-gray-300 rounded-b-xl"
    ) {
      menuBarRef.current.className =
        "flex md:hidden flex-col items-center w-screen absolute top-0 bg-gray-300 rounded-b-xl";
    } else {
      menuBarRef.current.className =
        "hidden md:hidden flex-col items-center w-screen absolute top-0 bg-gray-300 rounded-b-xl";
    }
  };
  const clickSideBarButton = () => {
    if (
      asideRef.current.className === "hidden md:flex absolute md:static w-64"
    ) {
      asideRef.current.className = "md:flex absolute md:static w-64";
    } else {
      asideRef.current.className = "hidden md:flex absolute md:static w-64";
    }
  };

  const clickSearchButton = () => {
    if (
      searchRef.current.className ===
      "absolute bg-gray-500 md:bg-transparent right-0 md:static w-screen h-screen md:w-1/3 md:h-auto mx-3 hidden md:flex flex-col items-center"
    ) {
      searchRef.current.className =
        "absolute bg-gray-500 md:bg-transparent right-0 md:static w-screen h-screen md:w-1/3 md:h-auto mx-3 flex md:flex flex-col items-center";
    } else {
      searchRef.current.className =
        "absolute bg-gray-500 md:bg-transparent right-0 md:static w-screen h-screen md:w-1/3 md:h-auto mx-3 hidden md:flex flex-col items-center";
    }
  };
  return (
    <div>
      <header></header>
      <nav className="flex flex-row items-center w-screen px-12">
        <div className="flex flex-col">
          <p className="text-3xl font-bold text-pink-500 my-2">
            CanCan Education Center
          </p>
          <div className="flex flex-row items-center">
            <a href="/" className="mx-6 text-pink-500 hover:text-pink-800">
              Home
            </a>
            <a
              href="/add-reference"
              className="mr-6 text-pink-500 hover:text-pink-800"
            >
              Add Reference
            </a>
          </div>
        </div>
        <div
          className="md:hidden flex ml-auto cursor-pointer"
          onClick={clickMenuButton}
        >
          <AiOutlineAlignLeft size={36} />
        </div>
      </nav>
      <ul
        ref={menuBarRef}
        className="hidden md:hidden flex-col items-center w-screen absolute top-0 bg-gray-500 rounded-b-xl"
      >
        <li
          className="cursor-pointer text-white hover:text-blue-500"
          onClick={clickSideBarButton}
        >
          Subjects
        </li>
        <li
          className="cursor-pointer text-white hover:text-blue-500"
          onClick={clickSearchButton}
        >
          Search
        </li>
        <li className="cursor-pointer text-red-500" onClick={clickClose}>
          Close
        </li>
      </ul>
      <div className="flex">
        <SideBar asideRef={asideRef} />
        <div className="w-full">
          <CloseContext.Provider value={clickClose}>
            <SearchContext.Provider value={searchRef}>
              <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route
                      exact
                      path="/add-reference"
                      element={<AddReference />}
                    />
                    <Route path="/math" element={<Math />} />
                    <Route path="/science" element={<Science />} />
                    <Route path="/language" element={<Language />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/sociology" element={<Sociology />} />
                    <Route path="/geography" element={<Geography />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/programming" element={<Programming />} />
                  </Routes>
                </BrowserRouter>
              </QueryClientProvider>
            </SearchContext.Provider>
          </CloseContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
