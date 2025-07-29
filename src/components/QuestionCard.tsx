type QuestionCardProps = {
  question: string
  timestamp: string
  avatar: string
  color: string
}

export const QuestionCard = ({ question, timestamp, avatar, color }: QuestionCardProps) => {
  return (
    <div
      className="max-w-full w-full md:w-4xl p-4 rounded-xl flex items-start gap-3 transition-transform dark:bg-neutral-900 border dark:border-neutral-800 shadow-sm"
    >
      <div
        className={`w-5 h-5 md:w-10 md:h-10 rounded-full flex items-center justify-center dark:text-white font-bold text-xl ${color}`}
      >{avatar}</div>

      <div className="flex flex-col">
        <p className="dark:text-white text-xs md:text-lg">{question}</p>
        <span className="text-xs md:text-sm text-neutral-400 mt-1">Randomly · {timestamp}</span>
      </div>
    </div>
  )
}