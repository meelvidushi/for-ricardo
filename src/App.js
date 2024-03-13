import React, { useState } from 'react';
import turtleIcon from './turtle.png';
import * as d3 from 'd3'; // Import D3.js for CSV parsing

// Header component
function Header() {
  return (
<header className="bg-lime-500 text-white py-5 px-4 md:py-6 md:px-8 text-center text-lg md:text-xl lg:text-2xl font-bold">
  <div className="flex justify-center items-center gap-4">
    <img src={turtleIcon} alt="Turtle Icon" className="w-10 h-10" />
    <h1>
      Modeling the Population Viability and Distribution of Blanding's Turtle, <em className="italic">Emydoidea blandingii</em>, using a Machine Learning Approach in Michigan during Mating Season
    </h1>
  </div>
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
<div className="max-w-xl mx-auto p-5">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Documentation</h2>
  <p className="mb-6 text-gray-600">This is where you'll find documentation.</p>
  <div className="space-y-2">
    <a href="/path/to/report.pdf" download className="block text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
      Report PDF
    </a>
    <a href="/path/to/board.pdf" download className="block text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
      Board PDF
    </a>
    <a href="/Science%20Fair%202024.pdf" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
      Slides PDF
    </a>
    <a href="/path/to/binder.pdf" download className="block text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
      Research Binder PDF
    </a>
  </div>
</div>

    );
  } else if (currentPage === 'model') {
    content = (
<div className="max-w-4xl mx-auto p-4">
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Model</h2>
  <p className="text-gray-700 mb-3">Please upload a CSV file with the following format:</p>
  <pre className="bg-gray-100 p-3 rounded text-sm mb-4 block overflow-x-auto">
    Date, Trap#, Cap type, Species, Age, Gender, CL, PIT (tag number), Maximum Temperature (C), Minimum Temperature (C), Precipitation (mm), UV Index, Relative Humidity (%), Cloud Cover (%)
  </pre>
  <input 
    type="file" 
    accept=".csv" 
    onChange={handleFileUpload}
    className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent mb-4 p-2.5"
  />
  {csvFile && <p className="text-gray-700 mb-2">File uploaded: <span className="font-semibold">{csvFile.name}</span></p>}
  <button 
    onClick={runModel}
    className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
  >
    Run Model
  </button>
  {modelOutput && <div className="mt-4 bg-gray-100 p-3 rounded">{modelOutput}</div>}
</div>

    );
  } else {
    content = (
<div class="max-w-4xl mx-auto px-4 py-8">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Welcome to the Home Page</h2>
    <p class="text-md md:text-lg text-gray-700">
        Ricardo Pastor, a senior at Saginaw Arts and Sciences Academy, has collaborated with the Chippewa Nature Center to create a model to predict the population viability of Blanding's Turtles.
    </p>
</div>

    );
  }

  return (
<div>
  <nav className="bg-lime-400 p-2 text-center">
    <button
      className="mx-1 px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
      onClick={() => handlePageChange('home')}
    >
      Home
    </button>
    <button
      className="mx-1 px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
      onClick={() => handlePageChange('documentation')}
    >
      Documentation
    </button>
    <button
      className="mx-1 px-4 py-2 text-white bg-emerald-500 rounded hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
      onClick={() => handlePageChange('model')}
    >
      Model
    </button>
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
