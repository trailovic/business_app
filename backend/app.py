from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Ensure you use the correct MongoDB connection string
app.config["MONGO_URI"] = "mongodb+srv://trailovicluka:ZH1hD5lLOtpo6Ng8@mycluster.5sbaz.mongodb.net/business_mngr?retryWrites=true&w=majority"

mongo = PyMongo(app)

# Debugging step: Check if MongoDB is connected properly
if mongo.db is None:
    print("❌ ERROR: MongoDB connection failed!")
else:
    print("✅ MongoDB connected successfully!")

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        print("Received data:", data)  # Debugging output

        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            print("❌ ERROR: Missing email or password")
            return jsonify({"message": "Missing email or password"}), 400

        if mongo.db.users.find_one({'email': email}):
            print("❌ ERROR: Email already registered")
            return jsonify({"message": "Email already registered"}), 400

        hashed_password = generate_password_hash(password)
        print("Hashed Password:", hashed_password)

        mongo.db.users.insert_one({'email': email, 'password': hashed_password})
        print("✅ User registered successfully")

        return jsonify({"message": "Registration successful"}), 201
    except Exception as e:
        print("❌ ERROR:", str(e))  # Print full error message in Flask terminal
        return jsonify({"message": "Internal Server Error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)