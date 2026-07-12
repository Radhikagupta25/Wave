import { ArrowLeft, Ban, ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getUserProfile, blockUser, unblockUser } from "../api/authApi";
import { toast } from "sonner";
import BackgroundBlobs from "../components/Landing Page/Hero section/BackgroundBlobs";
import BubbleParticles from "../components/Landing Page/Hero section/BubbleParticles";

const Profile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isBlocked, setIsBlocked] = useState(false);

    useEffect(() => {
        setLoading(true);
        getUserProfile(userId)
            .then(setProfile)
            .catch((err) => {
                console.log(err.response?.data || err.message);
                toast.error("Couldn't load this profile");
                navigate(-1);
            })
            .finally(() => setLoading(false));
    }, [userId]);

    const handleBlockToggle = async () => {
        try {
            if (isBlocked) {
                await unblockUser(userId);
                setIsBlocked(false);
                toast.success("User unblocked");
            } else {
                await blockUser(userId);
                setIsBlocked(true);
                toast.success("User blocked");
            }
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#08131F]">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-400" />
            </div>
        );
    }

    if (!profile) return null;

    const initial = profile.fullname?.[0]?.toUpperCase() || profile.username?.[0]?.toUpperCase() || "?";
    const joinedDate = profile.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
        : null;

    const isSelf = profile._id === loggedInUser?._id;

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#08131F] pb-16 text-white">
            <div className="pointer-events-none absolute inset-0 z-0">
                <BackgroundBlobs />
                <BubbleParticles />
            </div>

            <div className="relative z-10">
                <div className="sticky top-0 z-10 flex items-center gap-5 bg-[#08131F]/90 px-5 py-4 backdrop-blur-lg">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full p-2 text-slate-300 transition hover:bg-white/5 hover:text-white"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-[17px] font-medium text-slate-200">Contact info</h1>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col items-center bg-linear-to-b from-cyan-500/10 via-transparent to-transparent pb-8 pt-4"
                >
                    <div className="relative">
                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-5xl font-semibold text-white shadow-[0_0_0_6px_rgba(34,211,238,0.08)]">
                            {profile.avatar ? (
                                <img
                                    src={profile.avatar}
                                    alt={profile.username}
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                initial
                            )}
                        </div>
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white">
                        {profile.fullname || profile.username}
                    </h2>
                    <p className="mt-1 text-[15px] text-slate-400">@{profile.username}</p>
                </motion.div>

                <div className="mx-auto max-w-md px-4">
                    <div className="overflow-hidden rounded-2xl bg-[#0F1B2B]">
                        {profile.email && (
                            <div className="border-b border-white/5 px-5 py-4">
                                <p className="text-[13px] text-cyan-400/90">Email</p>
                                <p className="mt-1 text-[15px] text-slate-100">{profile.email}</p>
                            </div>
                        )}

                        <div className="border-b border-white/5 px-5 py-4">
                            <p className="text-[13px] text-cyan-400/90">Username</p>
                            <p className="mt-1 text-[15px] text-slate-100">@{profile.username}</p>
                        </div>

                        {joinedDate && (
                            <div className="px-5 py-4">
                                <p className="text-[13px] text-cyan-400/90">Member since</p>
                                <p className="mt-1 text-[15px] text-slate-100">{joinedDate}</p>
                            </div>
                        )}
                    </div>

                    {!isSelf && (
                        <div className="mt-4 overflow-hidden rounded-2xl bg-[#0F1B2B]">
                            <button
                                onClick={handleBlockToggle}
                                className="flex w-full items-center gap-4 px-5 py-4 text-left text-red-400 transition hover:bg-red-500/10"
                            >
                                <Ban size={19} />
                                <span className="text-[15px]">
                                    {isBlocked ? `Unblock ${profile.username}` : `Block ${profile.username}`}
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;