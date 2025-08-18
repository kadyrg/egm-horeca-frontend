function Or({ text } : { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <hr className="w-full border-slate-300" />
      <h3 className="whitespace-nowrap text-sm font-medium text-slate-500">{text}</h3>
      <hr className="w-full border-slate-300" />
    </div>
  );
};

export { Or };
