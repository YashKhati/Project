import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../NavBar/Spinner/Spinner";

const ContactList = () => {
  // Initial state for the component
  const initialState = {
    loading: false,
    contacts: [],
    filterContacts: [],
    errorMessage: "",
  };

  // State variables using React hooks
  const [query, setQuery] = useState({
    text: ""
  });

  const [state, setState] = useState(initialState);

  // Effect hook to fetch contacts
  useEffect(() => {
    async function handleResp() {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filterContacts: response.data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    }

    handleResp();
  }, []);

  // Function to handle contact deletion
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filterContacts: response.data
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  // Function to handle search for contacts
  let searchContacts = (event) => {
    event.preventDefault();

    let theContacts = state.contacts.filter(contact => {
      return contact.name.toLowerCase().includes(query.text.toLowerCase());
    });

    setState({
      ...state,
      filterContacts: theContacts
    });
  };

  // Destructuring state variables for easier usage
  let { loading, filterContacts, errorMessage } = state;

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Search form */}
              <form className="row" onSubmit={searchContacts}>
                <div className="col d-flex align-items-center justify-content-center"> {/* Align input in the center */}
                  <div className="mb-2">
                    <input
                      type="text"
                      value={query.text}
                      name="text"
                      onChange={(event) => setQuery({ text: event.target.value })}
                      className="form-control"
                      placeholder="Search Names"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col d-flex align-items-center justify-content-center"> {/* Align button in the center */}
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Search"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Fixed "ADD NEW" button */}
      <div className="fixed-button">
        <Link to={"/contacts/add"} className="btn btn-circle btn-success">
          <i className="fa fa-plus"></i>
        </Link>
      </div>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {/* Contact list */}
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filterContacts.length > 0 &&
                  filterContacts.map((contact) => {
                    return (
                      <div className="col-md-4" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-4">
                                <img
                                  src={contact.photo}
                                  alt="Not Found"
                                  className="img-fluid contact-img"
                                />
                              </div>
                              <div className="col-8">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name :{" "}
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile :{" "}
                                    <span className="fw-bold">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email :{" "}
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-12 d-flex align-items-center justify-content-end">
                                {/* Links and button for view, edit, and delete */}
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1 me-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1 me-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => clickDelete(contact.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
