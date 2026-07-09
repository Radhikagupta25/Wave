import { transporter } from "../utils/nodemailer.js";

export const sendVerificationEmail = async (email, otp) => {

    await transporter.sendMail({
        from: `"Wave" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verify your Wave account",
        html: `
        <div style="max-width:900px;margin:40px auto;background:#0F172A;border:1px solid rgba(255,255,255,.08);border-radius:24px;overflow:hidden;font-family:Inter,Arial,sans-serif;">

            <div style="padding:50px 40px;text-align:center;">

                <div style="width:72px;height:72px;margin:0 auto 24px;background:linear-gradient(135deg,#22D3EE,#2563EB);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;">
                    🌊
                </div>

                <h1 style="margin:0;color:#ffffff;font-size:34px;font-weight:800;">
                    Verify Your Email
                </h1>

                <p style="margin:18px auto 0;max-width:420px;color:#CBD5E1;font-size:16px;line-height:1.7;">
                    Welcome to <strong style="color:#22D3EE;">Wave</strong>.
                    Use the verification code below to activate your account and start connecting.
                </p>

                <div style="margin:42px auto;padding:24px;border-radius:20px;background:#111827;border:1px solid rgba(255,255,255,.08);">

                    <p style="margin:0 0 12px;color:#94A3B8;font-size:14px;letter-spacing:.08em;text-transform:uppercase;">
                        Verification Code
                    </p>

                    <divstyle="font-size:36px;font-weight:800; letter-spacing:6px;color:#22D3EE; white-space:nowrap; text-align:center;">
                    ${otp}
                    </div>

                </div>

                <p style="margin:0;color:#CBD5E1;font-size:15px;line-height:1.7;">
                    This code is valid for
                    <strong style="color:#ffffff;">10 minutes</strong>.
                </p>

                <p style="margin-top:10px;color:#94A3B8;font-size:14px;line-height:1.7;">
                    Never share this code with anyone.
                    Wave will never ask for your verification code.
                </p>

            </div>

            <div style="padding:24px 40px;background:#020617;border-top:1px solid rgba(255,255,255,.08);text-align:center;">

                <p style="margin:0;color:#64748B;font-size:13px;">
                    If you didn't create a Wave account, you can safely ignore this email.
                </p>

                <p style="margin:16px 0 0;color:#94A3B8;font-size:13px;">
                    © ${new Date().getFullYear()} Wave • Ride the Wave 🌊
                </p>

            </div>

        </div>
        `
    });

};

export const sendResetPasswordEmail = async (email, token) => {

    await transporter.sendMail({
        from: `"Auth API" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Password",
        html: `
            <div style="max-width:600px;margin:auto;padding:30px;font-family:Arial,sans-serif;background:#fafafa;border:1px solid #e5e5e5;border-radius:12px;">

                <h2 style="color:#222;margin-bottom:10px;">
                    Password Reset Request 
                </h2>

                <p style="color:#555;font-size:16px;line-height:1.6;">
                    We received a request to reset the password associated with your account.
                </p>

                <p style="color:#555;font-size:16px;">
                    Since the frontend is currently under development, use the reset token below while testing with Postman.
                </p>

                <div style="background:#ffffff;border:2px dashed #B8898E;padding:18px;border-radius:10px;margin:25px 0;text-align:center;">
                    <p style="margin:0;color:#888;font-size:14px;">
                        Password Reset Token
                    </p>

                    <h3 style="margin:12px 0;color:#B8898E;word-break:break-all;">
                        ${token}
                    </h3>
                </div>

                <p style="color:#555;font-size:15px;">
                    This token will expire in <strong>30 minutes</strong>.
                </p>

                <p style="color:#555;font-size:15px;">
                    Use the following endpoint in Postman:
                </p>

                <div style="background:#f3f3f3;padding:14px;border-radius:8px;font-family:monospace;word-break:break-all;">
                    POST /api/auth/users/resetPassword/&lt;YOUR_TOKEN&gt;
                </div>

                <p style="margin-top:20px;color:#555;font-size:15px;">
                    Example Request Body:
                </p>

                <div style="background:#f3f3f3;padding:14px;border-radius:8px;font-family:monospace;white-space:pre-wrap;">
{
    "password": "NewPassword123",
    "confirmPassword": "NewPassword123"
}
                </div>

                <p style="margin-top:25px;color:#888;font-size:14px;">
                    If you did not request a password reset, you can safely ignore this email. Your account will remain secure.
                </p>

                <hr style="margin:30px 0;border:none;border-top:1px solid #ddd;">

                <p style="color:#999;font-size:13px;text-align:center;">
                    MERN Auth API Template • Built with ❤️ by Radhika Gupta
                </p>

            </div>
        `


    });

};