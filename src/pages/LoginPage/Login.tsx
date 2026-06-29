import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { loginSchema, LoginFormValues } from "../../schemas/loginSchema";
import { loginRequest } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";
import { InfoIcon } from "lucide-react";
import "./Login.scss";
import { PleaseWait } from "../../components/Loading";

function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (_, variables) => {
      login(variables.email);
      const redirectPath = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectPath || "/dashboard");
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Lendsqr Assessment || Login Page</title>
      </Helmet>
      <div className="login-container">
        <div className="top-logo">
          <Link to="/">
            <img src="/logo.png" alt="Lendsqr logo" />
          </Link>
        </div>
        <div className="container">
          <div className="bg-log">
            <img src="/loginbg.png" alt="" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="top-txt">
              <h1>Welcome!</h1>
              <p>Enter details to login.</p>
            </div>

            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-invalid={!!errors.email}
                className={errors.email ? "input error" : "input"}
                {...register("email")}
              />
              {errors.email && (
                <span className="field-error" role="alert">
                  <InfoIcon className="info-icon" /> {errors.email.message}
                </span>
              )}
            </div>

            <div className="input-group">
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  className={errors.password ? "input error" : "input"}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className="field-error" role="alert">
                  <InfoIcon className="info-icon" />
                  {errors.password.message}
                </span>
              )}
            </div>

            <Link to="/forgot-password">Forgot password?</Link>

            {mutation.isError && (
              <div className="error-message" role="alert">
                <InfoIcon className="info-icon" />
                {mutation.error instanceof Error
                  ? mutation.error.message
                  : "Something went wrong. Please try again."}
              </div>
            )}

            <button
              className="btn-submit"
              type="submit"
              disabled={mutation.isPending}>
              {mutation.isPending ? <PleaseWait /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
