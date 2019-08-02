import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import User from '../models/User';
import Appointment from '../models/Appointment';

import Notification from '../schemas/Notification';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /**
     * Check if provider_id is a provider
     */
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider)
      throw new Error({
        status: 400,
        message: 'You can only create appointments with providers',
      });

    if (user_id === provider_id)
      throw new Error({
        status: 400,
        message: "You can't create appointments with yourself",
      });

    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date()))
      throw new Error({
        status: 400,
        message: 'Past dates are not allowed',
      });

    /**
     * Check if date is unavailable
     */
    const checkDateIsUnavailable = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });

    if (checkDateIsUnavailable)
      throw new Error({
        status: 400,
        message: 'Appointment date is unavailable',
      });

    /**
     * Finally creates appointment
     */
    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    /** ;
     * Notify appointment provider
     */
    const user = await User.findByPk(user_id);
    const formattedDate = format(
      hourStart,
      "'dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}`,
      user: provider_id,
    });

    return appointment;
  }
}

export default new CreateAppointmentService();
