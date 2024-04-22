const nodemailer = require('nodemailer');
const emailTemplate =require( "../util/emailTemplet");
const User =require( "../models/users-schema");
const clientSiteBaseUrl=process.env.CLIENT_SITE_BASE_URL;
//NOTE - Send account verification Email.
 const sendAccountVerificationEmail = async (userId, VerificationToken, Email) => {
    const VerificationLink = `${clientSiteBaseUrl}/users/verify-email/${userId}/${VerificationToken}`
    
    const reason="active your account"
    SendEmail(Email, reason, VerificationLink, "5 minutes");

    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { AccountActiveToken: '' },
                { new: true }
            );
        } catch (error) {
            throw new Error("Some thing wrong.")
        }
    }, 5 * 60 * 1000);
}
//NOTE - Send forget password mail.
 const senForgotPasswordLink = async (userId, VerificationToken, Email) => {

    const VerificationLink = `${clientSiteBaseUrl}/users/reset-password/${userId}/${VerificationToken}`
        const reason="Reset your account password"

    SendEmail(Email, reason, VerificationLink, "20 minutes");

    setTimeout(async () => {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { AccountActiveToken: '' },
                { new: true }
            );
        } catch (error) {
            throw new Error("Some thing wrong.")
        }
    }, 20 * 60 * 1000);
}
//Note send email
 const SendEmail = async (userEmail, reason, link, linkAcitveTime) => {
    try {
        //NOTE - Create a new service which use nodemailer to send Email. 
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.QUIZZIFY_EMAIL || '',
                pass: process.env.QUIZZIFY_EMAIL_PASSWORD || ''
            }
        });

//NOTE - Create maliOption or email details - form,to,subject body.
        const mailOptions = {
            from: '"qizzify verify mail "' + process.env.QUIZZIFY_EMAIL || '',
            to: userEmail,
            subject: "Email from quizzify",
            text: "Welcome to quizzify",
            html: emailTemplate(link,linkAcitveTime,reason)
        
        };

        //NOTE - send Email use transport service
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                throw new Error(error.message)
            } else {
                // console.log('Email sent.');
            }
        });
    } catch (error) {
        throw new Error("Server Not response")
    }
}

module.exports={sendAccountVerificationEmail,senForgotPasswordLink,SendEmail}