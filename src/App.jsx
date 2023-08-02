// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ScheduleList from './pages/ScheduleList/ScheduleList'
import ScheduleForm from './pages/ScheduleForm/ScheduleForm'

// services
import * as authService from './services/authService'
import * as scheduleService from './services/scheduleService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }
  
  const [schedules, setSchedules] = useState([])
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const fetchAllSchedules = async () => {
      const data = await scheduleService.index()
      console.log('Schedule Data', data)
      setSchedules(data)
    }
    if (user) fetchAllSchedules()
  }, [user])

  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/schedules'); // Use the base URL for fetching schedules
      if (!response.ok) {
        // Handle error response, e.g., display an error message
        throw new Error('Error fetching schedules: Network response was not ok');
      }
      const data = await response.json();
      setSchedules(data);
    } catch (error) {
      console.log(error);
      // Handle error, e.g., set state to indicate loading failed
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleScheduleSubmit = async (newSchedule) => {
    try {
      const createdSchedule = await scheduleService.create(newSchedule);
      console.log('New Schedule Created:', createdSchedule);
      fetchSchedules();
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const updateScheduleList = async () => {
    try {
      const data = await scheduleService.index()
      console.log('Schedule Data', data)
      setSchedules(data)
      setFormSubmitted(true)
      navigate('/schedules');
    } catch (error) {
      console.error('Error fetching schedules:', error)
    }
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedules"
          element={
            <ProtectedRoute user={user}>
              <ScheduleList schedules = {schedules}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedules/schedule-form"
          element={
            <ProtectedRoute user={user}>
              <ScheduleForm onScheduleSubmit={handleScheduleSubmit} updateScheduleList={updateScheduleList} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
