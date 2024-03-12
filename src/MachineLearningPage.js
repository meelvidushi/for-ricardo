import React, { useState } from 'react';

function MachineLearningPage() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    // Simulate file upload
    const formData = new FormData();
    formData.append('file', file);

    // Simulate server response
    const responseData = { result: 'Your file has been uploaded and analyzed.' };
    setResult(responseData);
  };

  return (
    <div className="container">
      <h1>Machine Learning Page</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Upload and Analyze</button>
      </form>
      {result && (
        <div className="result">
          <h2>Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MachineLearningPage;
