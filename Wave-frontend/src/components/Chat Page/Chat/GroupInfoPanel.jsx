import { ArrowLeft, X, LogOut, Crown, MoreVertical, ShieldPlus, UserMinus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    getGroupInfo,
    leaveGroup,
    makeAdmin,
    removeMember,
} from "../../../api/conversationApi";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";
import AddParticipantsModal from "./AddParticipantsModal";

const GroupInfoPanel = ({ open, onClose, conversationId, onLeft }) => {

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const [showAddParticipants, setShowAddParticipants] = useState(false);
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmingLeave, setConfirmingLeave] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const [openMemberMenu, setOpenMemberMenu] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);
    const menuRef = useRef(null);

    const loadGroup = () => {
        setLoading(true);
        getGroupInfo(conversationId)
            .then(({ data }) => setGroup(data.data))
            .catch((err) => {
                toast.error(
                    err.response?.data?.message || "Couldn't load group info"
                );
                onClose();
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (!open || !conversationId) return;
        setConfirmingLeave(false);
        loadGroup();
    }, [open, conversationId]);

    useEffect(() => {
        const handleClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMemberMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const currentUserIsAdmin = group?.admins?.some(
        (a) => a._id === loggedInUser?._id
    );

    const handleLeave = async () => {
        setLeaving(true);
        try {
            await leaveGroup(conversationId);
            toast.success("You left the group");
            onLeft?.();
            onClose();
        } catch (err) {
            toast.error(
                err.response?.data?.message || "Couldn't leave group"
            );
        } finally {
            setLeaving(false);
        }
    };

    const handleMakeAdmin = async (memberId) => {
        setActionLoading(true);
        try {
            await makeAdmin(conversationId, memberId);
            toast.success("Promoted to admin");
            loadGroup();
        } catch (err) {
            toast.error(err.response?.data?.message || "Couldn't promote member");
        } finally {
            setActionLoading(false);
            setOpenMemberMenu(null);
        }
    };

    const handleRemoveMember = async (memberId) => {
        setActionLoading(true);
        try {
            await removeMember(conversationId, memberId);
            toast.success("Member removed");
            loadGroup();
        } catch (err) {
            toast.error(err.response?.data?.message || "Couldn't remove member");
        } finally {
            setActionLoading(false);
            setOpenMemberMenu(null);
        }
    };

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-9999 bg-[#08131F] lg:flex lg:items-stretch lg:justify-end lg:bg-black/60 lg:backdrop-blur-sm"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full overflow-y-auto bg-[#08131F] text-white lg:max-w-105 lg:shadow-[-10px_0_40px_rgba(0,0,0,.5)]"
            >
                <div className="sticky top-0 z-10 flex items-center gap-4 bg-[#08131F]/90 px-5 py-4 backdrop-blur-lg">
                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-slate-300 transition hover:bg-white/5 hover:text-white lg:hidden"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-[17px] font-medium text-slate-200">Group info</h1>
                    <button
                        onClick={onClose}
                        className="ml-auto hidden rounded-full p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:block"
                    >
                        <X size={18} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500/30 border-t-cyan-400" />
                    </div>
                ) : group ? (
                    <>
                        <div className="flex flex-col items-center bg-linear-to-b from-cyan-500/10 via-transparent to-transparent pb-8 pt-4">
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-4xl font-semibold text-white shadow-[0_0_0_6px_rgba(34,211,238,0.08)]">
                                {group.groupAvatar ? (
                                    <img
                                        src={group.groupAvatar}
                                        alt={group.groupName}
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    group.groupName?.[0]?.toUpperCase() || "G"
                                )}
                            </div>
                            <h2 className="mt-4 text-xl font-semibold tracking-tight text-white">
                                {group.groupName}
                            </h2>
                            <p className="mt-1 text-[13px] text-slate-500">
                                Group · {group.participants.length} members
                            </p>
                            {group.groupDescription && (
                                <p className="mt-3 max-w-[80%] text-center text-[13px] text-slate-400">
                                    {group.groupDescription}
                                </p>
                            )}
                        </div>
                        <div className="px-4">
                            <div className="px-4">
                                <div className="mb-2 flex items-center justify-between px-1">
                                    <p className="text-[13px] font-medium text-cyan-400/90">
                                        {group.participants.length} members
                                    </p>
                                    <button
                                        onClick={() => setShowAddParticipants(true)}
                                        className="flex items-center gap-1.5 text-[13px] font-medium text-cyan-300 transition hover:text-cyan-200"
                                    >
                                        <UserPlus size={15} />
                                        Add
                                    </button>
                                </div>

                                <div ref={menuRef} className="overflow-visible rounded-2xl bg-[#0F1B2B]">
                                    <AddParticipantsModal
                                        open={showAddParticipants}
                                        onClose={() => setShowAddParticipants(false)}
                                        conversationId={conversationId}
                                        existingParticipantIds={group?.participants?.map((p) => p._id) || []}
                                        onAdded={() => loadGroup()}
                                    />
                                </div>
                            </div>
                            <div ref={menuRef} className="overflow-visible rounded-2xl bg-[#0F1B2B]">
                                {group.participants.map((member, idx) => {
                                    const isAdmin = group.admins?.some(
                                        (a) => a._id === member._id
                                    );
                                    const isMe = member._id === loggedInUser?._id;
                                    const canManage = currentUserIsAdmin && !isMe;

                                    return (
                                        <div
                                            key={member._id}
                                            className={`relative flex items-center gap-3 px-4 py-3 ${idx !== group.participants.length - 1
                                                ? "border-b border-white/5"
                                                : ""
                                                }`}
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white">
                                                {member.avatar ? (
                                                    <img
                                                        src={member.avatar}
                                                        alt={member.username}
                                                        className="h-full w-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    member.username?.[0]?.toUpperCase()
                                                )}
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[14px] text-slate-100">
                                                    {member.fullname || member.username}
                                                    {isMe && (
                                                        <span className="ml-1 text-slate-500">(You)</span>
                                                    )}
                                                </p>
                                                <p className="truncate text-[12px] text-slate-500">
                                                    @{member.username}
                                                </p>
                                            </div>

                                            {isAdmin && (
                                                <span className="flex shrink-0 items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                                                    <Crown size={12} />
                                                    Admin
                                                </span>
                                            )}

                                            {canManage && (
                                                <div className="relative shrink-0">
                                                    <button
                                                        onClick={() =>
                                                            setOpenMemberMenu(
                                                                openMemberMenu === member._id ? null : member._id
                                                            )
                                                        }
                                                        className="rounded-full p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                                                    >
                                                        <MoreVertical size={16} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {openMemberMenu === member._id && (
                                                            <motion.div
                                                                initial={{ opacity: 0, scale: .95, y: -6 }}
                                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                exit={{ opacity: 0, scale: .95, y: -6 }}
                                                                transition={{ duration: .12 }}
                                                                className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-white/10 bg-[#0F1B2B] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,.5)]"
                                                            >
                                                                {!isAdmin && (
                                                                    <button
                                                                        onClick={() => handleMakeAdmin(member._id)}
                                                                        disabled={actionLoading}
                                                                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-slate-300 transition hover:bg-white/5 hover:text-cyan-300 disabled:opacity-50"
                                                                    >
                                                                        <ShieldPlus size={15} />
                                                                        Make Admin
                                                                    </button>
                                                                )}
                                                                <button
                                                                    onClick={() => handleRemoveMember(member._id)}
                                                                    disabled={actionLoading}
                                                                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                                                                >
                                                                    <UserMinus size={15} />
                                                                    Remove
                                                                </button>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-4 px-4">
                            {confirmingLeave ? (
                                <div className="rounded-2xl bg-[#0F1B2B] p-4">
                                    <p className="text-sm text-slate-200">
                                        Leave <span className="font-medium">{group.groupName}</span>?
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        You won't be able to send or receive messages here anymore.
                                    </p>
                                    <div className="mt-4 flex justify-end gap-2">
                                        <button
                                            onClick={() => setConfirmingLeave(false)}
                                            disabled={leaving}
                                            className="rounded-lg px-3 py-1.5 text-xs text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleLeave}
                                            disabled={leaving}
                                            className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs text-red-400 transition hover:bg-red-500/20 disabled:opacity-50"
                                        >
                                            {leaving ? "Leaving…" : "Leave"}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setConfirmingLeave(true)}
                                    className="flex w-full items-center gap-4 rounded-2xl bg-[#0F1B2B] px-5 py-4 text-left text-red-400 transition hover:bg-red-500/10"
                                >
                                    <LogOut size={19} />
                                    <span className="text-[15px]">Leave Group</span>
                                </button>
                            )}
                        </div>
                    </>
                ) : null}
            </motion.div>
        </div>,
        document.body
    );
};

export default GroupInfoPanel;