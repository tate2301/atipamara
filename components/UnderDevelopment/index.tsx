export default function UnderDevelopment() {
  return (
    <div className="h-full max-w-2xl mx-auto p-4">
      <div
        style={{
          boxShadow: "0px 3px 8px -4px rgba(0, 0, 0, 0.1)",
        }}
        className="bg-[#fff] p-[8px] rounded-lg h-[54px] w-full flex justify-start gap-[8px] items-center mb-8"
      >
        {new Array(16).fill(0).map((_, i) => (
          <div
            key={`item-${i}`}
            style={{ width: "10px" }}
            className={`h-full rounded-full bg-orange-500 animate-pulse ${i % 2 === 0 ? "animate-bounce" : "animate-bounce-slow"}`}
          ></div>
        ))}
      </div>
      <div className="mb-32">
        <h1 className="text-xl font-bold tracking-tight mb-2">
          Well, this is awkward
        </h1>
        <p className="text-lg">
          This page is under development. Maybe check back later? 🤷‍♂️
        </p>
      </div>
      <div className="space-y-24 border-t border-dashed border-zinc-400/20 pt-32"></div>
    </div>
  );
}
