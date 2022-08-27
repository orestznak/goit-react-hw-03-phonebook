import React, { Component } from 'react';
import { Form,Label,Input,Button } from './ContactAddForm.styled';
import PropTypes from 'prop-types';

export class ContactAddForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    contactsChange: PropTypes.func.isRequired,
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.contactsChange(name, number);
    this.setState({ name: '', number: '' });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, number } = this.state;
    return (
      <Form
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <Label htmlFor="name">
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label htmlFor="number">
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">
          Add contact
        </Button>
      </Form>
    );
  }
}