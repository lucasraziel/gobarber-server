import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find((appointment) =>
    isEqual(appointment.date, parsedDate)
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({
      error: 'This appointment is not available',
    });
  }

  const appointment = new Appointment(provider, date);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;
