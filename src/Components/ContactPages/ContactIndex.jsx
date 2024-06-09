import React, { useState } from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import AddRandomContact from "./AddRandomContact";
import RemoveAllContact from "./RemoveAllContact";
import AddContact from "./AddContact";
import GeneralContacts from "./GeneralContacts";
import FavouriteContacts from "./FavouriteContacts";

const ContactIndex = () => {
  const [contactList, setContactList] = useState([
    {
      id: 1,
      name: "Peter Parker",
      email: "peter@spiderman.com",
      phone: "465-754-648187",
      isFavourite: true,
    },
    {
      id: 2,
      name: "Ben Parker",
      email: "ben@spiderman.com",
      phone: "754-868-784259",
      isFavourite: false,
    },
    {
      id: 3,
      name: "Mary Jane Watson",
      email: "mj@spiderman.com",
      phone: "069-690-696969",
      isFavourite: true,
    },
  ]);
  const [selectedContact, setSelectedContact] = useState(undefined);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAddContact = (newContact) => {
    if (newContact.name === "") {
      return { status: "faiure", msg: "Please Enter a Valid Name" };
    } else if (newContact.email === "") {
      return { status: "faiure", msg: "Please Enter a Valid Email" };
    } else if (newContact.phone === "") {
      return { status: "faiure", msg: "Please Enter a Valid Phone No" };
    }
    const duplicateRecord = contactList.some(
      (x) => x.email === newContact.email || x.phone === newContact.phone
    );
    if (duplicateRecord) {
      return { status: "failure", msg: "Duplicate Record" };
    } else {
      const latestContact = {
        ...newContact,
        id: contactList[contactList.length - 1].id + 1,
        isFavourite: false,
      };
      setContactList((prevContactList) => {
        return [...prevContactList, latestContact];
      });
      return { status: "success", msg: "Contact was added successfully" };
    }
  };
  // //Using Push Method
  // const handleAddContact = (newContact) => {
  //   const latestContact = {
  //     ...newContact,
  //     id:
  //       contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1,
  //     isFavourite: false,
  //   };

  //   setContactList((prevContactList) => {
  //     const updatedContactList = [...prevContactList];
  //     updatedContactList.push(latestContact);
  //     console.log(prevContactList);
  //     console.log(latestContact);
  //     return updatedContactList;
  //   });

  //   alert("New contact added!");
  // };

  // const handleAddContact = (newContact) => {
  //   const latestContact = {
  //     ...newContact,
  //     id:
  //       contactList.length > 0 ? contactList[contactList.length - 1].id + 1 : 1,
  //     isFavourite: false,
  //   };
  //   setContactList((prevContactList) => [...prevContactList, latestContact]);
  //   alert("New contact added!");
  // };
  const handleToggleFavourite = (contact) => {
    setContactList((prevContactList) => {
      return prevContactList.map((obj) => {
        if (obj.id === contact.id) {
          return { ...obj, isFavourite: !obj.isFavourite };
        }
        return obj;
      });
    });
  };
  const handleAddRandomContact = (newContact) => {
    const latestContact = {
      id: contactList[contactList.length - 1].id + 1,
      ...newContact,
      isFavourite: false,
    };
    setContactList((prevContactList) => {
      return [...prevContactList, latestContact];
    });
  };

  const handleUpdateClick = (contact) => {
    console.log(contact);
    // Update state variables separately
    setSelectedContact(contact);
    setIsUpdating(true);
  };
  const handleCancelUpdateContact = (contact) => {
    console.log(contact);
    setSelectedContact(undefined);
    setIsUpdating(false);
  };
  const handleUpdateContact = (updateContact) => {
    console.log(updateContact);
    if (updateContact.name === "") {
      return { status: "faiure", msg: "Please Enter a Valid Name" };
    } else if (updateContact.email === "") {
      return { status: "faiure", msg: "Please Enter a Valid Email" };
    } else if (updateContact.phone === "") {
      return { status: "faiure", msg: "Please Enter a Valid Phone No" };
    }
    setContactList((prevContactList) => {
      return prevContactList.map((obj) => {
        if (obj.id === updateContact.id) {
          return {
            ...obj,
            name: updateContact.name,
            email: updateContact.email,
            phone: updateContact.phone,
          };
        }
        return obj;
      });
    });

    setIsUpdating(false);
    setSelectedContact(undefined);
    return { status: "success", msg: "Contact was updated successfully" };
  };
  const handleDeleteContact = (contactId) => {
    setContactList((prevContactList) => {
      return prevContactList.filter((obj) => obj.id !== contactId);
    });
  };
  const handleDeleteAllContacts = () => {
    setContactList([]);
  };
  return (
    <div>
      <Header />
      <div className="container" style={{ minHeight: "85vh" }}>
        <div className="row py-3">
          <div className="col-4 offset-2 row">
            <AddRandomContact addRandomContact={handleAddRandomContact} />
          </div>
          <div className="col-4 row">
            <RemoveAllContact deleteAllContacts={handleDeleteAllContacts} />
          </div>
          <div className="row py-2">
            <div className="col-8 offset-2 row">
              <AddContact
                handleAddContact={handleAddContact}
                isUpdating={isUpdating}
                selectedContact={selectedContact}
                cancelUpdateContact={handleCancelUpdateContact}
                handleUpdateContact={handleUpdateContact}
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-8 offset-2 row">
              <FavouriteContacts
                contacts={contactList.filter((u) => u.isFavourite)}
                favouriteClick={handleToggleFavourite}
                deleteContact={handleDeleteContact}
                updateClick={handleUpdateClick}
                handleUpdateContact={handleUpdateContact}
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-8 offset-2 row">
              <GeneralContacts
                contacts={contactList.filter((u) => !u.isFavourite)}
                favouriteClick={handleToggleFavourite}
                deleteContact={handleDeleteContact}
                updateClick={handleUpdateClick}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactIndex;
