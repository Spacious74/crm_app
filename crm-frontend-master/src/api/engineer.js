import axios from 'axios';

// const BASE_URL = 'https://project-crm.onrender.com';
const BASE_URL = 'https://my-crm-backend.onrender.com';



export async function fetchTickets(status, ticketPriority) {
  try {
    const token = localStorage.getItem('token');

    const queryParams = {
      reporter: localStorage.getItem('userId'),
    };

    if (status) {
      queryParams.status = status;
    }

    if (ticketPriority) {
      queryParams.ticketPriority = ticketPriority;
    }

    const response = await axios.get(`${BASE_URL}/crm/api/v1/tickets`, {
      headers: {
        'x-access-token': token,
      },
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

async function getAllTickets() {
  try {
    const tickets = await fetchTickets();
    console.log('All Tickets:', tickets);
   
  } catch (error) {
    console.error('Error retrieving tickets:', error);
  }
}

export default getAllTickets;



export async function updateTicketStatus(ticketId, newStatus) {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.patch(
      `${BASE_URL}/crm/api/v1/tickets/${ticketId}`,
      { status: newStatus },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating ticket status:', error);
    throw error;
  }
}
