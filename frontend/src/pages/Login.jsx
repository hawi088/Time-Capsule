import "../styles/global.css";

function Login() {
  return (
    <div className="form-container">
      <form className="login-form">
        <h1 className="login-title">Enter the Vault</h1>
        <h3 className="description">Unlock your sealed memories</h3>

        <h4>Email Address</h4>
        <input placeholder="your@email.com" type="email" />

        <h4>Password</h4>
        <input placeholder="......." type="password" />

        <button type="submit" className="login-btn">
          Unlock the Vault
        </button>
      </form>
    </div>
  );
}

export default Login;
