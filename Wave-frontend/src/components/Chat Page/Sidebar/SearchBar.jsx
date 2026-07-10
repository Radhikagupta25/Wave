import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl transition focus-within:border-cyan-400">

            <Search
                size={18}
                className="text-cyan-300"
            />

            <input
                type="text"
                placeholder="Search chats..."
                className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
            />

        </div>
    );
};

export default SearchBar;