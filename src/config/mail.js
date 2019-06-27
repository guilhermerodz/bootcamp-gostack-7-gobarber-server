export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '24e5e0a26431cc',
    pass: '85cd5bf6884238',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

// DEV ENVIRONMENT - Mailtrap
// PRODUCTION ENVIRONMENT - Amazon SES, Mailgun, Sparkpost, Mandril (Mailchimp)
