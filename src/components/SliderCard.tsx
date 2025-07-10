type SliderCardProps = {
  name: string
  handle: string
  message: string
}

export function SliderCard({ name, handle, message }: SliderCardProps) {
  return (
    <div className="min-w-[300px] h-36 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
          {name[0]}
        </div>
        <div>
          <span className="block font-semibold text-white">{name}</span>
          <span className="text-white/60 text-sm">@{handle}</span>
        </div>
      </div>
      <p className="text-white/80 italic text-sm mt-2">"{message}"</p>
    </div>
  )
}
