const OtpInput = () => {

    return (

        <div>

            <label className="mb-4 block text-sm text-slate-300">

                Verification Code

            </label>

            <div className="flex justify-between gap-3">

                {[...Array(6)].map((_, index) => (

                    <input
                        key={index}
                        maxLength={1}
                        className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 text-center text-xl font-semibold text-white outline-none transition focus:border-cyan-400"
                    />

                ))}

            </div>

        </div>

    );

};

export default OtpInput;