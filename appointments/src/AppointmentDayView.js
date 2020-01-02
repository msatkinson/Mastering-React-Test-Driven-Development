import React, {useState} from 'react';

const appointmentTimeOfDay = startsAt => {
  const [hour,minute] = new Date(startsAt).toTimeString().split(':');
  return `${hour}:${minute}`; //template literal
};

export const Appointment = ({customer, stylist, service, notes}) => (
  <div id='appointment'>
    <table>
      <tbody>
        <tr>
          <td>Customer</td>
          <td>{customer.firstName} {customer.lastName}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>{customer.phoneNumber}</td>
        </tr>
        <tr>
          <td>Stylist</td>
          <td>{stylist}</td>
        </tr>
        <tr>
          <td>Service</td>
          <td>{service}</td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>{notes}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const AppointmentsDayView = ({appointments}) => {

  const [selectedAppointment, setSelectedAppointment] = useState(0);

  return (
    <div id='appointmentsDayView'>
      <ol>
        {appointments.map((each, index) => <li key={each.startsAt}>
          <button type='button' onClick={() => setSelectedAppointment(index)}>
          {appointmentTimeOfDay(each.startsAt)}
          </button>
        </li>)}
      </ol>
        {appointments.length === 0 ? (<p>There are no appointments scheduled for today.</p>) :  (
          <Appointment {...appointments[selectedAppointment]} />
        )}
    </div>
  )
};
