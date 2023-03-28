import './Login.css'
import { useNavigate } from 'react-router-dom'

function Login() {

    const navigate = useNavigate();

    return (
        <div className="form-box">
            <form className="form">
                <span className="title">Log in</span>
                <div className="form-container">
                    <input type="text" className="input" placeholder="Full Name" />
                    <input type="password" className="input" placeholder="Password" />
                </div>
                <button>Sign up</button>
            </form>
            <div className="form-section">
                <p>Don't have an account? <a href='' onClick={() => {navigate('/signup')}}>Sign up</a></p>
            </div>
        </div>
    )
}

export default Login;
