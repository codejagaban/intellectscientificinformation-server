import sgMail from '@sendgrid/mail';
import express from 'express';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);




export const sendContactMail = (req, res) => {
    const { fullName, email, message } = req.body;


    const msg = {
        to: 'support@intellectscientificinformation.com',
        from: `${email}`,
        subject: 'Support Needed',
        html:` <p>Sender\'s Full Name: <strong>${fullName}</strong></p> <br/>
                <p>Sender\'s email Address : <strong>${email}</strong></p> <br/>
                <p>Message : ${message}</p> `,
    }
    sgMail.send(msg)
    .then(response => {
        res.status(201).json({ msg: 'Thank you, your message has been submitted, our support team will get in touch with you shortly', response })
    })
    .catch(err => {
        console.log({ err })
        res.status(500).json({ msg: 'Something went wrong, please try again later' })
    })

}


