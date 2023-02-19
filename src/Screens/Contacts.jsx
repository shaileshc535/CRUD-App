import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateContact from "./CreateContact";
import UpdateContact from "./UpdateContacts";
import { Table, Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Contacts = () => {
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [contact, setContact] = useState([]);

  const PATH_URI = process.env.REACT_APP_API_URL;

  function actionAdd() {
    setAdd(true);
  }

  function actionUpdate(id) {
    setId(id);
    setUpdate(true);
  }

  const getContactList = async () => {
    axios
      .get(`${PATH_URI}/contact`, {})
      .then((res) => {
        setContact(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getContactList();
  }, []);

  const handleDelete = (id) => {
    setLoading(true);

    axios
      .put(`${PATH_URI}/contact/delete`, { id })
      .then((res) => {
        setContact([]);
        getContactList();
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  let j = 1;

  if (add === true) {
    var details = <CreateContact showChange={showChange} />;
  } else if (update === true) {
    details = <UpdateContact id={id} showChange={showChange} />;
  } else {
    details = (
      <div className="content">
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="main-content">
            <div className="row">
              <div className="col-12">
                <div className="my-4">
                  <Button
                    onClick={() => actionAdd()}
                    className="btn btn-success btn-sm mx-2"
                  >
                    Add New Contact
                  </Button>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Contact-List</h4>
                  </div>
                  <Table
                    id="datatable"
                    className="table table-bordered dt-responsive  nowrap w-100"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Address</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contact &&
                        contact.map((item) => (
                          <tr key={item.id}>
                            <td>{j++}</td>
                            <td>{item.name}</td>
                            <td>{item.number}</td>
                            <td>{item.address}</td>
                            <td className="text-center">
                              <Button
                                onClick={() => actionUpdate(item._id)}
                                className="btn btn-sm btn-primary mx-2"
                              >
                                EDIT
                              </Button>

                              <Button
                                onClick={() => handleDelete(item._id)}
                                className="btn btn-sm btn-danger mx-2"
                              >
                                DELETE
                              </Button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>{details}</div>;
};

export default Contacts;
