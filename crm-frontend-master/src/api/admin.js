
import axios from 'axios';

// const BASE_URL = 'https://project-crm.onrender.com'
const BASE_URL = 'https://my-crm-backend.onrender.com'
export async function fetchTickets() {
  try {
    const response = await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
      headers: {
        'x-access-token': localStorage.getItem('token')  
      }
    });  
    return response.data;  
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const response = await axios.get(`${BASE_URL}/crm/api/v1/users`, {
      headers: {
        'x-access-token': localStorage.getItem('token') 
      }
    });  
    return response.data;  
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;  
  }
}

export async function updateTicket(ticketId, updatedTicket) {
  try {
    const response = await axios.put(
      `${BASE_URL}/crm/api/v1/tickets/${ticketId}`,  
      updatedTicket,
      {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
}
export async function updateUser(userId, updatedUser) {
    try {
      const response = await axios.put(
        `${BASE_URL} "/crm/api/v1/users/",${userId}`,
        updatedUser,
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
  
  
  
  
  
  