import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const UserCard = ({ user, onClick }) => {

    return (

        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: .98 }}
            onClick={onClick}
            className="flex cursor-pointer items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-cyan-400 hover:bg-white/10"
        >

            <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-cyan-400 to-blue-600 text-xl font-bold">

                    {user.username[0].toUpperCase()}

                </div>

                <div>

                    <h2 className="font-semibold">

                        {user.fullname?.trim()
                            ? user.fullname
                            : user.username}

                    </h2>

                    <p className="text-sm text-slate-400">

                        @{user.username}

                    </p>

                </div>

            </div>

            <ChevronRight className="text-cyan-300" />

        </motion.div>

    );

};

export default UserCard;