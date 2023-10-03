import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data } = await axios.get(
        "https://jacintodesign.github.io/quotes-api/data/quotes.json"
      );
      setQuotes(data);
    };
    fetchQuotes();
  }, []);

  const handleGetQuoteClick = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const handleStartAppClick = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setStatus("active");
  };

  console.log(quote);
  return (
    <>
      {status === "idle" && <InitialScreen onStartApp={handleStartAppClick} />}
      {status === "active" && (
        <Quote quote={quote} onGetQuote={handleGetQuoteClick} />
      )}
    </>
  );
}

function InitialScreen({ onStartApp }) {
  return (
    <div className="initial-screen-container">
      <h1>Welcome to random quote generator!</h1>
      <br />
      <p className="initial-screen-text">Press the button to start!</p>
      <button className="btn" onClick={onStartApp}>
        Get Random Quote
      </button>
    </div>
  );
}

function Quote({ quote, onGetQuote }) {
  const { text, author, tag } = quote;
  return (
    <>
      <div className="quote-container">
        <div className="tag">#{tag}</div>
        <div className="quote-text">
          <i className="fas fa-quote-left"></i>
          <span className="quote">{text}</span>
        </div>

        <div className="quote-author">
          <span className="author">{author ? author : "Author Unknown"}</span>
        </div>

        <button className="btn" onClick={onGetQuote}>
          New Quote
        </button>
      </div>
    </>
  );
}

export default App;
