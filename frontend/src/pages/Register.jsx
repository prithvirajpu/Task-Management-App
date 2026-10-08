import { useState, useEffect } from "react";
import {
    sendRegistrationOTP,
    verifyRegistrationOTP,
    completeRegistration,
    loginWithPassword,
} from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [resendTimer, setResendTimer] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resendTimer <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setResendTimer((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleSendOTP = async () => {
        try {
            setError("");
            setLoading(true);
            const response = await sendRegistrationOTP(email);
            setMessage(response.message);
            setStep(2);
            setResendTimer(60);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        try {
            setError("");
            setLoading(true);
            const response = await verifyRegistrationOTP(email, otp);
            setMessage(response.message);
            setStep(3);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
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
            setLoading(true);

            const response = await sendRegistrationOTP(email);
            setMessage(response.message);
            setResendTimer(60);
            setOtp("");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to resend OTP."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteRegistration = async () => {
        try {
            setError("");
            setLoading(true);
            await completeRegistration(email, name, password);
            const loginResponse = await loginWithPassword(email, password);
            login(loginResponse.data);
            navigate('/dashboard');
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                
                {/* Header */}
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Step {step} of 3
                    </p>
                </div>

                {/* Progress Bar Indicator */}
                <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6 overflow-hidden">
                    <div 
                        className="bg-[#FF5232] h-full transition-all duration-300 ease-in-out"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
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

                {/* Step 1: Email */}
                {step === 1 && (
                    <div className="space-y-4">
                        <h2 className="text-sm font-medium text-slate-700 mb-2">
                            Enter your email to get started
                        </h2>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                        <button
                            onClick={handleSendOTP}
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Sending OTP...</span>
                                </>
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </div>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <div className="space-y-4">
                        <h2 className="text-sm font-medium text-slate-700 mb-2">
                            Verify the OTP sent to your email
                        </h2>
                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(event) => setOtp(event.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                        <button
                            onClick={handleVerifyOTP}
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Verify OTP"
                            )}
                        </button>
                        <button
                            onClick={handleResendOTP}
                            disabled={resendTimer > 0 || loading}
                            className={`w-full py-2 text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                                resendTimer > 0 || loading
                                    ? "text-slate-400 cursor-not-allowed"
                                    : "text-[#FF5232] hover:underline"
                            }`}
                        >
                            {loading ? (
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

                {/* Step 3: Complete Details */}
                {step === 3 && (
                    <div className="space-y-4">
                        <h2 className="text-sm font-medium text-slate-700 mb-2">
                            Complete your registration profile
                        </h2>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF5232] focus:border-transparent transition-all"
                        />
                        <button
                            onClick={handleCompleteRegistration}
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#FF5232] hover:bg-[#e04427] text-white font-medium rounded-xl transition-all shadow-sm active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Completing Registration...</span>
                                </>
                            ) : (
                                "Complete Registration"
                            )}
                        </button>
                    </div>
                )}

                {/* Footer Link */}
                <p className="mt-8 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <button
                        onClick={() => navigate("/")}
                        className="font-medium text-[#FF5232] hover:underline focus:outline-none"
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Register;