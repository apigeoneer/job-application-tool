import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/')
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  // return <div>{message}</div>;
  return <div>heyooo</div>;
}

export default App;
