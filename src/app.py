from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
import pymc as pm
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow CORS for all domains

@app.route('/run-model', methods=['POST'])
def run_model():
    try:
        # Extract data from the uploaded CSV file
        csv_file = request.files['file']
        df = pd.read_csv(csv_file)
        
        # Perform model computation using the data from df
        # Replace this with your actual model code
        model_output = "Model output will be displayed here."
        
        return jsonify({'model_output': model_output})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
