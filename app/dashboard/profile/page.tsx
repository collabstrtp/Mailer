"use client";

import { useEffect, useState } from "react";
import { useMe } from "@/hooks/useMe";
import { getToken } from "@/utils/auth";

export default function ProfilePage() {
  const { data, loading, error } = useMe();
  const user = data?.user;

  const [name, setName] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPortfolioUrl(user.portfolioUrl || "");
      setGithubUrl(user.githubUrl || "");
      setLinkedinUrl(user.linkedinUrl || "");
    }
  }, [user]);

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
    } catch {
      setMessage("Server error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 border rounded space-y-4 text-gray-800">
      <h2 className="text-xl font-semibold text-gray-900">Profile</h2>

      <Input label="Name" value={name} onChange={setName} />
      <Input label="Email" value={user?.email} disabled />
      <Input label="Portfolio" value={portfolioUrl} onChange={setPortfolioUrl} />
      <Input label="GitHub" value={githubUrl} onChange={setGithubUrl} />
      <Input label="LinkedIn" value={linkedinUrl} onChange={setLinkedinUrl} />

      <div>
        <label className="text-sm text-gray-700">Resume</label>
        <input
          type="file"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />
        {user?.resume?.url && (
          <a
            href={`/api/user/documentView?url=${encodeURIComponent(user.resume.url)}`}
            target="_blank"
            className="text-blue-600 text-sm"
          >
            View Resume
          </a>


        )}
      </div>

      <div>
        <label className="text-sm text-gray-700">Cover Letter</label>
        <input
          type="file"
          onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
        />
        {user?.coverLetter?.url && (
          <a
            href={`/api/user/documentView?url=${encodeURIComponent(
              user.coverLetter.url
            )}`}
            target="_blank"
          >
            View Cover Letter
          </a>


        )}
      </div>

      {message && <p className="text-blue-700">{message}</p>}

      <button
        onClick={handleUpdate}
        disabled={saving}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <input
        value={value || ""}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full border px-3 py-2 rounded text-gray-800"
      />
    </div>
  );
}
