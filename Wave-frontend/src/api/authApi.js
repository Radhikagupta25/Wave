import api from "../services/axios";

export const loginUser = (data) => {
    return api.post("/login", data);
};

export const registerUser = (data) => {
    return api.post("/register", data);
};

export const logoutUser = () => {
    return api.post("/logout");
};

export const refreshToken = () => {
    return api.post("/refreshToken")
}

export const getCurrentUser = () => {
    return api.get("/userDetails");
};

export const verifyEmail = (data) => {
    return api.post("/verify-email", data);
};

export const googleLogin = (idToken) => {
    return api.post("/google-login", {
        idToken,
    });
};

export const googleSignup = (idToken) => {
    return api.post("/google-signup", {
        idToken,
    });
};

export const forgotPassword = (data) => {
    return api.post("/forgotPassword", data);
};

export const resetPassword = (data) => {
    return api.post("/resetPassword", data);
};

export const resendVerificationOtp = (data) => {
    return api.post(
        "/resend-verification-otp",
        data
    );
};

export const searchUsers = (query) => {
    return api.get(`/search-users?query=${query}`);
};

export const blockUser = (userId) =>
    api.patch(`/block/${userId}`);

export const unblockUser = (userId) =>
    api.patch(`/unblock/${userId}`);

export const getUserProfile = async (userId) => {
    const { data } = await api.get(`/profile/${userId}`);
    return data.data;
};

export const updateUserDetails = async (payload) => {
    const { data } = await api.patch("/updateUserDetails", payload);
    return data.data;
};

export const updateUserAvatarImage = async (formData) => {
    const { data } = await api.patch("/updateImageFiles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
};