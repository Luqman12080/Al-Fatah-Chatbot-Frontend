import './App.css';
import './components/styles/chatbot.css'
import ChatWidget from './components/ChatWidget';
import banner from './assests/images/al-fatah.png'

function App() {
  return (
    <div >
      <div className="main-text">
        <img src={banner} className='main-img' alt='Place holder img for AL-Fatah website' />
        <ChatWidget />
      </div>
    </div>
  );
}

export default App;
