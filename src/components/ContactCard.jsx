import { deleteDoc, doc } from 'firebase/firestore';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { IoMdTrash } from 'react-icons/io';
import { RiEditCircleLine } from 'react-icons/ri';
import { db } from '../config/firebase';
import useDisclouse from '../hooks/useDisclouse';
import ContactAddorUpdate from './contactAddorUpdate';
import { toast } from 'react-toastify';

const ContactCard = ({ contact }) => {
  const { isOpen, onOpen, onClose } = useDisclouse();

  const deleteContact = async id => {
    try {
      await deleteDoc(doc(db, 'contents', id));
      toast.success('Contact Deleted Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-yellow flex justify-between items-center rounded-lg p-2 my-2 "
      >
        <div className="flex gap-2 items-center">
          <HiOutlineUserCircle className="text-[#F6820C] text-5xl" />
          <div>
            <h2 className="text-xl font-bold">{contact.name}</h2>
            <p className="">{contact.email}</p>
          </div>
        </div>
        <div className="flex">
          <RiEditCircleLine
            onClick={onOpen}
            className="cursor-pointer text-4xl"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="cursor-pointer  text-4xl text-[#5F00D9]"
          />
        </div>
      </div>
      <ContactAddorUpdate
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
