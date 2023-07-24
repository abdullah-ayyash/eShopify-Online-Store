import { NavLink } from 'react-router-dom'
import logo from '../logo.png'
import profileIcon from '../images/user.png'


function Navigation({ setIsLoggedIn, isLoggedIn }) {

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
          <div id='logo'>
            <li>
              <NavLink to="/" >
                <img src={logo} alt="logo" width="100%" height="80px" />
              </NavLink>
            </li>
          </div>

          <div id='menu-list'>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
                Home
              </NavLink>
            </li>

            {!isLoggedIn &&
              <li>
                <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Register</NavLink>
              </li>
            }

            {!isLoggedIn &&
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>Login</NavLink>
              </li>
            }
          </div>

          <div id='user-control'>
            {isLoggedIn &&
              <>
                <li>
                  <NavLink to="#">
                    <button onClick={logoutHandler}>Logout</button>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile">
                    <img src={profileIcon} alt='user-profile' />
                  </NavLink>
                </li>
              </>
            }
          </div>


        </ul>

      </header>


    </div>
  );
}

export default Navigation;
