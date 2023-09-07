import React, { useState, useEffect } from 'react';
import MaterialTable from '@material-table/core';
import { Button, Modal, Card } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'https://backend-crm-yic4.onrender.com';

function Admin() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [message, setMessage] = useState('');
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updateTicket = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${BASE_URL}/tickets/${selectedTicket._id}`, selectedTicket);
      setUpdateModalOpen(false);
      setMessage('Ticket updated successfully');
      fetchTickets();
    } catch (error) {
      console.error('Error updating ticket:', error);
      setMessage(error.message);
    }
  };

  const openUpdateModal = (rowData) => {
    setSelectedTicket(rowData);
    setUpdateModalOpen(true);
  };

  const columns = [
    { title: 'ID', field: '_id' },
    { title: 'Title', field: 'title' },
    { title: 'Description', field: 'description' },
    { title: 'Reporter', field: 'reporter' },
    { title: 'Priority', field: 'priority' },
    { title: 'Status', field: 'status' },
  ];

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="ticket-summary">
        <div className="summary-card">
          <Card>
            <Card.Body>
              <Card.Title>Tickets</Card.Title>
              <Card.Text>{tickets.length}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="summary-card">
          <Card>
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>{users.length}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      <MaterialTable
        title="Tickets"
        columns={columns}
        data={tickets}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Ticket',
            onClick: (event, rowData) => {
              openUpdateModal(rowData);
            },
          },
        ]}
      />

      <Modal show={updateModalOpen} onHide={() => setUpdateModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateTicket}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={selectedTicket.title || ''}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, title: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={selectedTicket.description || ''}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, description: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Reporter:</label>
              <input
                type="text"
                className="form-control"
                name="reporter"
                value={selectedTicket.reporter || ''}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, reporter: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Priority:</label>
              <select
                className="form-control"
                name="priority"
                value={selectedTicket.priority || ''}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, priority: e.target.value })
                }
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status:</label>
              <select
                className="form-control"
                name="status"
                value={selectedTicket.status || ''}
                onChange={(e) =>
                  setSelectedTicket({ ...selectedTicket, status: e.target.value })
                }
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Update Ticket
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Admin;
