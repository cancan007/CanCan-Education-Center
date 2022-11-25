const SideBar = ({ asideRef }) => {
  return (
    <aside
      ref={asideRef}
      className="hidden md:flex absolute md:static w-64"
      aria-label="Sidebar"
    >
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded">
        <ul className="space-y-2">
          <li>
            <a
              href="/math"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="ml-3">Math</span>
            </a>
          </li>
          <li>
            <a
              href="/science"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">Science</span>
            </a>
          </li>
          <li>
            <a
              href="/language"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">Language</span>
            </a>
          </li>
          <li>
            <a
              href="/history"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">History</span>
            </a>
          </li>
          <li>
            <a
              href="/sociology"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">Sociology</span>
            </a>
          </li>
          <li>
            <a
              href="/geography"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">Geography</span>
            </a>
          </li>
          <li>
            <a
              href="/music"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">Music</span>
            </a>
          </li>
          <li>
            <a
              href="/programming"
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="flex-1 ml-3 ">Programming</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
