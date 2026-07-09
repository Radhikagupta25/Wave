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

                <div style="background:#ffffff;border:2px dashed #111827;padding:18px;border-radius:10px;margin:25px 0;text-align:center;">
                    <p style="margin:0;color:#94A3B8;font-size:14px;">
                        Verification OTP
                    </p>

                    <h3 style="margin:12px 0;color:white;word-break:break-all;">
                        ${otp}
                    </h3>
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

export const sendResetPasswordEmail = async (email, otp) => {

    await transporter.sendMail({
        from: `"Wave" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Reset Your Wave Password",
        html: `
        <div style="max-width:900px;margin:40px auto;background:#0F172A;border:1px solid rgba(255,255,255,.08);border-radius:24px;overflow:hidden;font-family:Inter,Arial,sans-serif;">

            <div style="padding:50px 40px;text-align:center;">

                <div style="width:72px;height:72px;margin:0 auto 24px;background:linear-gradient(135deg,#22D3EE,#2563EB);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:34px;">
                    🔒
                </div>

                <h1 style="margin:0;color:#ffffff;font-size:34px;font-weight:800;">
                    Reset Your Password
                </h1>

                <p style="margin:18px auto 0;max-width:430px;color:#CBD5E1;font-size:16px;line-height:1.7;">
                    We received a request to reset the password for your
                    <strong style="color:#22D3EE;">Wave</strong> account.
                    Use the verification code below to continue.
                </p>

                <div style="background:#ffffff;border:2px dashed #111827;padding:18px;border-radius:10px;margin:25px 0;text-align:center;">
                    <p style="margin:0;color:#94A3B8;font-size:14px;">
                        Password reset code
                    </p>

                    <h3 style="margin:12px 0;color:white;word-break:break-all;">
                        ${otp}
                    </h3>
                </div>

                <p style="margin:0;color:#CBD5E1;font-size:15px;line-height:1.7;">
                    This verification code is valid for
                    <strong style="color:#ffffff;">10 minutes</strong>.
                </p>

                <p style="margin-top:12px;color:#94A3B8;font-size:14px;line-height:1.7;">
                    If you didn't request a password reset, you can safely ignore this email.
                    Your account will remain secure.
                </p>

                <div style="margin-top:35px;padding:18px;border-radius:16px;background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.15);">

                    <p style="margin:0;color:#CBD5E1;font-size:14px;">
                        <strong style="color:#22D3EE;">Security Tip:</strong><br>
                        Never share this verification code with anyone.
                        Wave will never ask you for your OTP via email, phone call, or message.
                    </p>

                </div>

            </div>

            <div style="padding:24px 40px;background:#020617;border-top:1px solid rgba(255,255,255,.08);text-align:center;">

                <p style="margin:0;color:#64748B;font-size:13px;">
                    Need help? Contact the Wave support team.
                </p>

                <p style="margin:16px 0 0;color:#94A3B8;font-size:13px;">
                    © ${new Date().getFullYear()} Wave • Ride the Wave 🌊
                </p>

            </div>

        </div>
        `
    });

};