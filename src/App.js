import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState({
        alphabets: false,
        numbers: false,
        highestLowercase: false
    });

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const data = JSON.parse(jsonInput);
            const res = await axios.post('https://testbfhl.herokuapp.com/bfhl', { data });
            setResponse(res.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOptions({
            ...selectedOptions,
            [e.target.name]: e.target.checked
        });
    };

    const renderResponse = () => {
        if (!response) return null;

        const { numbers, alphabets, highest_lowercase_alphabet } = response;
        const result = {};
        if (selectedOptions.numbers) result.numbers = numbers;
        if (selectedOptions.alphabets) result.alphabets = alphabets;
        if (selectedOptions.highestLowercase) result.highest_lowercase_alphabet = highest_lowercase_alphabet;
        
        return (
            <pre>{JSON.stringify(result, null, 2)}</pre>
        );
    };

    return (
        <div className="App">
            <h1>ABCD123</h1>
            <textarea value={jsonInput} onChange={handleInputChange} rows="4" cols="50" />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="alphabets"
                        checked={selectedOptions.alphabets}
                        onChange={handleOptionChange}
                    />
                    Alphabets
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="numbers"
                        checked={selectedOptions.numbers}
                        onChange={handleOptionChange}
                    />
                    Numbers
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="highestLowercase"
                        checked={selectedOptions.highestLowercase}
                        onChange={handleOptionChange}
                    />
                    Highest Lowercase Alphabet
                </label>
            </div>
            {renderResponse()}
        </div>
    );
}

export default App;
