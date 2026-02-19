import React from "react";
import { useDispatch } from "react-redux";
import { toggleGptSearchView } from "../utlis/gptSlice";

const GptSearch = () => {
  const dispatch = useDispatch();

  return (
    <div className="pt-28 px-8 text-white">
      <div className="max-w-2xl mx-auto bg-black/60 border border-white/10 rounded p-6">
        <h1 className="text-2xl font-bold mb-2">NetflixGPT (UI placeholder)</h1>
        <p className="text-white/70 text-sm mb-4">
          This screen is wired up. Next step is to connect OpenAI / Gemini and
          show movie results.
        </p>

        <div className="flex gap-2">
          <input
            className="flex-1 p-3 rounded bg-white/10 border border-white/10 outline-none"
            placeholder="Search with GPT…"
          />
          <button className="px-4 py-3 bg-red-600 rounded hover:bg-red-700">
            Search
          </button>
        </div>

        <button
          onClick={() => dispatch(toggleGptSearchView())}
          className="mt-4 text-sm underline text-white/80 hover:text-white"
        >
          Back to Browse
        </button>
      </div>
    </div>
  );
};

export default GptSearch;

