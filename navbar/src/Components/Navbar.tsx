import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  username: string;
  profilePhotoUrl: string;
  role: string;
}

interface NotificationResponse {
  success: boolean;
  message: string;
}

const BASE_URL = "https://foodapp-backend-a3ew.onrender.com";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [sellerForm, setSellerForm] = useState({
    name: "",
    cuisine: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    tagline: "",
  });

  const navigate = useNavigate();
  const user: User | null = (() => {
    try {
      const userData = localStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  })();

  const navItems = !user
    ? [
        { name: "Login", path: "/login" },
        { name: "SignUp", path: "/signup" },
      ]
    : [
        { name: "Restaurants", path: "/resturants" },
        ...(user.role === "admin" ? [{ name: "Admin Dashboard", path: "/adminpage" }] : []),
        ...(user.role === "seller" ? [{ name: "Seller Dashboard", path: "/sellerpage" }] : []),
        { name: "Home", path: "/" },
        { name: "Cart", path: "/cart" },
        { name: "Contact", path: "/contact" },
      ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handleSellerFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const createSellerNotification = async (formData: FormData): Promise<NotificationResponse> => {
    const response = await axios.post(`${BASE_URL}/api/admin/notify`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  };

  const handleSellerRequest = async () => {
    const requiredFields = ["name", "cuisine", "street", "city", "state", "zipCode", "phone", "email"];
    for (let field of requiredFields) {
      if (!sellerForm[field as keyof typeof sellerForm]) {
        alert(`Please fill ${field}`);
        return;
      }
    }
    if (!selectedImage) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("requestType", "seller_application");
    formData.append("name", sellerForm.name);
    formData.append("cuisine", sellerForm.cuisine);
    formData.append("address", JSON.stringify({
      street: sellerForm.street,
      city: sellerForm.city,
      state: sellerForm.state,
      zipCode: sellerForm.zipCode,
    }));
    formData.append("phone", sellerForm.phone);
    formData.append("email", sellerForm.email);
    formData.append("tagline", sellerForm.tagline);
    formData.append("timestamp", new Date().toISOString());
    formData.append("picture", selectedImage);

    try {
      const res = await createSellerNotification(formData);
      if (res.success) {
        alert("Request sent successfully!");
        setShowSellerModal(false);
        setSellerForm({
          name: "", cuisine: "", street: "", city: "", state: "", zipCode: "",
          phone: "", email: "", tagline: "",
        });
        setSelectedImage(null);
      } else {
        alert(res.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send request!");
    }
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold hover:text-yellow-400">Foodify</Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 rounded hover:bg-gray-800 hover:text-yellow-400"
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2">
                  <span>{user.username} &#11182;</span>
                  <img
                    src={`${BASE_URL}${user.profilePhotoUrl}`}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    {user.role === "customer" && (
                      <button
                        onClick={() => {
                          setShowSellerModal(true);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Become a Seller
                      </button>
                    )}
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block px-2 py-2 rounded hover:bg-gray-700"
            >
              {item.name}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/profile" className="block px-2 py-2 rounded hover:bg-gray-700" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
              {user.role === "customer" && (
                <button
                  onClick={() => {
                    setShowSellerModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-2 py-2 rounded hover:bg-gray-700"
                >
                  Become a Seller
                </button>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-2 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Seller Modal */}
      {showSellerModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black p-6 rounded shadow w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl mb-4 font-bold text-center">Open Your Restaurant</h2>
            <div className="space-y-2">
              {["name", "cuisine", "street", "city", "state", "zipCode", "phone", "email", "tagline"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  value={sellerForm[field as keyof typeof sellerForm]}
                  onChange={handleSellerFormChange}
                  className="w-full p-2 border rounded"
                />
              ))}
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
              )}
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={handleSellerRequest} className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit
              </button>
              <button onClick={() => setShowSellerModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
