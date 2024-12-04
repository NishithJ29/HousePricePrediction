from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:3000"}})

# Load your model
model = joblib.load('model.pkl')

# Base route
@app.route('/', methods=['GET'])
def home():
    return "Welcome to the House Price Prediction API. Use the /predict endpoint to make predictions."

# Predict route
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Request data:", data)
    
    if 'features' not in data:
        return jsonify({"error": "Missing 'features' key in JSON data"}), 400

    try:
        expected_features = ["MedInc", "HouseAge", "AveRooms", "AveBedrms", 
                             "Population", "AveOccup", "Latitude", "Longitude"]
        features = [data['features'].get(key) for key in expected_features]
        
        if None in features:
            return jsonify({"error": "Some features are missing."}), 400
        
        features = np.array(features).reshape(1, -1)
        print("Features shape:", features.shape)  # Check the shape of features
        
        prediction = model.predict(features)
        print("Prediction:", prediction)  # Log the prediction
        
        return jsonify({'prediction': prediction.tolist()})
    
    except KeyError as e:
        return jsonify({"error": f"Missing feature: {str(e)}"}), 400
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
