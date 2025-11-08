import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
  remember?: boolean;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Mock login with:", data);
    setLoginSuccess(true);
    reset({ password: "", email: data.email, remember: data.remember });

    // Reset success message after 3 seconds
    setTimeout(() => setLoginSuccess(false), 3000);
  };

  const emailError = useMemo(() => errors.email?.message, [errors.email]);
  const passwordError = useMemo(() => errors.password?.message, [errors.password]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-b from-sky-50 via-white to-indigo-50">
      {/* Soft background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -right-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      </div>

      {/* Container */}
      <div className="mx-auto flex max-w-5xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-fade-in">
          {/* Card */}
          <div className="relative rounded-2xl border border-white/60 bg-white/70 p-8 shadow-[0_10px_35px_-10px_rgba(30,64,175,0.25)] backdrop-blur supports-[backdrop-filter]:bg-white/60 sm:p-10">
            {/* Card shine */}
            <div className="pointer-events-none absolute inset-x-0 -top-1 mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-white to-transparent" />

            <div className="mb-10 text-center">
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Welcome back</h2>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {loginSuccess && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-300/70 bg-emerald-50/80 p-4 text-emerald-700 shadow-sm animate-slide-in">
                <div>
                  <div className="font-semibold">Login successful!</div>
                  <div className="text-xs opacity-80">(Mock implementation)</div>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    aria-invalid={!!emailError}
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Please provide a valid email address" },
                    })}
                    className={`peer w-full rounded-xl border bg-white/80 px-4 py-3 text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:ring-4 focus:ring-blue-200/70 focus:border-blue-400/80 ${
                      emailError ? "border-red-300 focus:ring-red-200/70" : "border-gray-300"
                    }`}
                    placeholder="name@example.com"
                  />
                  {/* Input glow */}
                  <span className="pointer-events-none absolute inset-y-0 right-3 my-auto hidden h-5 w-5 select-none rounded-full bg-blue-500/10 ring-4 ring-blue-300/20 peer-focus:block" />
                </div>
                {emailError && (
                  <p className="mt-2 flex items-center text-sm text-red-600">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    aria-pressed={showPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    aria-invalid={!!passwordError}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters long" },
                    })}
                    className={`peer w-full rounded-xl border bg-white/80 px-4 py-3 text-gray-900 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:ring-4 focus:ring-blue-200/70 focus:border-blue-400/80 ${
                      passwordError ? "border-red-300 focus:ring-red-200/70" : "border-gray-300"
                    }`}
                    placeholder="Your password"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 my-auto hidden h-5 w-5 select-none rounded-full bg-blue-500/10 ring-4 ring-blue-300/20 peer-focus:block" />
                </div>
                {passwordError && (
                  <p className="mt-2 flex items-center text-sm text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                    {...register("remember")}
                  />
                  Remember me
                </label>
                <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative inline-flex w-full items-center justify-center overflow-hidden px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg bg-blue-600 text-white hover:bg-blue-7000"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="-ml-1 mr-3 h-5 w-5 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  <>
                    <span className=" bg-blue-600 absolute inset-0 -z-10" />
                    Sign In
                  </>
                )}
              </button>
              </form>
            </div>
        </div>
        </div>
    </div>
    );
};
export default Login;