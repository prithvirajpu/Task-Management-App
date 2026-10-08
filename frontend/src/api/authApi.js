import api from "./axios";

export const sendRegistrationOTP=async(email)=>{
    try {
        const res= await api.post("/auth/register/send-otp/",{email});
        return res.data
    } catch (error) {
        console.log("Error sending registration OTP:", error);
        throw error;    
    }
}

export const verifyRegistrationOTP = async (email, otp) => {
    try {
        const res = await api.post("/auth/register/verify-otp/",
            {email,otp,}
        );

        return res.data;
    } catch (error) {
        console.log("Error verifying registration OTP:", error);
        throw error;
    }
};

export const completeRegistration = async (
    email,
    name,
    password
) => {
    try {
        const res = await api.post("/auth/register/complete/",
            {email,name,password,}
        );

        return res.data;
    } catch (error) {
        console.log("Error completing registration:", error);
        throw error;
    }
};

export const loginWithPassword = async (
    email,
    password
) => {
    try {
        const res = await api.post("/auth/login/",
            {email,password,}
        );

        return res.data;
    } catch (error) {
        console.log("Error during password login:", error);
        throw error;
    }
};

export const sendLoginOTP = async (email) => {
    try {
        const res = await api.post("/auth/login/send-otp/",
            { email }
        );

        return res.data;
    } catch (error) {
        console.log("Error sending login OTP:", error);
        throw error;
    }
};

export const verifyLoginOTP = async (email, otp) => {
    try {
        const res = await api.post("/auth/login/verify-otp/",
            {email,otp,}
        );

        return res.data;
    } catch (error) {
        console.log("Error verifying login OTP:", error);
        throw error;
    }
};