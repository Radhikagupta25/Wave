import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.auth.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import crypto from "crypto";
import { Resend } from 'resend';
import { sendVerificationEmail, sendResetPasswordEmail } from "../services/email.services.js";
import { verifyGoogleToken } from "../services/google.services.js";
import mongoose from "mongoose";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return {
            refreshToken,
            accessToken,
        }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    const { fullname, email, username, password } = req.body

    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        if (existedUser.isEmailVerified) {
            throw new ApiError(409, "User with email or username already exists");
        }
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const hashedOtp = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        existedUser.emailVerificationOtp = hashedOtp;
        existedUser.emailVerificationExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        await existedUser.save({
            validateBeforeSave: false,
        });

        await sendVerificationEmail(
            existedUser.email,
            otp
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    email: existedUser.email,
                },
                "Account already exists but email is not verified. A new OTP has been sent."
            )
        );
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    let avatar;
    if (avatarLocalPath) avatar = await uploadOnCloudinary(avatarLocalPath);

    const user = await User.create({
        fullname: fullname,
        avatar: avatar?.secure_url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    let otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();
    let hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    user.emailVerificationOtp = hashedOtp;
    user.emailVerificationExpiry = new Date(
        Date.now() + 10 * 60 * 1000
    );
    await user.save({
        validateBeforeSave: false
    });
    await sendVerificationEmail(
        user.email,
        otp
    );

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

})


const verifyEmail = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    const user = await User.findOne({
        email,
        emailVerificationOtp: hashedOtp,

        emailVerificationExpiry: {
            $gt: new Date()
        }

    });
    if (!user) throw new ApiError(400, "User can't be verified")
    user.isEmailVerified = true;
    user.emailVerificationOtp = undefined;
    user.emailVerificationExpiry = undefined;
    await user.save({
        validateBeforeSave: false
    });
    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "Email verified successfully"
        )
    )
})

const loginUser = asyncHandler(async (req, res) => {
    //req body -> data
    //enter username and password
    //check that an user with the provided deets is present in the database or not
    //if present -> user verified and login
    //generate access and refresh token
    // send these tokens as cookies 
    //if not present -> error-> provide valid credentials
    const { email, username, password } = req.body
    if (!username && !email) throw new ApiError(400, "username or email is required")
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) throw new ApiError(404, "User not found")
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) throw new ApiError(401, "Password is incorrect")
    if (!user.isEmailVerified) {
        throw new ApiError(
            401,
            "Please verify your email first."
        );
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
        new ApiResponse(
            200, {
            user: loggedInUser, accessToken, refreshToken
        },
            "User logged in successfully"
        )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id, {
        $set: {
            refreshToken: undefined
        }
    }, {
        new: true
    }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "User logged out successfully"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken ?? req.body?.refreshToken
    if (!incomingRefreshToken) throw new ApiError(401, "unauthorized request")
    try {
        const decodedToken = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken._id);
        if (!user) throw new ApiError(401, "Invalid refresh token")
        if (incomingRefreshToken !== user?.refreshToken) throw new ApiError(401, "Refresh token is expired or used")
        const options = {
            httpOnly: true,
            secure: true,
        }
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id);
        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
            new ApiResponse(
                200,
                { accessToken, refreshToken: newRefreshToken },
                "Access token refreshed successfully"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")
    }
})

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword, confNewPassword } = req.body
    if (!(newPassword === confNewPassword)) throw new ApiError(400, "New passwords doesn't match")
    const user = await User.findOne(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) throw new ApiError(400, "Invalid old password")
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(
        new ApiResponse(200, {}, "Password changed succesfully")
    )

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            req.user,
            "Current user fetched successfully")
    )
})

const updateUserDetails = asyncHandler(async (req, res) => {
    const { username, email, fullname } = req.body
    if (!username && !email && !fullname) throw new ApiError(400, "All the fields are empty")
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                email,
                username
            }
        },
        {
            new: true
        }
    ).select("-password")
    return res.status(200).json(
        new ApiResponse(200, user, "Account details updated successfully")
    )
})

const updateUserAvatarImage = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(
            400,
            "Please provide avatar image"
        );
    }
    let avatar;
    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath);
    }
    if (avatarLocalPath && !avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }
    const updateData = {};
    if (avatar) {
        updateData.avatar = avatar.url;
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id, {
        $set: updateData
    }, {
        new: true
    }
    ).select("-password")
    return res.status(200).json(
        new ApiResponse(200, user, "File updated successfully")
    )
})

