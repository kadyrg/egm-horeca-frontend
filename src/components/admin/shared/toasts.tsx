import { CheckCircle, CircleAlert } from "lucide-react";

function GoodToast({ text } : { text: string }) {
  return (
    <div className="flex items-center gap-3 text-green-700">
      <CheckCircle size={20} />
      {text}
    </div>
  );
};

function BadToast({ text } : { text: string }) {
  return (
    <div className="flex items-center gap-3 text-green-700 text-red-600">
      <CircleAlert size={20} />
      {text}
    </div>
  )
}

export { GoodToast, BadToast }