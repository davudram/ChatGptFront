import './Signup.css'

function Signup() {
    return (
        <div className="container">
            <form className="form">
                <span className="title">Sign up</span>
                <span className="subtitle">Create a free account with your email.</span>
                <div className="form-wrapper">
                    <input type="text" className="input-field" placeholder="Full Name" />
                    <input type="email" className="input-field" placeholder="Email" />
                    <input type="password" className="input-field" placeholder="Password" />
                </div>
                <button className="submit-button">Sign up</button>
            </form>
            <div className="form-section">
                <p>Have an account? <a href="">Log in</a>{" "}</p>
            </div>
        </div>
    )
}

export default Signup;