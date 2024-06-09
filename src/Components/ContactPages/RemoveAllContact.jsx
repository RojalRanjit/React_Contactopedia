import React from "react";

const RemoveAllContact = ({ deleteAllContacts }) => {
  return (
    <div>
      <button
        className="btn btn-danger form-control"
        onClick={deleteAllContacts}
      >
        Remove All
      </button>
    </div>
  );
};

export default RemoveAllContact;
