import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = '21BKT0037'; // Replace with your roll number
  }, []);

  const handleInputChange = (event) => setInputData(event.target.value);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      setError('');
      const res = await axios.post('/bfhl', { data: parsedData });
      setResponse(res.data);
    } catch (error) {
      setError('Invalid JSON input. Please check your input format.');
    }
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedFilters(prevFilters =>
      prevFilters.includes(value)
        ? prevFilters.filter(filter => filter !== value)
        : [...prevFilters, value]
    );
  };

  const renderResponse = () => {
    if (!response) return null;
    const filteredData = {
      alphabets: selectedFilters.includes('Alphabets') ? response.alphabets : [],
      numbers: selectedFilters.includes('Numbers') ? response.numbers : [],
      highestLowercaseAlphabet: selectedFilters.includes('Highest lowercase alphabet')
        ? response.highest_lowercase_alphabet
        : []
    };
    return (
      <div>
        <h2>Filtered Response:</h2>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>ABCD123</h1>
      <textarea
        value={inputData}
        onChange={handleInputChange}
        placeholder='Enter JSON formatted data'
        rows={10}
        cols={50}
        style={{ width: '80%', maxWidth: '500px', marginBottom: '10px' }}
      />
      <br />
      <button onClick={handleSubmit} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '16px' }}>
        Submit
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre style={{
            textAlign: 'left', margin: '20px auto', backgroundColor: '#f5f5f5',
            padding: '10px', borderRadius: '5px', width: '80%', maxWidth: '500px', overflowX: 'auto'
          }}>
            {JSON.stringify(response, null, 2)}
          </pre>
          <div>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                checked={selectedFilters.includes('Alphabets')}
                onChange={handleFilterChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                checked={selectedFilters.includes('Numbers')}
                onChange={handleFilterChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest lowercase alphabet"
                checked={selectedFilters.includes('Highest lowercase alphabet')}
                onChange={handleFilterChange}
              />
              Highest lowercase alphabet
            </label>
          </div>
          {renderResponse()}
        </div>
      )}
    </div>
  );
};

export default App;
