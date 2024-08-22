import gmail from '@/assets/icons/gmail.png';
import brevo from '@/assets/icons/brevo.png';
import mailgun from '@/assets/icons/mailgun.png';
import sendgrid from '@/assets/icons/sendgrid.png';

import whatsapp from '@/assets/icons/whatsapp.png';
import slack from '@/assets/icons/slack.png';
import twilio from '@/assets/icons/twillio.webp';

const providers = {
    email: [
        {
            name: 'Gmail',
            icon: gmail, // Gmail icon
        },
        {
            name: 'Brevo',
            icon: brevo, // Brevo icon
        },
        {
            name: 'Mailgun',
            icon: mailgun, // Mailgun icon
        },
        {
            name: 'SendGrid',
            icon: sendgrid, // SendGrid icon
        },
    ],
    msg: [
        {
            name: 'WhatsApp',
            icon: whatsapp, // WhatsApp icon
        },
        {
            name: 'Slack',
            icon: slack, // Slack icon
        },
        {
            name: 'Twilio',
            icon: twilio, // Twilio icon
        },
    ]
}

export default providers;
