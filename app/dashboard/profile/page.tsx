"use client";

import { useEffect, useState } from "react";
import { useMe } from "@/hooks/useMe";
import { getToken } from "@/utils/auth";

export default function ProfilePage() {
  const { data, loading, error } = useMe();
  const user = data?.user;

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [phone, setPhone] = useState("");


  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      resetForm();
    }
  }, [user]);

 const resetForm = () => {
  setName(user?.name || "");
  setPhone(user?.phone || ""); // 👈 ADD THIS
  setPortfolioUrl(user?.portfolioUrl || "");
  setGithubUrl(user?.githubUrl || "");
  setLinkedinUrl(user?.linkedinUrl || "");
  setResume(null);
  setCoverLetter(null);
};


  if (loading) return <p className="text-gray-700">Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

 const handleUpdate = async () => {
  try {
    setSaving(true);
    setMessage("");

    const token = getToken();
    if (!token) {
      setMessage("Unauthorized");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone); // 👈 ADD THIS LINE
    formData.append("portfolioUrl", portfolioUrl);
    formData.append("githubUrl", githubUrl);
    formData.append("linkedinUrl", linkedinUrl);

    if (resume) formData.append("resume", resume);
    if (coverLetter) formData.append("coverLetter", coverLetter);

    const res = await fetch("/api/user/updateUser", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      setMessage(data.message || "Update failed");
      return;
    }

    setMessage("Profile updated successfully ✅");
    setIsEditing(false);
  } catch {
    setMessage("Server error");
  } finally {
    setSaving(false);
  }
};


return (
  <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 text-gray-900">
    <div className="max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-semibold flex items-center gap-1 hover:underline"
          >
            ✏️ Edit
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow border border-gray-200 space-y-5">

        {/* Name */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Name</label>
          <input
            value={name}
            disabled={!isEditing}
            onChange={(e) => setName(e.target.value)}
            className={`
              w-full p-3 rounded-lg border
              ${isEditing
                ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-50 text-gray-700"}
              outline-none
            `}
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            value={user?.email || ""}
            disabled
            className="
              w-full p-3 rounded-lg border
              border-gray-200 bg-gray-50 text-gray-600
            "
          />
        </div>

        <input
  type="tel"
  value={phone}
  disabled={!isEditing}
  onChange={(e) =>
    setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
  }
  placeholder="Enter phone number"
  className={`
    w-full p-3 rounded-lg border
    ${
      isEditing
        ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
        : "border-gray-200 bg-gray-50"
    }
    outline-none
  `}
/>



        {/* Portfolio */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Portfolio
          </label>
          <input
            value={portfolioUrl}
            disabled={!isEditing}
            onChange={(e) => setPortfolioUrl(e.target.value)}
            className={`
              w-full p-3 rounded-lg border
              ${isEditing
                ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-50"}
              outline-none
            `}
          />
        </div>

        {/* GitHub */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">GitHub</label>
          <input
            value={githubUrl}
            disabled={!isEditing}
            onChange={(e) => setGithubUrl(e.target.value)}
            className={`
              w-full p-3 rounded-lg border
              ${isEditing
                ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-50"}
              outline-none
            `}
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            LinkedIn
          </label>
          <input
            value={linkedinUrl}
            disabled={!isEditing}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            className={`
              w-full p-3 rounded-lg border
              ${isEditing
                ? "border-gray-300 focus:ring-2 focus:ring-blue-500"
                : "border-gray-200 bg-gray-50"}
              outline-none
            `}
          />
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow border border-gray-200 space-y-5">
        <h2 className="font-semibold text-gray-800">Documents</h2>

        {/* Resume */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Resume
          </label>

          {isEditing && (
            <input
              type="file"
              className="text-sm text-gray-700"
              onChange={(e) =>
                setResume(e.target.files?.[0] || null)
              }
            />
          )}

          {user?.resume?.url && (
            <a
              href={`/api/user/documentView?url=${encodeURIComponent(
                user.resume.url
              )}`}
              target="_blank"
              className="text-blue-600 text-sm font-medium"
            >
              View Resume
            </a>
          )}
        </div>

        {/* Cover Letter */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">
            Cover Letter
          </label>

          {isEditing && (
            <input
              type="file"
              className="text-sm text-gray-700"
              onChange={(e) =>
                setCoverLetter(e.target.files?.[0] || null)
              }
            />
          )}

          {user?.coverLetter?.url && (
            <a
              href={`/api/user/documentView?url=${encodeURIComponent(
                user.coverLetter.url
              )}`}
              target="_blank"
              className="text-blue-600 text-sm font-medium"
            >
              View Cover Letter
            </a>
          )}
        </div>
      </div>

      {/* Actions */}
      {isEditing && (
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={saving}
            className="
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              text-white font-semibold
              disabled:opacity-60
            "
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => {
              resetForm();
              setIsEditing(false);
            }}
            className="
              px-6 py-3 rounded-xl
              border border-gray-300
              hover:bg-gray-100
            "
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  </div>
);




}
