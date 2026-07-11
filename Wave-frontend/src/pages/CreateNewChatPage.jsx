import { useState, useEffect } from "react";
import { Waves, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/New chat page/SearchBar";
import UserList from "../components/New chat page/UserList";
import BackgroundBlobs from "../components/Landing Page/Hero section/BackgroundBlobs";
import BubbleParticles from "../components/Landing Page/Hero section/BubbleParticles";
import { searchUsers } from "../api/authApi";
import { createConversation } from "../api/conversationApi";

const CreateNewChatPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const handleSelectUser = async (user) => {
        try {

            const response = await createConversation(user._id);

            navigate("/chats", {
                state: {
                    conversation: response.data.data,
                },
            });

        } catch (error) {
            console.log(error);
        }
    };
    const fetchUsers = async (query = "") => {
        try {
            const response = await searchUsers(query);
            setUsers(response.data.data);
        }
        catch (error) {
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


                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => navigate(-1)}
                            className="rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:border-cyan-400 hover:bg-white/10"
                        >
                            <ArrowLeft size={22} />
                        </button>

                        <div className="flex items-center gap-4">

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_25px_rgba(34,211,238,.35)]">

                                <Waves
                                    size={24}
                                    className="text-white"
                                />

                            </div>

                            <div>

                                <h1 className="text-3xl font-bold">

                                    New Chat

                                </h1>

                                <p className="text-slate-400">

                                    Search users and start a conversation.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                <div className="mt-10">

                    <SearchBar
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="mt-10 flex items-center justify-between">

                    <h2 className="text-lg font-semibold">

                        Suggested Users

                    </h2>

                    <span className="text-sm text-slate-400">

                        {users.length} users

                    </span>

                </div>

                <div className="mt-6 flex-1">

                    {users.length > 0 ? (

                        <UserList
                            users={users}
                            onSelect={handleSelectUser}
                        />

                    ) : (

                        <div className="mt-24 flex flex-col items-center justify-center text-center">

                            <div className="text-6xl">

                                🔍

                            </div>

                            <h2 className="mt-4 text-xl font-semibold">

                                No Users Found

                            </h2>

                            <p className="mt-2 text-slate-400">

                                Try searching with another username.

                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default CreateNewChatPage;