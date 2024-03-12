import React, { useState } from 'react';
import turtleIcon from './turtle.png';
import * as d3 from 'd3'; // Import D3.js for CSV parsing

// Header component
function Header() {
  return (
    <header style={{ backgroundColor: '#a1c46fff', color: 'white', padding: '10px', textAlign: 'center', fontSize: '1.5rem' }}>
      <img src={turtleIcon} alt="Turtle Icon" style={{ width: '30px', marginRight: '10px' }} />
      Modeling the Population Viability and Distribution of Blanding's Turtle, <em>Emydoidea blandingii</em>, using a Machine Learning Approach, in Michigan during Mating Season
    </header>
  );
}

// Main component
function Main() {
  const [currentPage, setCurrentPage] = useState('home');
  const [csvFile, setCsvFile] = useState(null);
  const [modelOutput, setModelOutput] = useState(null);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to handle CSV file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvString = event.target.result;
      const parsedData = d3.csvParse(csvString);
      setCsvFile(parsedData);
    };
    reader.readAsText(file);
  };

  // Function to run the model
  const runModel = () => {
    // Send the CSV data to the Flask server to run the model
    const formData = new FormData();
    formData.append('file', csvFile);

    fetch('/run-model', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setModelOutput(data.error);
      } else {
        setModelOutput(data.model_output);
      }
    })
    .catch(error => {
      setModelOutput('Error running model: ' + error.message);
    });
  };

  // Render content based on the current page
  let content;
  if (currentPage === 'documentation') {
    content = (
      <div>
        <h2>Documentation</h2>
        <p>This is where you'll find documentation.</p>
        <div>
          <a href="/path/to/report.pdf" download>Report PDF</a><br />
          <a href="/path/to/board.pdf" download>Board PDF</a><br />
          <a href="/Science%20Fair%202024.pdf" target="_blank" rel="noopener noreferrer">Slides PDF</a><br />
          <a href="/path/to/binder.pdf" download>Research Binder PDF</a>
        </div>
      </div>
    );
  } else if (currentPage === 'model') {
    content = (
      <div>
        <h2>Model</h2>
        <p>Please upload a CSV file with the following format:</p>
        <pre>Date, Trap#, Cap type, Species, Age, Gender, CL, PIT (tag number), Maximum Temperature (C), Minimum Temperature (C), Precipitation (mm), UV Index, Relative Humidity (%), Cloud Cover (%)</pre>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        {csvFile && <p>File uploaded: {csvFile.name}</p>}
        <button onClick={runModel}>Run Model</button>
        {modelOutput && <div>{modelOutput}</div>}
      </div>
    );
  } else {
    content = (
      <div>
        <h2>Welcome to the Home Page</h2>
        <p>Ricardo Pastor, a senior at Saginaw Arts and Sciences Academy, has collaborated with the Chippewa Nature Center to create a model to predict the population viability of Blanding's Turtles.</p>
      </div>
    );
  }

  return (
    <div>
      <nav style={{ backgroundColor: '#a1c46fff', padding: '10px', textAlign: 'center' }}>
        <button onClick={() => handlePageChange('home')}>Home</button>
        <button onClick={() => handlePageChange('documentation')}>Documentation</button>
        <button onClick={() => handlePageChange('model')}>Model</button>
      </nav>
      {content}
    </div>
  );
}

// App component
function App() {
  return (
    <div>
      <Header />
      <Main />
    </div>
  );
}

export default App;
