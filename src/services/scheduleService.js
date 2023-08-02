// services
import * as tokenService from './tokenService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/schedules`

async function index() {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    const data = await res.json();
    console.log('Schedule Data:', data); // Add this line
    return data;
  } catch (error) {
    console.log(error)
  }
}

async function create(triviaFormData) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(triviaFormData)
    })
    return res.json()
  } catch (error) {
    throw new Error(error)
  }
}

export { 
  index,
  create,
}