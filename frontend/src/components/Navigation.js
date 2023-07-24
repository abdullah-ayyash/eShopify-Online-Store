import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'


function Navigation() {

  return (
    <div>
      <header>
        <ul>
          <li>
            <NavLink to="/">
              <img src={logo} alt="logo" width="100%" height="80px" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>

      </header>


    </div>
  );
}

export default Navigation;
