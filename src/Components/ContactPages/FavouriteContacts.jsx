import React from "react";
import Contact from "./Contact";

const FavouriteContacts = (props) => {
  return (
    <div
      className="col-12 py-2"
      style={{ borderRadius: "10px", backgroundColor: "#323637" }}
    >
      <div className="text-center text-white-50">Favourite</div>
      <div className="p-2">
        {props.contacts.map((contact, index) => (
          <Contact
            contact={contact}
            key={index}
            favouriteClick={props.favouriteClick}
            deleteContact={props.deleteContact}
            updateClick={props.updateClick}
          />
        ))}
      </div>
    </div>
  );
};

export default FavouriteContacts;
