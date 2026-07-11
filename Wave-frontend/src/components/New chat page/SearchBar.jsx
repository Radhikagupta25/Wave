import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {

    return (

        <div className="mt-10">

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl focus-within:border-cyan-400">

                <Search
                    size={20}
                    className="text-cyan-300"
                />

                <input
                    value={value}
                    onChange={onChange}
                    placeholder="Search username..."
                    className="w-full bg-transparent text-white outline-none placeholder:text-slate-500"
                />

            </div>

        </div>

    );

};

export default SearchBar;