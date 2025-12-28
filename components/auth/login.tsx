import GoogleBtn from "./google-btn";

export default function Login() {
  return (
    <div className="loginContainer">
      <div className="context">
        <div className="top">
          <h1>Welcome back</h1>
          <p>Enter your details to access your workspace.</p>
        </div>
        <div className="google">
          <GoogleBtn />
        </div>
        <div className="divider">
          <p>Or sign in with email</p>
        </div>
        <div className="inputs">
          <div className="input">
            <p>Email</p>
            <input type="email" />
          </div>
          <div className="input">
            <p>
              <span>Password</span>
              <a href="#">Forgot Password?</a>
            </p>
            <input type="password" />
          </div>
          <button className="SignIn">Sign In</button>
        </div>
        <div className="footer">
          <p className="text">
            Don't have an account?
            <a href="">Sign up</a>
          </p>
          <p>© 2026 Nexera (.EXE)</p>
        </div>
      </div>
    </div>
  );
}
