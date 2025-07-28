import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://foodapp-backend-a3ew.onrender.com/api";

// ✅ Upload helper
const uploadProfilePhoto = async (userId: string, file: File) => {
  console.log("Uploading for userId:", userId);
  try {
    const formData = new FormData();
    formData.append("profilePhoto", file);

    const response = await axios.post(
      `${BASE_URL}/users/${userId}/photo`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    console.log("Server Response:", response);
    return response;
  } catch (err: any) {
    console.error("Upload failed:", err.response?.data || err.message);
    throw err;
  }
};

function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ✅ Mount pe LocalStorage se user uthao
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.error("LocalStorage parse error:", err);
      }
    }
  }, []);

  const openCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, 300, 300);

    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `captured-${Date.now()}.png`, {
          type: "image/png",
        });
        setSelectedFile(file);
        const imageUrl = URL.createObjectURL(blob);
        setPreview(imageUrl);

        // ✅ Photo capture ke baad camera band karo
        setShowCamera(false);

        // ✅ Camera stream bhi band karo (optional but recommended)
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach((track) => track.stop());
          videoRef.current.srcObject = null;
        }
      }
    }, "image/png");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Pehle image select karo ya capture karo!");
      return;
    }
    if (!user?._id) {
      alert("User ID nahi mili, LocalStorage ya Login check karo!");
      return;
    }
  
    try {
      const res = await uploadProfilePhoto(user._id, selectedFile);
  
      if (res.status === 200) {
        alert("Photo uploaded successfully!");
  
        const updatedUser = {
          ...user,
          ...res.data.user, // ✅ yahi important hai!
        };
  
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setPreview(null);
        setSelectedFile(null);
        setShowCamera(false);
      } else {
        alert("Upload failed. Server says: " + res.status);
      }
    } catch (err) {
      console.error(err);
      alert("Kuch gadbad ho gayi!");
    }
  };
  
  
  

  if (!user) {
    return (
      <div className="p-10 text-red-600 font-bold">
        User data nahi mila! Pehle login karo ya LocalStorage me daalo.
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-yellow-50 via-white to-yellow-100 min-h-screen flex">
      {/* Left: Profile Info */}
      <div className="w-1/3 p-10 flex flex-col items-start">
        <div className="relative">
          <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center text-4xl font-bold text-white overflow-hidden">
            {user.profilePhotoUrl || preview ? (
              <img
                src={`https://foodapp-backend-a3ew.onrender.com${user.profilePhotoUrl}`}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              user.name?.[0]?.toUpperCase()
            )}
          </div>
          <button
            className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full"
            onClick={openCamera}
          >
            📷
          </button>
        </div>

        <div className="mt-8 space-y-2">
          <p className="text-xl font-semibold">{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.role}</p>
        </div>
      </div>

      {/* Right: Camera / Upload Section */}
      <div className="w-2/3 p-10">
        {showCamera && (
          <div>
            <video ref={videoRef} autoPlay className="w-96 h-72 rounded-lg" />
            <canvas ref={canvasRef} width={300} height={300} className="hidden" />
            <div className="mt-4">
              <button
                onClick={capturePhoto}
                className="px-4 py-2 bg-green-500 text-white rounded mr-4"
              >
                Capture
              </button>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
          </div>
        )}

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-60 h-60 rounded-full object-cover"
            />
            <button
              onClick={handleUpload}
              className="block mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
