import './App.css';
import Navbar from './components/navbar';
import { FiSearch } from 'react-icons/fi';
import { AiFillPlusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import ContactCard from './components/contactCard';
import ContactAddorUpdate from './components/contactAddorUpdate';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyContact from './components/EmptyContact';

function App() {
  const [contacts, setContacts] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclouse();

  useEffect(() => {
    const getcontacts = async () => {
      try {
        const contactsRef = collection(db, 'contents');

        onSnapshot(contactsRef, snapshot => {
          const contactLists = snapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getcontacts();
  }, []);

  const filterdContact = e => {
    const value = e.target.value;

    const contactsRef = collection(db, 'contents');

    onSnapshot(contactsRef, snapshot => {
      const contactLists = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterdContacts = contactLists.filter(contact =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filterdContacts);
      return filterdContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />

        <div className="flex gap-2 items-center my-4">
          <div className="relative flex flex-grow items-center">
            <FiSearch className="absolute ml-2 text-2xl text-white" />
            <input
              onChange={filterdContact}
              type="text"
              className="flex-grow h-10 text-lg text-white pl-10 rounded-lg bg-transparent border border-white"
              placeholder="Search Contact"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            size={44}
            className="cursor-pointer text-white"
          />
        </div>

        <div>
          {contacts.length <= 0 ? (
            <EmptyContact />
          ) : (
            contacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>

      <ContactAddorUpdate isOpen={isOpen} onClose={onClose} />

      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
