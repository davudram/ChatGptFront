import './Signup.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Signup() {

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handlSignUpClick = () => {
        axios({
            method: 'post',
            url: 'https://localhost:7019/api/Authenticate/regUser',
            data: {
                "userName": login,
                "password": password,
                "email": email
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => { navigate('/login'); })
            .catch((error) => { console.log(error); }); // added error handling
    }


    return (
        <div className="container">
            <form className="form">
                <span className="title">Sign up</span>
                <span className="subtitle">Create a free account with your email.</span>
                <div className="form-wrapper">
                    <input type="text" className="input-field" placeholder="Login" value={login} onChange={(e) => { setLogin(e.target.value) }} />
                    <input type="email" className="input-field" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="password" className="input-field" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <button className="submit-button" onClick={() => { handlSignUpClick() }}>Sign up</button>
            </form>
            <div className="form-section">
                <p>Have an account? <a href="" onClick={() => { navigate('/login') }}>Log in</a></p>
            </div>
        </div>
    )
}

export default Signup;