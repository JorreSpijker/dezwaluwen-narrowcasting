'use client'

interface AlertProps {
  label: string;
  content: string;
  style: string;
}

export default function Alert({ label, content, style }: AlertProps) {
  const [message, ...rest] = content.split('\n');
  const detail = rest.join('\n');

  let classList = `px-4 py-3 bg-yellow-200 items-center text-yellow-800 w-full rounded-full inline-flex`;
  let textColor = 'text-yellow-800';

  if (style === 'success') {
    classList = `px-4 py-3 bg-green-200 items-center text-green-800 w-full rounded-full inline-flex`;
    textColor = 'text-green-800';
  }

  if (style === 'error') {
    classList = `px-4 py-3 bg-red-200 items-center text-red-800 w-full rounded-full inline-flex`;
    textColor = 'text-red-800';
  }

  return (
      <div className={classList} role="alert">
      <span className={`flex rounded-full bg-white ${textColor} uppercase px-2 py-1 text-xs font-bold mr-3`}>{label}</span>
      <span className="flex flex-col text-left flex-auto">
        <span className="font-semibold">{message}</span>
        {detail ? <span className="text-xs font-normal opacity-80">{detail}</span> : null}
      </span>
      </div>
  )
}
