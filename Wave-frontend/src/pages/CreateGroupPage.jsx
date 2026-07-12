import { useState, useEffect } from "react";
import { Waves, ArrowLeft, Camera, X, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/New chat page/SearchBar";
import BackgroundBlobs from "../components/Landing Page/Hero section/BackgroundBlobs";
import BubbleParticles from "../components/Landing Page/Hero section/BubbleParticles";
import { searchUsers } from "../api/authApi";
import { createGroupConversation } from "../api/conversationApi";
import { uploadAttachment } from "../api/attachmentApi";

const CreateGroupPage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);

    const [creating, setCreating] = useState(false);

    const fetchUsers = async (query = "") => {
        try {
            const response = await searchUsers(query);
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers(search);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const toggleUser = (user) => {
        setSelectedUsers(prev => {
            const exists = prev.some(u => u._id === user._id);
            if (exists) {
                return prev.filter(u => u._id !== user._id);
            }
            return [...prev, user];
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleCreate = async () => {
        if (!groupName.trim() || selectedUsers.length < 2) return;

        setCreating(true);
        try {
            let groupAvatar = "";

            if (avatarFile) {
                const uploaded = await uploadAttachment(avatarFile);
                groupAvatar = uploaded.data.data.url;
            }

            const response = await createGroupConversation({
                groupName: groupName.trim(),
                groupDescription: groupDescription.trim(),
                participantIds: selectedUsers.map(u => u._id),
                groupAvatar,
            });

            navigate("/chats", {
                state: {
                    conversation: response.data.data,
                },
            });

        } catch (error) {
            console.log(error);
        } finally {
            setCreating(false);
        }
    };

    const canCreate = groupName.trim() && selectedUsers.length >= 2 && !creating;

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#08131F] text-white">

            <BackgroundBlobs />
            <BubbleParticles />

            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-44 -top-44 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />
                <div className="absolute -bottom-52 -right-52 h-125 w-125 rounded-full bg-blue-600/20 blur-[170px]" />
                <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[130px]" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10">

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400 hover:bg-white/10"
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(34,211,238,.35)]">
                            <Waves size={24} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">New Group</h1>
                            <p className="text-slate-400">Set up your group and add members.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex items-center gap-5">

                    <label className="relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-cyan-400 hover:text-cyan-300">
                        {avatarPreview ? (
                            <img
                                src={avatarPreview}
                                alt="Group avatar"
                                className="h-full w-full rounded-full object-cover"
                            />
                        ) : (
                            <Camera size={26} />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarChange}
                        />
                    </label>

                    <div className="flex-1 space-y-3">
                        <input
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            placeholder="Group name"
                            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                        />
                        <textarea
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            placeholder="Group description (optional)"
                            rows={2}
                            className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
                        />
                    </div>

                </div>

                {selectedUsers.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {selectedUsers.map(user => (
                            <span
                                key={user._id}
                                className="flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 py-1.5 pl-3 pr-2 text-sm text-cyan-200"
                            >
                                {user.username}
                                <button onClick={() => toggleUser(user)}>
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <SearchBar
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Add Members</h2>
                    <span className="text-sm text-slate-400">{selectedUsers.length} selected</span>
                </div>

                <div className="mt-4 flex-1 space-y-2 overflow-y-auto">
                    {users.map(user => {
                        const isSelected = selectedUsers.some(u => u._id === user._id);
                        return (
                            <button
                                key={user._id}
                                onClick={() => toggleUser(user)}
                                className={`flex w-full items-center gap-4 rounded-2xl p-4 text-left transition
                                ${isSelected
                                        ? "border border-cyan-400 bg-cyan-500/10"
                                        : "border border-transparent bg-white/5 hover:border-cyan-400/50 hover:bg-white/10"
                                    }`}
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 font-semibold text-white">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.username}
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        user.username?.charAt(0).toUpperCase()
                                    )}
                                </div>

                                <span className="flex-1 truncate font-medium">{user.username}</span>

                                {isSelected && (
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500">
                                        <Check size={14} className="text-white" />
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <button
                    onClick={handleCreate}
                    disabled={!canCreate}
                    className="sticky bottom-6 mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-600 px-6 py-4 font-semibold text-white shadow-[0_10px_30px_rgba(34,211,238,.35)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {creating ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                        "Create Group"
                    )}
                </button>

            </div>

        </div>
    );
};

export default CreateGroupPage;