import './AuthAdmin.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function AuthAdmin() {

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
            .then((response) => { sessionStorage.setItem('token', response.data.token); navigate('/panel'); })
            .catch((error) => { console.log(error); });
    }


    return (
        <div className="auth-admin-form">
            <form className="auth-form" onSubmit={handleAuthClick}>
                <span className="auth-title">Admin log in</span>
                <div className="auth-form-container">
                    <input type="text" className="auth-input" placeholder="Login" value={login} onChange={(e) => { setLogin(e.target.value) }} />
                    <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default AuthAdmin;
