import { useNavigate } from 'react-router-dom';
import './Authorization.css';

function Authorization() {

    const navigate = useNavigate();

    return (
        <div className='authorization-container'>
            <div className='select-auth'>
                <h1>Authorization</h1>
                <p>Log in with your OpenAI account to continue</p>
                <button className='log-in' onClick={() => { navigate('/login') }}>Log in</button>
                <button className='sign-in' onClick={() => { navigate('/signup') }}>Sign up</button>
            </div>
        </div>
    );
}

export default Authorization;