import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";
dotenv.config();

function ConfigurarEmail() : nodemailer.Transporter<SMTPTransport.SentMessageInfo> {

    const email = process.env.EMAIL;
    const senhaEmail = process.env.SENHA_EMAIL;

    return nodemailer.createTransport({
        host: "outlook.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: email,
            pass: senhaEmail
        }
    })
}

export async function EnviarEmailAprovacao(emailConta: string, nome: string, senha: string, codigo: string) : Promise<void> {
    const smtp = ConfigurarEmail()
    
    const email = process.env.EMAIL;
    const contaAprovada =  `<h3>
                                <strong>PARABÉNS ${nome}</strong>,
                                sua conta foi aprovada!
                            </h3>
                            <p>
                                Para dar continuidade com sua conta, peço que acesse o link abaixo para alterar sua senha de acesso!
                            </p>
                            <p>
                                Senha para primeiro acesso: ${senha}
                            </p>
                            <p>
                                CODIGO COLOCAR NA URL DPS: ${codigo}
                            </p>
                            <a href="https://www.google.com.br">Clique aqui!</a>  
                            <br/>
                            <br/>
                            <img 
                                src="cid:${email}"
                                alt="Imagem logo orion bank"
                                style="
                                    width: 350px; 
                                    height: 100px
                                ;" 
                            />`;

    const configEmail = {
        from: email,
        to: emailConta,
        subject: "Orion Bank - CONTA APROVADA",
        html: contaAprovada,
        attachments: [
            {
                filename: "logo-orion-bank.png",
                path: "src/Middleware/Logo/logo-orion-bank.png", 
                cid: email, 
            }
        ]
    }

   await smtp.sendMail(configEmail)
}

export async function EnviarEmailReprovacao(emailConta: string, nome: string) {
    const smtp = ConfigurarEmail()
    
    const email = process.env.EMAIL;
    const contaReprovada = `<h3>
                                <strong>Pedimos desculpa senhor/a ${nome}</strong>,
                                mas infelizmente nosso time de analistas, achou alguma inconsistência em seus dados!
                            </h3>
                            <br/>
                            <br/>
                            <img 
                                src="cid:${email}"
                                alt="Imagem logo orion bank"
                                style="
                                    width: 350px; 
                                    height: 100px
                                ;" 
                            />`

    const configEmail = {
        from: email,
        to: emailConta,
        subject: "Orion Bank - CONTA REPROVADA",
        html: contaReprovada,
        attachments: [
            {
                filename: "logo-orion-bank.png",
                path: "src/Middleware/Logo/logo-orion-bank.png", 
                cid: email, 
            }
        ]
    }

    await smtp.sendMail(configEmail)
}