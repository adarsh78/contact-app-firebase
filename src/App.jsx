import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import { CiSearch } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./Components/ContactCard";
import AddAndUpdateContact from "./Components/AddAndUpdateContact";
import useDisclose from "./Hooks/useDisclose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./Components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const { onClose, onOpen, isOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative flex-grow items-center">
            <CiSearch className="text-white text-3xl absolute ml-1" />
            <input
            onChange={filterContacts}
              type="text"
              className="flex-grow bg-transparent border border-white rounded-md h-10 text-white pl-10"
            />
          </div>
          <CiCirclePlus
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <=0 ? <NotFoundContact /> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
