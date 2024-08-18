import { useState } from 'preact/hooks';

export function PreactCounter() {
  const [count, setCount] = useState(0);
  return (
    <div class="p-4 bg-gray-100 rounded-lg shadow">
      <p class="text-lg mb-2">Count: {count}</p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  );
}
