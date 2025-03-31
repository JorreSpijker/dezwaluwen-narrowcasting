'use client'

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({progress}: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1 absolute top">
      <div className="bg-gray-800 h-1 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
    </div>
  )
}
