import React, {useState} from 'react';

const appointmentTimeOfDay = startsAt => {
  const [hour,minute] = new Date(startsAt).toTimeString().split(':');
  return `${hour}:${minute}`; //template literal
};

export const Appointment = ({customer}) => <div>{customer.firstName}</div>;

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
