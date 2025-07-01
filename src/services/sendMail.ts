import nodemailer from 'nodemailer'

interface ImailInformation{
    to : string,
    subject : string,
    text : string
}

const sendMail = async (mailInformation: ImailInformation)=>{
    //mail pathauney logic
    //step 1 : create nodemailer transport --> config setup lai transport vaninxa
const transporter = nodemailer.createTransport({
        service : "gmail", //yahoo, hotmail haru ni support grxa
        auth : { //for sender ko gmail/password
            user : process.env.NODEMAILER_GMAIL,
            pass : process.env.NODEMAILER_APP_PASSWORD
        }
    })
    const mailFormatObject = {
        from : "Project SaaS",
        to : mailInformation.to,
        subject : mailInformation.subject,
        text : mailInformation.text    
    }
    try {
        await transporter.sendMail(mailFormatObject)
    } catch (error) {
        console.log(error);
    }
}
export default sendMail