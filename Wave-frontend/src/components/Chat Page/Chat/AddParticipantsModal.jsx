import { X, Search, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { searchUsers } from "../../../api/authApi";
import { addParticipants } from "../../../api/conversationApi";
import { toast } from "sonner";

const AddParticipantsModal = ({ open, onClose, conversationId, existingParticipantIds, onAdded }) => {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [selectedIds, setSelectedIds] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) {
            setQuery("");
            setResults([]);
            setSelectedIds([]);
        }
    }, [open]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const timer = setTimeout(async () => {
            setSearching(true);
            try {
                const { data } = await searchUsers(query.trim());
                const filtered = (data.data || []).filter(
                    (u) => !existingParticipantIds.includes(u._id)
                );
                setResults(filtered);
            } catch (err) {
                console.log(err);
            } finally {
                setSearching(false);
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [query, existingParticipantIds]);

    const toggleSelect = (userId) => {
        setSelectedIds((prev) =>
            prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
        );
    };

    const handleSubmit = async () => {
        if (selectedIds.length === 0) return;

        setSubmitting(true);
        try {
            const { data } = await addParticipants(conversationId, selectedIds);
            toast.success(
                selectedIds.length === 1 ? "Participant added" : "Participants added"
            );
            onAdded?.(data.data);
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || "Couldn't add participants");
        } finally {
            setSubmitting(false);
        }
    };

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-10000 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.15 }}
                className="flex h-130 w-full max-w-md flex-col rounded-2xl border border-white/10 bg-[#0F1B2B] shadow-[0_15px_40px_rgba(0,0,0,.5)]"
            >
                <div className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-[16px] font-medium text-white">Add participants</h2>
                    <button
                        onClick={onClose}
                        className="rounded-full p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="px-5 pb-3">
                    <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2.5">
                        <Search size={16} className="text-slate-500" />
                        <input
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name or username"
                            className="w-full bg-transparent text-[14px] text-white placeholder:text-slate-500 focus:outline-none"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3">
                    {searching && (
                        <p className="px-2 py-3 text-center text-[13px] text-slate-500">Searching…</p>
                    )}

                    {!searching && query.trim() && results.length === 0 && (
                        <p className="px-2 py-3 text-center text-[13px] text-slate-500">No users found</p>
                    )}

                    {results.map((user) => {
                        const selected = selectedIds.includes(user._id);
                        return (
                            <button
                                key={user._id}
                                onClick={() => toggleSelect(user._id)}
                                className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-white/5"
                            >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.username}
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        user.username?.[0]?.toUpperCase()
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-[14px] text-slate-100">
                                        {user.fullname || user.username}
                                    </p>
                                    <p className="truncate text-[12px] text-slate-500">@{user.username}</p>
                                </div>

                                <div
                                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${selected
                                            ? "border-cyan-400 bg-cyan-400"
                                            : "border-slate-600"
                                        }`}
                                >
                                    {selected && <Check size={13} className="text-[#08131F]" />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="border-t border-white/5 px-5 py-4">
                    <button
                        onClick={handleSubmit}
                        disabled={selectedIds.length === 0 || submitting}
                        className="w-full rounded-xl bg-cyan-500 py-2.5 text-[14px] font-medium text-[#08131F] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        {submitting
                            ? "Adding…"
                            : selectedIds.length > 0
                                ? `Add ${selectedIds.length} participant${selectedIds.length > 1 ? "s" : ""}`
                                : "Add participants"}
                    </button>
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

export default AddParticipantsModal;