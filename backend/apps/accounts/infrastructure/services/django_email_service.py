import os
import resend

from apps.accounts.domain.services.email_service import EmailService


class DjangoEmailService(EmailService):

    def send_otp(self, email: str, otp: str):

        subject = "Your Task Management App Verification Code"

        text_message = (
            f"Your Task Management App verification code is {otp}.\n\n"
            "This OTP is valid for 5 minutes.\n\n"
            "If you did not request this code, you can safely ignore this email."
        )

        html_message = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Task Management App - OTP</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f8fafc;
            font-family: Arial, Helvetica, sans-serif;
        ">

            <div style="
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                border-radius: 16px;
                overflow: hidden;
                border: 1px solid #e2e8f0;
            ">

                <!-- Header -->
                <div style="
                    background-color: #FF5232;
                    padding: 28px 30px;
                    text-align: center;
                ">
                    <h1 style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 24px;
                    ">
                        Task Management App
                    </h1>

                    <p style="
                        margin: 8px 0 0;
                        color: #ffe8e2;
                        font-size: 14px;
                    ">
                        Secure account verification
                    </p>
                </div>

                <!-- Content -->
                <div style="padding: 35px 30px;">

                    <h2 style="
                        margin: 0 0 15px;
                        color: #0f172a;
                        font-size: 20px;
                    ">
                        Your Verification Code
                    </h2>

                    <p style="
                        color: #475569;
                        font-size: 15px;
                        line-height: 1.6;
                    ">
                        Hello,
                    </p>

                    <p style="
                        color: #475569;
                        font-size: 15px;
                        line-height: 1.6;
                    ">
                        We received a request to verify your email address
                        for your <strong>Task Management App</strong> account.
                        Use the verification code below to continue.
                    </p>

                    <!-- OTP -->
                    <div style="
                        margin: 30px 0;
                        padding: 20px;
                        background-color: #fff7f5;
                        border: 1px solid #ffd8d0;
                        border-radius: 12px;
                        text-align: center;
                    ">

                        <p style="
                            margin: 0 0 10px;
                            color: #64748b;
                            font-size: 13px;
                        ">
                            Your OTP
                        </p>

                        <div style="
                            font-size: 32px;
                            font-weight: bold;
                            letter-spacing: 8px;
                            color: #FF5232;
                        ">
                            {otp}
                        </div>

                    </div>

                    <!-- Expiry -->
                    <p style="
                        color: #475569;
                        font-size: 14px;
                        line-height: 1.6;
                    ">
                        <strong>Important:</strong> This verification code
                        will expire in <strong>5 minutes</strong>.
                    </p>

                    <p style="
                        color: #64748b;
                        font-size: 14px;
                        line-height: 1.6;
                    ">
                        For your security, please do not share this code
                        with anyone.
                    </p>

                    <hr style="
                        margin: 30px 0;
                        border: 0;
                        border-top: 1px solid #e2e8f0;
                    ">

                    <p style="
                        margin: 0;
                        color: #94a3b8;
                        font-size: 13px;
                        line-height: 1.5;
                    ">
                        If you did not request this verification code,
                        you can safely ignore this email. Your account
                        remains secure.
                    </p>

                </div>

                <!-- Footer -->
                <div style="
                    background-color: #f8fafc;
                    padding: 20px 30px;
                    text-align: center;
                ">
                    <p style="
                        margin: 0;
                        color: #94a3b8;
                        font-size: 12px;
                    ">
                        © 2026 Task Management App. All rights reserved.
                    </p>
                </div>

            </div>

        </body>
        </html>
        """

        resend.api_key = os.environ["RESEND_API_KEY"]

        resend.Emails.send({
            "from": "Task Management App <onboarding@resend.dev>",
            "to": [email],
            "subject": subject,
            "text": text_message,
            "html": html_message,
        })