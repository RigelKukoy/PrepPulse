function ReferenceComponent({ reference }) {
  console.log("references", reference.id);
  return (
    <a
      href={
        reference.link.startsWith("http")
          ? reference.link
          : `https://${reference.link}`
      }
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col py-2 px-3 bg-slate-50 shadow-md rounded-xl hover:scale-[1.02] transition-transform duration-300">
        <div className="flex items-center text-xl font-semibold rounded-xl">
          {reference.title}
        </div>
        <div className="text-sm font-normal text-slate-400">
          {reference.link}
        </div>
      </div>
    </a>
  );
}

export default ReferenceComponent;
