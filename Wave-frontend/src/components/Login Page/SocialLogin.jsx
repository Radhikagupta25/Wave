import { GoogleLogin } from "@react-oauth/google";

const SocialLogin = ({
    onGoogleSuccess,
    text = "Continue with Google",
}) => {
    return (
        <div className="mt-6">
            <GoogleLogin
                text={text}
                onSuccess={onGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
            />
        </div>
    );
};

export default SocialLogin;