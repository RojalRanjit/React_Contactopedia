import React, { useEffect, useState } from "react";

const AddContact = ({
  handleUpdateContact,
  handleAddContact,
  isUpdating,
  selectedContact,
  cancelUpdateContact,
}) => {
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [successMessage, setSuccessMessage] = useState(undefined);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    if (isUpdating && selectedContact) {
      setFormState({
        name: selectedContact.name,
        email: selectedContact.email,
        phone: selectedContact.phone,
      });
    } else {
      setFormState({
        name: "",
        email: "",
        phone: "",
      });
    }
  }, [isUpdating, selectedContact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const response = isUpdating
      ? handleUpdateContact({ id: selectedContact.id, ...formState })
      : handleAddContact(formState);

    if (response.status === "success") {
      setErrorMessage(undefined);
      setSuccessMessage(response.msg);
      setFormState({ name: "", email: "", phone: "" });
    } else {
      setErrorMessage(response.msg);
      setSuccessMessage(undefined);
    }
  };

  // const handleAddContactFormSubmit = (e) => {
  //   e.preventDefault();
  //   const id = e.target.elements.contactId.value.trim();
  //   const name = e.target.elements.contactName.value.trim();
  //   const email = e.target.elements.contactEmail.value.trim();
  //   const phone = e.target.elements.contactPhone.value.trim();
  //   let response = undefined;
  //   if (isUpdating) {
  //     response = handleUpdateContact({
  //       id: id,
  //       name: name,
  //       email: email,
  //       phone: phone,
  //     });
  //   } else {
  //     response = handleAddContact({
  //       name: name,
  //       email: email,
  //       phone: phone,
  //     });
  //   }
  //   if (response.status === "success") {
  //     setErrorMessage(undefined);
  //     setSuccessMessage(response.msg);
  //     document.querySelector(".contact-form").reset();
  //   } else {
  //     setErrorMessage(response.msg);
  //     setSuccessMessage(undefined);
  //   }
  // };

  // return (
  //   <div className="border col-12 text-white p-2">
  //     <form onSubmit={handleAddContactFormSubmit} className="contact-form">
  //       <input
  //         hidden
  //         name="contactId"
  //         defaultValue={isUpdating ? selectedContact.id : ""}
  //       />
  //       <div className="row p-2">
  //         <div className="col-12 text-white-50">
  //           {isUpdating ? "Update Contact" : "Add New Contact"}
  //         </div>
  //         <div className="col-12 col-md-4 p-1">
  //           <input
  //             type="text"
  //             className="form-control form-control-sm"
  //             placeholder="Name.."
  //             name="contactName"
  //             defaultValue={isUpdating ? selectedContact.name : ""}
  //           />
  //         </div>
  //         <div className="col-12 col-md-4 p-1">
  //           <input
  //             type="text"
  //             className="form-control form-control-sm"
  //             placeholder="Email.."
  //             name="contactEmail"
  //             defaultValue={isUpdating ? selectedContact.email : ""}
  //           />
  //         </div>
  //         <div className="col-12 col-md-4 p-1">
  //           <input
  //             type="text"
  //             className="form-control form-control-sm"
  //             placeholder="Phone.."
  //             name="contactPhone"
  //             defaultValue={isUpdating ? selectedContact.phone : ""}
  //           />
  //         </div>
  //         {errorMessage && (
  //           <div className="col-12 text-danger text-center mt-2">
  //             {errorMessage}
  //           </div>
  //         )}
  //         {successMessage && (
  //           <div className="col-12 text-success text-center mt-2">
  //             {successMessage}
  //           </div>
  //         )}
  //         <div
  //           className={`col-12 p-1 ${
  //             isUpdating ? "col-md-4 offset-md-2" : "col-md-6 offset-md-3"
  //           }`}
  //         >
  //           <button className="btn btn-primary form-control">
  //             {isUpdating ? "Update" : "Create"}
  //           </button>
  //         </div>
  //         {isUpdating ? (
  //           <div className="col-12 col-md-4 p-1" onClick={cancelUpdateContact}>
  //             <button className="btn btn-secondary form-control">Cancel</button>
  //           </div>
  //         ) : (
  //           ""
  //         )}
  //       </div>
  //     </form>
  //   </div>
  // );
  return (
    <div className="border col-12 text-white p-2">
      <form onSubmit={handleFormSubmit} className="contact-form">
        <div className="row p-2">
          <div className="col-12 text-white-50">
            {isUpdating ? "Update Contact" : "Add New Contact"}
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Name.."
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              type="email"
              className="form-control form-control-sm"
              placeholder="Email.."
              name="email"
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12 col-md-4 p-1">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Phone.."
              name="phone"
              value={formState.phone}
              onChange={handleInputChange}
            />
          </div>
          {errorMessage && (
            <div className="col-12 text-danger text-center mt-2">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="col-12 text-success text-center mt-2">
              {successMessage}
            </div>
          )}
          <div
            className={`col-12 p-1 ${
              isUpdating ? "col-md-4 offset-md-2" : "col-md-6 offset-md-3"
            }`}
          >
            <button className="btn btn-primary form-control">
              {isUpdating ? "Update" : "Create"}
            </button>
          </div>
          {isUpdating && (
            <div className="col-12 col-md-4 p-1">
              <button
                type="button"
                className="btn btn-secondary form-control"
                onClick={cancelUpdateContact}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddContact;
