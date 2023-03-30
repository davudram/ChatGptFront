import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleAuthClick = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://localhost:7019/api/Authenticate/login',
            data: {
                "userName": login,
                "password": password
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => { sessionStorage.setItem('token', response.data.token); navigate('/chat'); })
            .catch((error) => { console.log(error); }); 
    }


    return (
        <div className="form-box">
            <form className="form" onSubmit={handleAuthClick}>
                <span className="title">Log in</span>
                <div className="form-container">
                    <input type="text" className="input" placeholder="Login" value={login} onChange={(e) => { setLogin(e.target.value) }} />
                    <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit">Log in</button>
            </form>
            <div className="form-section">
                <p>Don't have an account? <a href='' onClick={() => { navigate('/signup') }}>Sign up</a></p>
            </div>
        </div>
    )
}

export default Login;
