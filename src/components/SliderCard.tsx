type SliderCardProps = {
  name: string
  handle: string
  message: string
  bgcolor: string
}

export function SliderCard({ name, handle, message, bgcolor }: SliderCardProps) {
  return (
    <div className="w-full min-w-[180px] md:min-w-[320px] max-w-xs sm:max-w-sm dark:bg-white/5 border border-black/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className={`w-7 h-7 md:w-10 md:h-10 ${bgcolor} rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white`}></div>
        <div>
          <span className="block font-semibold dark:text-white text-xs md:text-base">{name}</span>
          <span className="dark:text-white/60 text-xs md:text-sm">@{handle}</span>
        </div>
      </div>
    <p className="dark:text-white/80 italic text-xs md:text-base mt-1 md:mt-4 line-clamp-3">
  "{message}"
</p>
    </div>
  )
}
