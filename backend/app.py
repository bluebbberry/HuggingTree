from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    file_url = f"http://127.0.0.1:5000/uploads/{file.filename}"
    return jsonify({"message": "File uploaded successfully!", "file_url": file_url})

@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return app.send_static_file(os.path.join(UPLOAD_FOLDER, filename))

if __name__ == "__main__":
    app.run(debug=True)
