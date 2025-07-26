type SliderCardProps = {
  name: string
  handle: string
  message: string
}

export function SliderCard({ name, handle, message }: SliderCardProps) {
  return (
    <div className="w-full sm:min-w-[280px] md:min-w-[320px] max-w-sm h-auto bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white">
          {name[0]}
        </div>
        <div>
          <span className="block font-semibold text-white text-sm sm:text-base">{name}</span>
          <span className="text-white/60 text-xs sm:text-sm">@{handle}</span>
        </div>
      </div>
      <p className="text-white/80 italic text-sm sm:text-base mt-3 sm:mt-4 line-clamp-3">
        "{message}"
      </p>
    </div>
  )
}
