import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button } from "react-bootstrap";

const CreateContact = ({ showChange }) => {
  const PATH_URI = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState({
    name: "",
    number: "",
    address: "",
  });

  const { name, number, address } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name !== "" ||
      name !== undefined ||
      name != null ||
      number !== "" ||
      number !== undefined ||
      number != null
    ) {
      setLoading(true);
      axios
        .post(`${PATH_URI}/contact`, {
          name,
          number,
          address,
        })
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.Message);
        });
    }
    showChange();
  };

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container-fluid">
          <div className="my-4">
            <Button
              onClick={() => showChange()}
              className="btn btn-sm btn-warning mx-2"
            >
              Back
            </Button>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Add New Contact</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group m-2">
                      <label>Name: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Name"
                        value={state.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group m-2">
                      <label>Number: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="number"
                        placeholder="Contact Number"
                        value={state.number}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group m-2">
                      <label>Address: </label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="Address"
                        value={state.address}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group m-2 mt-4">
                      <input
                        type="submit"
                        value="Add New Contact"
                        className="btn btn-primary"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContact;
