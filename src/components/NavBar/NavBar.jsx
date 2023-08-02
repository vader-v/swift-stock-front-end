// npm modules
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      {user ?
        <ul>
          <li>Welcome, {user.name}</li>
          <li><NavLink to="/profiles">Profiles</NavLink></li>
          <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          <li><NavLink to="/auth/change-password">Change Password</NavLink></li>
          <li><NavLink to="/schedules">SCHEDULES</NavLink></li>
          <li><NavLink to="/schedules/schedule-form">SCHEDULE FORM</NavLink></li>
        </ul>
      :
      <ul>
          <li><NavLink to="/auth/login">Log In</NavLink></li>
          <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
        </ul>
      }
      <NavLink to="/">
        <img src="favicon.png" alt="swift stock logo" className={styles.logo} />
      </NavLink>
    </nav>
  )
}

export default NavBar
