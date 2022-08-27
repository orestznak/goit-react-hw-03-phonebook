import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './Box';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Contacts } from 'components/Contacts/Contacts';
import { ContactAddForm } from 'components/ContactAddForm/ContactAddForm';
import { Filter } from 'components/Filter/Filter';
import { HeaderPhonebook,HeaderContacts } from './App.styled';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== id
      ),
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.target.value });
  };

  contactsChange = (name, number) => {
    this.setState(prevState => {
      if (
        prevState.contacts.find(contact =>
          contact.name.toLowerCase().includes(name.toLowerCase())
        )
      ) {
        return Notify.warning(`${name} is already in contacts`);
      }
      return {
        contacts: [
          ...prevState.contacts,
          { name: name, number: number, id: nanoid() },
        ],
      };
    });
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const contactsParse = JSON.parse(contacts);

    if (contactsParse) {
      this.setState({contacts : contactsParse});
    }


  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }

  }

  render() {
    return (
      <>
        <Box as="section"
          display="flex"
          flexDirection="column"
          alignItems="center"
          pb="16px"
          mt="16px"
          width="400px"
          border="1px solid #e66722"  
          borderRadius="16px"

          marginX="auto"
          >
            <HeaderPhonebook>Phonebook</HeaderPhonebook>
            <ContactAddForm contactsChange={this.contactsChange} />

            <HeaderContacts>Contacts</HeaderContacts>
            <Filter filterChange={this.filterChange} />

            <Contacts
              contacts={this.state.contacts}
              filter={this.state.filter}
              deleteContact={this.deleteContact}

            />
        </Box >
             </>
    );
  }
}