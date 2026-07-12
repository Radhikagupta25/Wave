import { GoogleLogin } from "@react-oauth/google";

const SocialLogin = ({
    onGoogleSuccess,
    text = "continue_with",
}) => {
    return (
        <div className="mt-6 flex justify-center">
            <GoogleLogin
                text={text}
                onSuccess={onGoogleSuccess}
                onError={() => console.log("Google Login Failed")}
                theme="filled_black"
                shape="pill"
                size="large"
                width="320"
            />
        </div>
    );
};

export default SocialLogin; 