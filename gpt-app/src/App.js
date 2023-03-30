import './App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const navigate = useNavigate();
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    const getSubscriptionCount = async () => {
      try {
        const response = await axios.get('https://localhost:7019/api/Subscriptions/ListSubscriptions', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        });
        setSubscription(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getSubscriptionCount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-container">
          <div className="logo-container">
            <img className="logo" src="https://cdn-bdfbc.nitrocdn.com/mpQHUpeCagYMmyclYzWrEuJOvwEOajTJ/assets/static/optimized/rev-33edbce/wp-content/uploads/2022/12/cover7-1080x675.jpg" alt="Logo" />
            <h1 className="logo-text">Open AI</h1>
          </div>
          <nav className="nav-container">
            <ul className="nav-list">
              <li className="nav-item"><a href="#">Home</a></li>
              <li className="nav-item"><a href="#">About</a></li>
              <li className="nav-item"><a href="#">Services</a></li>
              <li className="nav-item"><a href="#">Contact</a></li>
            </ul>
          </nav>
        </div>
        <div className="info-block">
          <div className="left-content">
            <h1>Introducing ChatGPT</h1>
            <p>We’ve trained a model called ChatGPT which interacts in a conversational way. The dialogue format makes it possible for ChatGPT to answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.</p>
            <button id="enter" onClick={() => { navigate('/auth') }}>Try ChatGPT</button>
          </div>
          <div className="right-content">
            <img src="https://openaicom.imgix.net/8d14e8f0-e267-4b8b-a9f2-a79120808f5a/chatgpt.jpg?auto=compress%2Cformat&fit=min&fm=jpg&q=80&rect=0%2C0%2C2048%2C2048&w=700" alt="ChatGPT Image" />
          </div>
        </div>
        <div className="vip-container">
          <h1>Subscriptions</h1>
          {subscription.length > 0 && subscription.map(subscriptions => (
            <div className="cards-sub" key={subscriptions.id}>
              <img src={`${subscriptions.image}`}></img>
              <p>Name: {subscriptions.name}</p>
              <p>Price: {subscriptions.price}$</p>
              <button>Buy</button>
            </div>
          ))}
        </div>
        <footer className="chatgpt-footer">
          <div className="footer-container">
            <div className="footer-info">
              <h2>About ChatGpt</h2>
              <p>
                ChatGpt is an AI-powered chatbot built on the GPT-3.5 architecture. It uses natural language processing to generate human-like responses to user input, making it a powerful tool for a variety of applications.
              </p>
              <p>
                Whether you're building a customer support chatbot or an AI personal assistant, ChatGpt can help you take your project to the next level.
              </p>
            </div>
            <div className="footer-contact">
              <h2>Contact Us</h2>
              <ul>
                <li>Email: support@chatgpt.com</li>
                <li>Phone: +1 (555) 555-5555</li>
                <li>Address: 123 Main St, Suite 456, Anytown, USA</li>
              </ul>
            </div>
            <div className="footer-social">
              <h2>Follow Us</h2>
              <ul>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-credits">
            <p>© 2023 ChatGpt. All rights reserved.</p>
            <p>Created by Davud Ramazanov</p>
          </div>
        </footer>
      </header>
    </div>
  );
}

export default App;
