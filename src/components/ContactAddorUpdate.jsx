import Modal from './Model';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { db } from '../config/firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const contactSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
});

const ContactAddorUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async contact => {
    try {
      const contactRef = collection(db, 'contents');
      await addDoc(contactRef, contact);
      toast.success('Contact Added Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, 'contents', id);
      await updateDoc(contactRef, contact);
      toast.success('Contact Updated Successfully');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchema}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: '', email: '' }
          }
          onSubmit={values => {
            console.log(values);
            isUpdate ? updateContact(values, contact.id) : addContact(values);
            onClose();
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="mb-4 flex flex-col gap-3">
              <label htmlFor="name">Name</label>
              <Field
                name="name"
                placeholder="Name"
                className="h-10 font-xl border rounded-lg p-2"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="mb-4 flex flex-col gap-3">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                placeholder="Email"
                className="h-10 font-xl border rounded-lg p-2"
              />
              <div className="text-red-500 text-sm">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button className="bg-orange border rounded-md px-2 py-1 self-end">
              {isUpdate ? 'Update Contact' : 'Add Contact'}
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default ContactAddorUpdate;
