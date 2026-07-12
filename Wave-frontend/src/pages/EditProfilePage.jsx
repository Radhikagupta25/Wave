import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera } from "lucide-react";
import { getCurrentUser, updateUserDetails, updateUserAvatarImage } from "../api/authApi";

const EditProfilePage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({ fullname: "", username: "", email: "" });
    const [avatarPreview, setAvatarPreview] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getCurrentUser();
                const user = data.data;
                setForm({
                    fullname: user.fullname || "",
                    username: user.username || "",
                    email: user.email || "",
                });
                setAvatarPreview(user.avatar || "/default-avatar.png");
            } catch (err) {
                console.log(err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            await updateUserDetails(form);

            if (avatarFile) {
                const formData = new FormData();
                formData.append("avatar", avatarFile);
                await updateUserAvatarImage(formData);
            }

            setSuccess("Profile updated successfully");
            setTimeout(() => navigate("/profile"), 800);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#08131F] text-slate-400">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#08131F] text-white">

            <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5">
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft className="text-slate-400 hover:text-white" />
                </button>
                <h1 className="text-lg font-semibold">Edit Profile</h1>
            </div>

            <form onSubmit={handleSubmit} className="mx-auto max-w-md px-6 py-10">

                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img
                            src={avatarPreview}
                            alt="avatar"
                            className="h-28 w-28 rounded-full border-4 border-cyan-500/30 object-cover"
                        />
                        <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400">
                            <Camera size={16} />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="mt-8 space-y-4">

                    <div>
                        <label className="mb-1 block text-xs text-slate-400">Full Name</label>
                        <input
                            type="text"
                            value={form.fullname}
                            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-slate-400">Username</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs text-slate-400">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400"
                        />
                    </div>

                </div>

                {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
                {success && <p className="mt-4 text-sm text-green-400">{success}</p>}

                <button
                    type="submit"
                    disabled={saving}
                    className="mt-8 w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold disabled:opacity-50"
                >
                    {saving ? "Saving..." : "Save Changes"}
                </button>

            </form>

        </div>
    );
};

export default EditProfilePage;