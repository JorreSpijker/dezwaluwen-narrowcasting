'use client'

interface AlertProps {
  label: string;
  content: string;
  style: string;
}

export default function Alert({ label, content, style }: AlertProps) {
  let classList = `p-2 bg-yellow-200 items-center text-yellow-600 leading-none w-full rounded-full inline-flex`;
  let textColor = 'text-yellow-600';

  if (style === 'success') {
    classList = `p-2 bg-green-200 items-center text-green-600 leading-none w-full rounded-full inline-flex`;
    textColor = 'text-green-600';
  }

  if (style === 'error') {
    classList = `p-2 bg-red-200 items-center text-red-600 leading-none w-full rounded-full inline-flex`;
    textColor = 'text-red-600';
  }

  return (
      <div className={classList} role="alert">
      <span className={`flex rounded-full bg-white ${textColor} uppercase px-2 py-1 text-xs font-bold mr-3`}>{label}</span>
      <span className="font-semibold mr-2 text-left flex-auto">{content}</span>
        <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
      </div>
  )
}
