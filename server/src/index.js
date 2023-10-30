import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.post('/send-email', (req, res)=>{
    const {emailfrom, emailto, info} = req.body;

    const transporter = nodemailer.createTransport({
        // Configura tus credenciales de correo electrónico aquí
        service: "gmail",
        host: "smtp.example.com",
        port: 587,
        auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: emailfrom,
        to: emailto,
        subject: 'new pay',
        text: `name= ${info.name} - email= ${info.email}- country= ${info.country} - city= ${info.city} - adress= ${info.adress} - cell phone= ${info.phone}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send(error);
        } else {
            res.status(200).send("emails sends")
        }
    });
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
})

