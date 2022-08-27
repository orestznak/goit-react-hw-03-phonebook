import React from 'react';
import { Button, ContactItem } from './Contact.styled';
import PropTypes from 'prop-types';

export const Contact = ({ deleteContact, name, number, id }) => {
  return (
    <ContactItem>
      {name}: {number}
      <Button
        type="button"
        id={id}
        onClick={() => deleteContact(id)}      
      >
        Delete
      </Button>
    </ContactItem>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};