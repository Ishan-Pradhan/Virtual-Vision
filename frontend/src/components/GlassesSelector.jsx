export function GlassesSelector({ selectedGlasses, onSelect }) {
  const glassesOptions = [
    { id: "classic", name: "Classic Round" },
    { id: "aviator", name: "Aviator" },
    { id: "wayfarer", name: "Wayfarer" },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {glassesOptions.map((glass) => (
        <button
          key={glass.id}
          onClick={() => onSelect(glass.id)}
          className={`px-4 py-2 rounded-lg ${
            selectedGlasses === glass.id
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          {glass.name}
        </button>
      ))}
    </div>
  );
}
