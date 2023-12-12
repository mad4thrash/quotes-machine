import './App.css';
import {useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

const App = () => {
    const [quoteData, setQuoteData] = useState({ text: '', author: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [color, setColor] = useState('#282c34')

    useEffect(() => {
        document.body.style.backgroundColor = color; 
        return () => {
            document.body.style.backgroundColor = null;
        }})    
    const fetchQuote = async () => {
        setIsLoading(true);
        setError(null);
        const url = 'https://cdn.jsdelivr.net/gh/caglarturali/quotalog@master/src/shared/quotes.json';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (data.quotes && data.quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.quotes.length);
                const randomQuote = data.quotes[randomIndex];
                setQuoteData({ text: randomQuote.text, author: randomQuote.author });
            } else {
                console.error("Nessuna citazione trovata o dati non validi");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
        changeColor();
    };
    const changeColor = () => {
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, 
                                ${Math.floor(Math.random() * 256)}, 
                                ${Math.floor(Math.random() * 256)})`;
        setColor(randomColor);
    };

    return (
        <div id="quote-box">
            {error && <p>Errore: {error}</p>}
            {quoteData.text && (
                <div id="text-author">
                    <p id="text">"{quoteData.text}"</p>
                    <p id="author">- {quoteData.author}</p>
                </div>
            )}
            <a id="tweet-quote" href="twitter.com/intent/tweet" style={{ color: color }}><FontAwesomeIcon icon={faXTwitter} /></a>
            <button id="new-quote" onClick={fetchQuote} disabled={isLoading} style={{ backgroundColor: color }}>
                {isLoading ? 'Loading...' : 'Get new quote'}
            </button>
            
        </div>
    );
};

export default App;
