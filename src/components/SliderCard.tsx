export function SliderCard() {
  return (
    <div className="min-w-[300px] h-52 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
          IMG
        </div>
        <div>
          <span className="block font-semibold text-white">User</span>
          <span className="text-white/60 text-sm">@user</span>
        </div>
      </div>
      <p className="text-white/80 mt-4 text-sm">
        "This is a sample anonymous message from user."
      </p>
    </div>
  );
}
