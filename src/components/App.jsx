import { useEffect, useState, useRef } from 'react';
import css from './app.module.css';
import { ContactForm } from './сontactForm/ContactForm';
import { ContactList } from './contactList/ContactList';
import { Filter } from './filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const onContactsMountRef = useRef(false);

  useEffect(() => {
    try {
      const storageContacts = JSON.parse(localStorage.getItem('contacts'));
      if (storageContacts) {
        setContacts(storageContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (onContactsMountRef.current === false) {
      onContactsMountRef.current = true;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = contact => {
    if (contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
  };

  const updateFilter = filter => {
    setFilter(filter);
  };

  const handleDeleteItems = id => {
    setContacts(prevState => {
      return prevState.filter(element => element.id !== id);
    });
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  };

  return (
    <div className={css.div}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm handleSubmit={handleSubmit} contacts={contacts} />
      <h2 className={css.title}>Contacts</h2>
      <Filter updateFilter={updateFilter} />
      <ContactList
        visibleContacts={getVisibleContacts()}
        handleDeleteItems={handleDeleteItems}
      />
    </div>
  );
};