const deleteAccount = asyncHandler(async (req, res) => {

    const { password } = req.body;

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid password");
    }

    await User.findByIdAndDelete(user._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "Account deleted successfully"
            )
        );

});

const googleLogin = asyncHandler(async (req, res) => {

    const { idToken } = req.body;

    if (!idToken) {
        throw new ApiError(400, "Google ID Token is required");
    }

    const googleUser = await verifyGoogleToken(idToken);

    const user = await User.findOne({
        email: googleUser.email,
    });

    if (!user) {
        throw new ApiError(
            404,
            "No registered account found with this Google account. Please sign up first."
        );
    }

    if (user.provider !== "google") {
        throw new ApiError(
            400,
            "This account was created using email and password. Please login using your password."
        );
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "Google login successful"
            )
        );
});

const googleSignup = asyncHandler(async (req, res) => {

    const { idToken } = req.body;

    if (!idToken) {
        throw new ApiError(400, "Google ID Token is required");
    }

    const googleUser = await verifyGoogleToken(idToken);

    const existingUser = await User.findOne({
        email: googleUser.email,
    });

    if (existingUser) {
        throw new ApiError(
            409,
            "An account already exists with this email. Please sign in."
        );
    }

    const username =
        googleUser.email.split("@")[0] +
        Math.floor(Math.random() * 10000);

    const user = await User.create({
        fullname: googleUser.fullname,
        username,
        email: googleUser.email,
        avatar: googleUser.avatar,
        googleId: googleUser.googleId,
        provider: "google",
        isEmailVerified: true,
    });

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                {
                    user: createdUser,
                    accessToken,
                    refreshToken,
                },
                "Google signup successful"
            )
        );
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    user.passwordResetOtp = hashedOtp;
    user.passwordResetExpiry = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await user.save({ validateBeforeSave: false });

    await sendResetPasswordEmail(user.email, otp);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "OTP sent successfully"
        )
    );
});

const resetPassword = asyncHandler(async (req, res) => {

    const { email, otp, newPassword, confNewPassword } = req.body;

    if (newPassword !== confNewPassword) {
        throw new ApiError(
            400,
            "Passwords do not match"
        );
    }

    let hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    const user = await User.findOne({

        passwordResetOtp: hashedOtp,

        passwordResetExpiry: {
            $gt: new Date()
        }

    });

    if (!user) {
        throw new ApiError(
            400,
            "Invalid or expired token"
        );
    }

    user.password = newPassword;

    user.passwordResetToken = undefined;

    user.passwordResetExpiry = undefined;

    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Password reset successful"
        )
    );

});

const resendVerificationOtp = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    const otp = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    const hashedOtp = crypto
        .createHash("sha256")
        .update(otp)
        .digest("hex");

    user.emailVerificationOtp = hashedOtp;
    user.emailVerificationExpiry = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await user.save({
        validateBeforeSave: false
    });

    await sendVerificationEmail(
        user.email,
        otp
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "OTP sent successfully."
        )
    );

});

const searchUsers = asyncHandler(async (req, res) => {
    const { query = "" } = req.query;
    const users = await User.find({
        _id: { $ne: req.user._id },
        $or: [
            {
                username: {
                    $regex: query,
                    $options: "i",
                },
            },
            {
                fullname: {
                    $regex: query,
                    $options: "i",
                },
            },
        ],
    })
        .select("_id username fullname avatar")
        .limit(20);

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );

});

const blockUser = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user id");
    }

    if (userId === req.user._id.toString()) {
        throw new ApiError(400, "You cannot block yourself");
    }

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {
                blockedUsers: userId,
            },
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User blocked successfully"
        )
    );

});

const unblockUser = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $pull: {
                blockedUsers: userId,
            },
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "User unblocked successfully"
        )
    );

});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    updateUserDetails,
    updateUserAvatarImage,
    getCurrentUser,
    verifyEmail,
    deleteAccount,
    googleLogin,
    forgotPassword,
    resetPassword,
    resendVerificationOtp,
    googleSignup,
    searchUsers,
    blockUser,
    unblockUser
}