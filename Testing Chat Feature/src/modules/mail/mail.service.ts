import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, Injectable } from "@nestjs/common";
import { stringEncode } from "../../common/utils";
import * as SendGrid from "@sendgrid/mail";
import { ResponseCode } from "src/exceptions";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {
    SendGrid.setApiKey(
      "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"
    );
  }

  async sendUserConfirmation(user: any, token: string) {
    const encoded = stringEncode(user.email, 5);
    const url = "http://localhost:3000/auth/" + encoded;
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: "Welcome to  App! Confirm your Email",
      template: "email", // `.hbs` extension is appended automatically
      context: {
        //  filling curly brackets with content
        name: user.name,
        url,
        token,
        email: user.email,
      },
    });
  }

  async sendForgetPasswordEmail(user: any) {
    const mail = {
      to: user.email,
      subject: "Forget Password Confirm your Email",
      from: "support@taskruns.com", // Fill it with your validated email on SendGrid account
      text: "Hello",
      html: `<p>Thanks for requesting password reset for Task Runs!</p>

      <p>Please enter the following verification code into the application to complete the password reset:</p>
      <strong>${user.otp}</strong>
      <p><strong>Why you received this email:</strong></p>
  
      <p>Task Runs requires verification in order to reset your password.</p>
  
      <p>If you did not make this request, you can ignore this email.</p>
  
      <p>Best regards,<br>Task Runs Team</p>`,
    };
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`);
    if (transport[0].statusCode === 202) {
      return `E-Mail sent to ${mail.to}`;
    }
    throw new HttpException("Email not sent", ResponseCode.BAD_REQUEST);
  }
  async sendVerifyEMailEmail(user: any) {
    const mail = {
      to: user.email,
      subject: "Email verification",
      from: {
        name: "Task Runs",
        email: "support@taskruns.com",
      },
      text: "Hello",
      html: ` <p>Thanks for registering with Task Runs!</p>

      <p>Please enter the following verification code into the application to complete the registration process: </p>
      <strong>${user.otp}</strong>
      <p><strong>Why you received this email:</strong></p>
  
      <p>Task Runs requires verification whenever an email address is entered during a new account creation. Your account cannot be used until you verify it.</p>
  
      <p>If you did not make this request, you can ignore this email. No account will be created without verification.</p>
  
      <p>Best regards,<br>Task Runs Team</p>`,
      // html: `<h1>otp: ${user.otp}</h1>`,
    };
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`);
    if (transport[0].statusCode === 202) {
      return `E-Mail sent to ${mail.to}`;
    }
    throw new HttpException("Email not sent", ResponseCode.BAD_REQUEST);
  }
  //Wrote this new function for resending otp
  async ResendOtp(user: any) {
    const mail = {
      to: user.email,
      subject: "Resending Otp Please Confirm your Email",
      from: "support@taskruns.com", // Fill it with your validated email on SendGrid account
      text: "Hello",
      html: `<p>Thanks for registering with Task Runs!</p>

      <p>Please enter the following verification code into the application to verify your Account with Task Runs:</p>
      <strong>${user.otp}</strong>
      <p><strong>Why you received this email:</strong></p>
  
      <p>Task Runs requires verification in order register your account.</p>
  
      <p>If you did not make this request, you can ignore this email.</p>
  
      <p>Best regards,<br>Task Runs Team</p>`,
    };
    const transport = await SendGrid.send(mail);
    // avoid this on production. use log instead :)
    console.log(`E-Mail sent to ${mail.to}`);
    if (transport[0].statusCode === 202) {
      return `E-Mail sent to ${mail.to}`;
    }
    throw new HttpException("Email not sent", ResponseCode.BAD_REQUEST);
  }
}
