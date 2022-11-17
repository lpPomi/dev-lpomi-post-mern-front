
import imgReact from '../assets/images/react.svg';
import { NavLink } from "react-router-dom";

function Header() {
  return (

    <header>
      <div >
        {/* Logo  */}
        <div className='flex justify-between  bg-zinc-800 text-white rounded-md shadow-md shadow-black px-1 py-1'>
          <img src={imgReact} className="app-logo" alt="Logotipo" />
          <span >
            <strong>React Posts</strong>
          </span>
        </div>

        {/*  Menue  */}
        <nav >
          <div className="flex justify-end gap-4 mt-3">
            <div className=" bg-green-500 text-sm px-2 py-1 rounded-sm shadow-md shadow-black ">
              <NavLink className={({ isActive }) => isActive ? 'active' : ''} to="/" end>Home</NavLink>
            </div>

            <div className="bg-green-500 text-sm px-2 py-1 rounded-sm shadow-md shadow-black">
              <NavLink to="/create">Create</NavLink>
            </div>

            <div className="bg-green-500 text-sm px-2 py-1 rounded-sm shadow-md shadow-black">
              <NavLink to="/">More</NavLink>
            </div>

          </div>


        </nav>


      </div>
    </header>
  );
}

export default Header;