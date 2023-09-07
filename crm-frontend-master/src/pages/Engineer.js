import React, { useState, useEffect } from "react";
import { fetchTickets, updateTicketStatus, getAllTickets } from "../api/engineer";
import Sidebar from "../components/Sidebar";
import { Button, Modal, Card } from "react-bootstrap";
import MaterialTable from "@material-table/core";
import { useNavigate } from "react-router-dom";

function Engineer() {
  const [ticketDetails, setTicketDetails] = useState([]);
  const [updateTicketModal, setUpdateTicketModal] = useState(false);
  const [currentSelectedTicket, setCurrentSelectedTicket] = useState({});
  const [openCount, setOpenCount] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [inProgressCount, setInProgressCount] = useState(0);
  const [blockedCount, setBlockedCount] = useState(0);

  const columns = [
    { title: "ID", field: "_id" },
    { title: "Title", field: "title" },
    { title: "Assignee", field: "assignee" },
    { title: "Priority", field: "priority" },
    { title: "Status", field: "status" },
  ];

  useEffect(() => {
   
    fetchData();
  }, []);
  const fetchData = async () => {
    console.log("ticket created")
    try {
      const ticketData = await fetchTickets();
      setTicketDetails(ticketData);
      updateTicketCounts(ticketData);
    } catch (error) {
      console.log("Error occurred while fetching tickets:", error);
    }
  };

  // Update ticket counts
  function updateTicketCounts(tickets) {
    let openCount = 0;
    let closedCount = 0;
    let inProgressCount = 0;
    let blockedCount = 0;

    tickets.forEach((ticket) => {
      if (ticket.status === "OPEN") {
        openCount++;
      } else if (ticket.status === "CLOSED") {
        closedCount++;
      } else if (ticket.status === "IN_PROGRESS") {
        inProgressCount++;
      } else if (ticket.status === "BLOCKED") {
        blockedCount++;
      }
    });

    setOpenCount(openCount);
    setClosedCount(closedCount);
    setInProgressCount(inProgressCount);
    setBlockedCount(blockedCount);
  }

  const navigate = useNavigate();

  const logoutFn = () => {
    localStorage.clear();
    navigate("/");
  };

  // Edit ticket and open update modal
  function editTicket(rowData) {
    setCurrentSelectedTicket(rowData);
    setUpdateTicketModal(true);
  }

  // Update ticket
  async function updateTicket(event) {
    event.preventDefault();
    try {
      const response = await updateTicketStatus(currentSelectedTicket._id, currentSelectedTicket.status);
      const updatedTicket = response.data;
      const updatedTicketDetails = ticketDetails.map((ticket) =>
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      );
      setTicketDetails(updatedTicketDetails);
      setUpdateTicketModal(false);
    } catch (error) {
      console.log("Error occurred while updating ticket:", error);
    }
  }

  // Render Engineer component
  return (
    <div className="bg-light vh-100">
      <Sidebar />
      <div className="container-fluid pt-5">
        <h3 className="text-center text-success">Welcome, {localStorage.getItem("name")}</h3>
        <br />
        <div className="d-flex justify-content-end" onClick={logoutFn}>
          <Button variant="danger">Logout</Button>
        </div>
        <br />
      </div>
      <div className="d-flex justify-content-around">
        {/* Display ticket counts */}
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>OPEN</Card.Title>
            <Card.Text>{openCount} tickets</Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>CLOSED</Card.Title>
            <Card.Text>{closedCount} tickets</Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>INPROGRESS</Card.Title>
            <Card.Text>{inProgressCount} tickets</Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>BLOCKED</Card.Title>
            <Card.Text>{blockedCount} tickets</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <p className="text-center text-muted">Take a look at all your tickets below!</p>
      <div className="container-fluid p-5 p-3">
        {/* Display MaterialTable with ticketDetails */}
        <MaterialTable
          onRowClick={(event, rowData) => editTicket(rowData)}
          title="Tickets raised by you"
          columns={columns}
          data={ticketDetails}
        />

        {/* Update ticket modal */}
        {updateTicketModal && (
          <Modal show={updateTicketModal} centered onHide={() => setUpdateTicketModal(false)}>
            <Modal.Header>Update ticket</Modal.Header>
            <Modal.Body>
              <form onSubmit={updateTicket}>
                <h5 className="card-subtitle text-success lead">ID: {currentSelectedTicket._id}</h5>

                {/* Add input fields for ticket details */}
                <div className="input-group m-1">
                  <label className="label label-md input-group-text">Title</label>
                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    value={currentSelectedTicket.title}
                    disabled
                  />
                </div>

                {/* Add other input fields for ticket details */}
                {/* Example: assignee, priority, description, status */}

                <div className="d-flex justify-content-end">
                  <Button variant="secondary" className="m-1" onClick={() => setUpdateTicketModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="success" className="m-1" type="submit">
                    Update
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Engineer;