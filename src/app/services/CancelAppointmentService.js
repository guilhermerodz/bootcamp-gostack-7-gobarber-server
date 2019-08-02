import User from '../models/User';
import Appointment from '../models/Appointment';

import Queue from '../../lib/Queue';

import CancellationMail from '../jobs/CancellationMail';

class CancelAppointmentService {
  async run({ provider_id, user_id }) {
    const appointment = await Appointment.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== user_id)
      throw new Error("You're not allowed to cancel this appointment.");

    if (appointment.canceled_at)
      throw new Error('This appointment is already canceled');

    if (!appointment.cancelable)
      throw new Error('You can only cancel appointments 2 hours in advance');

    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });
  }
}

export default new CancelAppointmentService();
