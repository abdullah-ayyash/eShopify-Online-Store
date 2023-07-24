import { NavLink } from 'react-router-dom'
import logo from '../logo.svg'

function Navigation({ setIsLoggedIn,isLoggedIn }) {

  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    console.log(response);
    setIsLoggedIn(false);
  }
  return (
    <div>
      <header>
        <ul>
          <li>
            <NavLink to="/">
              <img src={logo} alt='logo' width="100%" height="80px" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              Register
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              Login
            </NavLink>
          </li>
          {isLoggedIn &&
                    <li>
                    <NavLink to='#'>
                      <button onClick={logoutHandler}>Logout</button>
                    </NavLink>
                  </li>
          }
        </ul>

      </header>


    </div>
  );
}

export default Navigation;
