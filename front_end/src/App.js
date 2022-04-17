import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./components/home/Home";
import Math from "./components/math/Math";
import Science from "./components/science/Science";
import Language from './components/language/Language';
import History from './components/history/History';
import Sociology from './components/sociology/Sociology';
import Geography from './components/geography/Geography';
import Music from './components/music/Music';
import Programming from './components/programming/Programming';

function App() {
  return (
    <div>
      <header>
      </header>
      <nav>
        <p className="text-3xl font-bold text-pink-500 mx-4">CanCan Education Center</p>
        <div className="flex mt-4">
          <a href="/" className="mx-6 text-pink-500 hover:text-pink-800">Home</a>
          <a href="/add-reference" className='mr-6 text-pink-500 hover:text-pink-800'>Add Reference</a>

        </div >
      </nav >
      <div className="flex">
        <aside className="w-64" aria-label="Sidebar">
          <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded">
            <ul className="space-y-2">
              <li>
                <a href="/math" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100">
                  <span className="ml-3">Math</span>

                </a>
              </li>
              <li>
                <a href="/science" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">Science</span>

                </a>
              </li>
              <li>
                <a href="/language" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">Language</span>

                </a>
              </li>
              <li>
                <a href="/history" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">History</span>
                </a>
              </li>
              <li>
                <a href="/sociology" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">Sociology</span>
                </a>
              </li>
              <li>
                <a href="/geography" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">Geography</span>
                </a>
              </li>
              <li>
                <a href="/music" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">Music</span>
                </a>
              </li>
              <li>
                <a href="/programming" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">

                  <span className="flex-1 ml-3 whitespace-nowrap">Programming</span>
                </a>
              </li>
            </ul>
          </div>

        </aside>
        <div className="w-full">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Home />} />
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
        </div>
      </div>

    </div >
  );
}

export default App;
