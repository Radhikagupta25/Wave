import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil, Mail, AtSign, Calendar } from "lucide-react";
import { getCurrentUser } from "../api/authApi";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await getCurrentUser();
                setUser(data.data);
            } catch (err) {
                console.log(err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#08131F] text-slate-400">
                Loading profile...
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#08131F] text-red-400">
                {error || "Something went wrong"}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#08131F] text-white">

            <div className="flex items-center gap-4 border-b border-white/10 px-6 py-5">
                <button onClick={() => navigate(-1)}>
                    <ArrowLeft className="text-slate-400 hover:text-white" />
                </button>
                <h1 className="text-lg font-semibold">My Profile</h1>
            </div>

            <div className="mx-auto max-w-md px-6 py-10">

                <div className="flex flex-col items-center">
                    <img
                        src={user.avatar || "/default-avatar.png"}
                        alt={user.fullname}
                        className="h-28 w-28 rounded-full border-4 border-cyan-500/30 object-cover"
                    />
                    <h2 className="mt-4 text-xl font-bold">{user.fullname}</h2>
                    <p className="text-slate-400">@{user.username}</p>
                </div>

                <div className="mt-8 space-y-4">

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Mail size={18} className="text-cyan-400" />
                        <div>
                            <p className="text-xs text-slate-400">Email</p>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <AtSign size={18} className="text-cyan-400" />
                        <div>
                            <p className="text-xs text-slate-400">Username</p>
                            <p>{user.username}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <Calendar size={18} className="text-cyan-400" />
                        <div>
                            <p className="text-xs text-slate-400">Joined</p>
                            <p>
                                {new Date(user.createdAt).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>

                </div>

                <button
                    onClick={() => navigate("/edit-profile")}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-3 font-semibold"
                >
                    <Pencil size={16} />
                    Edit Profile
                </button>

            </div>

        </div>
    );
};

export default ProfilePage;