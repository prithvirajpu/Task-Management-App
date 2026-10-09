import { useState, useEffect } from "react";
import {
    loginWithPassword,
    sendLoginOTP,
    verifyLoginOTP,
} from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { Loader2 } from "lucide-react";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [resendTimer, setResendTimer] = useState(0);

    const [method, setMethod] = useState("password");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");

    const [otpSent, setOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (resendTimer <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendTimer((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    const handlePasswordLogin = async () => {
        try {
            setError("");
            setLoading(true);
            const response = await loginWithPassword(email, password);
            login(response.data);
            navigate("/dashboard");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSendOTP = async () => {
        try {
            setError("");
            setSendingOtp(true);
            const response = await sendLoginOTP(email);
            setMessage(response.message);
            setOtpSent(true);
            setResendTimer(60);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setSendingOtp(false);
        }
    };

    const handleOTPLogin = async () => {
        try {
            setError("");
            setLoading(true);
            const response = await verifyLoginOTP(email, otp);
            const data = response.data;
            login(data);
            navigate('/dashboard');
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (resendTimer > 0) {
            return;
        }

        try {
            setError("");
            setMessage("");
            setSendingOtp(true);

            const response = await sendLoginOTP(email);
            setMessage(response.message);
            setResendTimer(60);
            setOtp("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to resend OTP."
            );
        } finally {
            setSendingOtp(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Please sign in to continue
                    </p>
                </div>

                {/* Notifications */}
                {message && (
                    <div className="mb-4 p-3 text-sm text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="mb-4 p-3 text-sm text-[#FF5232] bg-red-50 rounded-lg border border-red-100 text-center">
                        {error}
                    </div>
                )}

                {/* Method Switcher Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                    <button
                        type="button"
                        onClick={() => {
                            setMethod("password");
                            setError("");
                            setMessage("");
                        }}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                            method === "password"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        Password Login
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setMethod("otp");
                            setError("");
                            setMessage("");
                        }}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                            method === "otp"
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-900"
                        }`}
                    >
                        OTP Login
                    </button>
                </div>

                {/* Form Elements */}
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                    </div>

                    {method === "password" && (
                        <div className="space-y-4">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                            />

                            <button
                                onClick={handlePasswordLogin}
                                disabled={loading}
                                className="w-full py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Logging in...</span>
                                    </>
                                ) : (
                                    "Login"
                                )}
                            </button>
                        </div>
                    )}

                    {method === "otp" && (
                        <div className="space-y-4">
                            {!otpSent && (
                                <button
                                    onClick={handleSendOTP}
                                    disabled={sendingOtp}
                                    className="w-full py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {sendingOtp ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Sending OTP...</span>
                                        </>
                                    ) : (
                                        "Send OTP"
                                    )}
                                </button>
                            )}

                            {otpSent && (
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(event) => setOtp(event.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                                    />

                                    <button
                                        onClick={handleOTPLogin}
                                        disabled={loading}
                                        className="w-full py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Verifying...</span>
                                            </>
                                        ) : (
                                            "Verify OTP & Login"
                                        )}
                                    </button>

                                    <button
                                        onClick={handleResendOTP}
                                        disabled={resendTimer > 0 || sendingOtp}
                                        className={`w-full py-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                                            resendTimer > 0 || sendingOtp
                                                ? "text-slate-400 cursor-not-allowed"
                                                : "text-[#FF5232] hover:underline"
                                        }`}
                                    >
                                        {sendingOtp ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>Resending...</span>
                                            </>
                                        ) : resendTimer > 0 ? (
                                            `Resend OTP in ${resendTimer}s`
                                        ) : (
                                            "Resend OTP"
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account?{" "}
                    <button
                        onClick={() => navigate("/register")}
                        className="font-medium text-[#FF5232] hover:underline focus:outline-none"
                    >
                        Register
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Login;