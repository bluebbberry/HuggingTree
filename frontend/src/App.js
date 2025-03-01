import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedFileUrl(response.data.file_url);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed, please try again.");
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Hugging Tree 🤗🌳</h1>

        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button onClick={handleUpload} className="bg-green-500 text-white px-4 py-2 rounded">
          Upload
        </button>

        {uploadedFileUrl && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">Uploaded File:</h2>
              <a href={uploadedFileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 block">
                View File
              </a>
            </div>
        )}
      </div>
  );
}

export default App;
