/* eslint-disable react/prop-types */
function Counter({ count, setIncrease, setDecrease }) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setDecrease()}
        className="px-2 md:px-3 md:py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      >
        -
      </button>
      <span className="text-xl font-bold">{count}</span>
      <button
        onClick={() => setIncrease()}
        className="px-2 md:px-3 md:py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
      >
        +
      </button>
    </div>
  );
}

export default Counter;
