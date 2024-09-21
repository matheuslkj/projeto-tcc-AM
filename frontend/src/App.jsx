import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {


  return (
    <div className="max-w-6xl mx-auto">
       <nav className="rounded bg-indigo-900 text-white px-2 py-2.5 sm:px-4">
    <div
      className="container mx-auto flex flex-wrap items-center justify-between"
    >
      <a href="https://laraveller.com/" className="flex items-center">
        Laraveller
      </a>
      <div
        className="hidden w-full md:block md:w-auto"
      >
        <ul
          className="
            mt-4
            flex flex-col
            rounded-lg
            p-4
            md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium
          "
        >
          <li>
            <Link
              to="/"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >Home</Link>
          </li>
          <li>
            <Link
              to="/login"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >Login</Link>
          </li>
          <li>
            <Link
              to="/register"
              className="block rounded py-2 pr-4 pl-3 text-white"
              aria-current="page"
              >Registrar</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default App
