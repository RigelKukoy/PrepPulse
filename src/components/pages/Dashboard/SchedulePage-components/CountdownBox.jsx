function CountdownBox({ time, unit }) {
  return (
    <div className="flex flex-col justify-center items-center bg-white backdrop-blur-2xl bg-opacity-5 rounded-xl text-4xl px-10 py-6 shadow-lg">
      {time}
      <div className="mt-2 text-sm font-medium">{unit}</div>
    </div>
  );
}

export default CountdownBox;
