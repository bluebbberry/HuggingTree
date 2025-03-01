import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFileUrl(response.data.file_url);
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
      <div className="container">
        <h1 className="title">🤗🌳 Hugging Tree</h1>

        <div className="upload-box">
          <label className="upload-label">
            <div className="upload-icon">📂</div>
            <span>{file ? file.name : "Click to select a file"}</span>
            <input type="file" onChange={handleFileChange} className="hidden-input" />
          </label>

          <button onClick={handleUpload} disabled={!file || uploading} className="upload-button">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {uploadedFileUrl && (
            <div className="uploaded-box">
              <div className="checkmark">✅</div>
              <h2>File Uploaded Successfully!</h2>
              <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer">
                View File
              </a>
            </div>
        )}
      </div>
  );
}

export default App;
