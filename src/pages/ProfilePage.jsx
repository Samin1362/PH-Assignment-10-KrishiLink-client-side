import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { usersAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { useToast } from "../context/ToastContext";

const ProfilePage = () => {
  const { user, auth } = useContext(AuthContext);
  // const navigate = useNavigate();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photoURL: "",
    phone: "",
    address: "",
    bio: "",
    role: "farmer",
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from database
      try {
        const response = await usersAPI.getByEmail(user.email);
        const dbUser = response.data;
        setProfileData({
          name: dbUser.name || user.displayName || "",
          email: dbUser.email,
          photoURL: dbUser.photoURL || user.photoURL || "",
          phone: dbUser.phone || "",
          address: dbUser.address || "",
          bio: dbUser.bio || "",
          role: dbUser.role || "farmer",
        });
      } catch (err) {
        // If user not found in DB, create from Firebase auth data
        if (err.message.includes("not found") || err.message.includes("404")) {
          const newUser = {
            email: user.email,
            name: user.displayName || user.email.split("@")[0],
            photoURL: user.photoURL || "",
            role: "farmer",
          };
          await usersAPI.create(newUser);
          setProfileData({
            name: newUser.name,
            email: newUser.email,
            photoURL: newUser.photoURL,
            phone: "",
            address: "",
            bio: "",
            role: newUser.role,
          });
        } else {
          throw err;
        }
      }
    } catch (err) {
      setError(err.message || "Failed to load profile");
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setFormData({ ...profileData });
    setEditing(true);
  };

  const handleCancel = () => {
    setFormData({});
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Update in database
      await usersAPI.update(user.email, formData);

      // Update Firebase profile if name or photo changed
      if (
        formData.name !== user.displayName ||
        formData.photoURL !== user.photoURL
      ) {
        await updateProfile(auth.currentUser, {
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
      }

      setProfileData(formData);
      setEditing(false);
      showSuccess("Profile updated successfully! 👤");

      // Refresh page to update context
      window.location.reload();
    } catch (err) {
      showError(err.message || "Failed to update profile");
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-20 min-h-screen font-[Poppins,sans-serif]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8">My Profile</h1>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#4CAF50] to-[#81C784] p-8 text-white">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white flex items-center justify-center">
                  {(editing ? formData.photoURL : profileData.photoURL) ? (
                    <img
                      src={editing ? formData.photoURL : profileData.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl text-[#4CAF50] font-bold">
                      {(editing ? formData.name : profileData.name)
                        ?.charAt(0)
                        .toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold">
                    {editing ? formData.name : profileData.name}
                  </h2>
                  <p className="text-lg opacity-90">{profileData.email}</p>
                  <p className="mt-2 px-4 py-1 bg-white/20 rounded-full text-sm inline-block">
                    {(editing ? formData.role : profileData.role)
                      ?.charAt(0)
                      .toUpperCase() +
                      (editing ? formData.role : profileData.role)?.slice(1)}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              {!editing ? (
                <>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Full Name
                      </label>
                      <p className="text-lg text-[#1A1A1A]">
                        {profileData.name || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Email Address
                      </label>
                      <p className="text-lg text-[#1A1A1A]">
                        {profileData.email}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Phone Number
                      </label>
                      <p className="text-lg text-[#1A1A1A]">
                        {profileData.phone || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Address
                      </label>
                      <p className="text-lg text-[#1A1A1A]">
                        {profileData.address || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Bio
                      </label>
                      <p className="text-lg text-[#1A1A1A]">
                        {profileData.bio || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-600 mb-1">
                        Role
                      </label>
                      <p className="text-lg text-[#1A1A1A] capitalize">
                        {profileData.role}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleEdit}
                    className="btn-primary w-full mt-8"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address (Read-only)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                        disabled
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Photo URL
                      </label>
                      <input
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        placeholder="Your full address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows="4"
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                      >
                        <option value="farmer">Farmer</option>
                        <option value="trader">Trader</option>
                        <option value="buyer">Buyer</option>
                      </select>
                    </div>
                  </form>

                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary flex-1 disabled:opacity-50"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-outline flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
