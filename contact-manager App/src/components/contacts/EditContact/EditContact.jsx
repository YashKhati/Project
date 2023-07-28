import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../NavBar/Spinner/Spinner";

const EditContact = () => {
  const navigate = useNavigate();
  const { contactId } = useParams();

  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    photo: "",
    mobile: "",
    email: "",
    company: "",
    title: "",
    groupId: "",
  });
  const [groups, setGroups] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await ContactService.getContact(contactId);
        const groupResponse = await ContactService.getGroups();
        setContact(response.data);
        setGroups(groupResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, [contactId]);

/*ensures that we are working with the 
  latest state when updating it */
 const updateInput = (event) => {
    const { name, value } = event.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await ContactService.updateContact(contact, contactId);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setErrorMessage(error.message);
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="mobile"
                        value={contact.mobile}
                        onChange={updateInput}
                        type="number"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateInput}
                        className="form-control"
                      >
                        <option value="">Select a Group</option>
                        {groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img src={contact.photo} alt="contact-img" className="img-fluid" />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EditContact;
