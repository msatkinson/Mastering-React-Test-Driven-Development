import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {Appointment, AppointmentsDayView} from '../src/AppointmentDayView.js';

describe('Appointment', () => {
  let customer;
  let container;
  beforeEach(() => {
    container = document.createElement('div');
  });
  const render = component => {ReactDOM.render(component, container)};
  it('renders a table', () => {
    customer = {};

    render(<Appointment customer={customer}/>);

    expect(container.querySelector('#appointment > table')).not.toBeNull();
  });
  it('renders the customer first name', () => {
    customer = {firstName: 'Ashley'};

    render(<Appointment customer={customer}/>);

    expect(container.textContent).toMatch('Ashley');
  });
  it('renders another customer first name', () => {
    customer = {firstName: 'Jordan'};

    render(<Appointment customer={customer}/>);

    expect(container.textContent).toMatch('Jordan');
  });
  it('renders the customer last name', () => {
    customer = {lastName: 'Murray'};

    render(<Appointment customer={customer} />);

    expect(container.textContent).toContain('Murray');
  });
  it('renders another customer last name', () => {
    customer = {lastName: 'Rafter'};

    render(<Appointment customer={customer} />);

    expect(container.textContent).toContain('Rafter');
  });
  it('renders the customer phone number', () => {
    customer = {phoneNumber: '555-1234156'};

    render(<Appointment customer={customer} />);

    expect(container.textContent).toContain('555-1234156');
  });
  it('renders another customer phone number', () => {
    customer = {phoneNumber: '555-987654'};

    render(<Appointment customer={customer} />);

    expect(container.textContent).toContain('555-987654');
  });
  it('renders the stylist name', () => {
    render(<Appointment customer={{}} stylist='Jason' />);

    expect(container.textContent).toContain('Jason');
  });
  it('renders another stylist name', () => {
    render(<Appointment customer={{}} stylist='Mia' />);

    expect(container.textContent).toContain('Mia');
  });
  it('renders the service', () => {
    render(<Appointment customer={{}} service='Cut' />);

    expect(container.textContent).toContain('Cut');
  });
  it('renders another service', () => {
    render(<Appointment customer={{}} service='Blow Dry' />);

    expect(container.textContent).toContain('Blow Dry');
  });
  it('renders the appointment notes', () => {
    render(<Appointment customer={{}} notes='soap allergy' />);

    expect(container.textContent).toContain('soap allergy');
  });
  it('renders another appointment notes', () => {
    render(<Appointment customer={{}} notes='a note' />);

    expect(container.textContent).toContain('a note');
  });

});
describe('AppointmentsDayView', () => {
  let container;
  const today = new Date();
  const appointments = [
    {startsAt: today.setHours(12,0),
     customer: {firstName: 'Ashley'}},
    {startsAt: today.setHours(13,0),
     customer: {firstName: 'Jordan'}}];

  beforeEach(() => {
    container = document.createElement('div');
  });

  const render = component => {ReactDOM.render(component, container)};

  it('renders a div with the right id', () => {
    render(<AppointmentsDayView appointments={[]}/>);
    expect(container.querySelector('div#appointmentsDayView')).not.toBeNull();
  });
  it('renders multiple appointments in an ol element', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelector('ol')).not.toBeNull();
    expect(container.querySelector('ol').children).toHaveLength(2);
  });
  it('renders each appointment in a li', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('12:00');
    expect(container.querySelectorAll('li')[1].textContent).toEqual('13:00');
  });
  it('initally shows a message saying there are no appointments today', () => {
    render(<AppointmentsDayView appointments={[]}/>);

    expect(container.textContent).toMatch('There are no appointments scheduled for today');
  });
  it('selects the first appointment by default', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.textContent).toMatch('Ashley');
  });
  it('has a button element in each li', () => {
    render(<AppointmentsDayView appointments={appointments} />);

    expect(container.querySelectorAll('li > button')).toHaveLength(2); //example of CSS Child Combinator
    expect(container.querySelectorAll('li > button')[0].type).toEqual('button');
  });
  it('renders another appointment when selected', () => {
    render(<AppointmentsDayView appointments={appointments} />);
    const button = container.querySelectorAll('button')[1];

    ReactTestUtils.Simulate.click(button);

    expect(container.textContent).toMatch('Jordan');
  });
});