"use client";
import { fetchRecipes, toggleFavorite } from "@/state/recipeSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTimeOutline } from "react-icons/io5";
import { FaFire, FaHeart, FaRegHeart } from "react-icons/fa";
import { BiDish } from "react-icons/bi";
import FavoriteRecipe from "@/component/FavouriteRecipe";
import Image from "next/image";

const Page = () => {
  const dispatch = useDispatch();
  const { recipes, loading, favorites } = useSelector((state) => state.recipes);
  // console.log(recipes);

  const [searchTerm, setSearchTerm] = useState("");
  const [like, setLike] = useState(false);
  const [selectedCookTime, setSelectedCookTime] = useState("");

  const uniqueCookTimes = Array.from(
    new Set(
      recipes.map((recipe) => recipe.cookTimeMinutes).filter((time) => time > 0)
    )
  );

  const filteredRecipes = recipes
    .filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((recipe) => {
      if (!selectedCookTime) return true;
      return recipe.cookTimeMinutes === parseInt(selectedCookTime);
    });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedCookTime("");
  };

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  if (loading) return <div className="flex items-center justify-center text-3xl font-semibold w-full h-full">Loading...</div>;

  return (
    <div className="w-full h-full relative">
      <h1 className="text-3xl font-semibold text-center my-4">Recipe</h1>
      <div className="flex items-center justify-between flex-col md:flex-row gap-4 md:gap-0 px-8">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search recipes"
          className="bg-white border border-gray-300 rounded py-2 px-4"
        />

        <div className="flex justify-center items-center">
          <label className="">Cooking Time:</label>
          <select
            value={selectedCookTime}
            onChange={(e) => setSelectedCookTime(e.target.value)}
            className="bg-white border border-gray-300 rounded py-2 px-4"
          >
            <option value="">All</option>

            {uniqueCookTimes.map((time, index) => (
              <option key={index} value={time}>
                {time} minutes
              </option>
            ))}
          </select>
        </div>

        <div
          onClick={() => setLike(!like)}
          className="border rounded-full size-8 flex items-center justify-center"
        >
          <FaHeart className="text-red-500 cursor-pointer" size={22} />
        </div>
      </div>

      {like && (
        <div className="w-screen h-screen bg-black/20 fixed z-10 top-0 overflow-y-auto">
          <FavoriteRecipe setLike={setLike} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-4 px-4 mt-8">
        {filteredRecipes.map(
          ({
            name,
            id,
            image,
            servings,
            ingredients,
            cookTimeMinutes,
            caloriesPerServing,
            instructions,
          }) => (
            <div
              key={id}
              className="border rounded-3xl w-72 h-full flex flex-col items-center justify-center overflow-hidden relative"
            >
              <Image
                src={image}
                width={500}
                height={500}
                alt={name}
                className="w-full h-full rounded-3xl object-cover"
              />

              <div className="mx-4 px-4 py-2 bg-white border rounded-xl relative bottom-6 flex flex-col items-center">
                <h2 className="text-lg font-medium">{name}</h2>

                <p className="text-sm text-gray-400">{`${ingredients.length} ingredients`}</p>

                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center gap-1">
                    <IoTimeOutline className="text-orange-400 text-xl" />{" "}
                    {cookTimeMinutes}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaFire className="text-orange-400 text-xl" />{" "}
                    {caloriesPerServing}
                  </span>
                  <span className="flex items-center gap-1">
                    <BiDish className="text-orange-400 text-xl" /> {servings}
                  </span>
                </div>
              </div>

              <div className="px-4 pb-4">
                <h3 className="font-medium">Instructions:</h3>
                <p className="line-clamp-2 text-sm text-gray-400">
                  {instructions}
                </p>
              </div>

              <button
                onClick={() => dispatch(toggleFavorite(id))}
                className={`border p-1 bg-orange-500 text-white rounded-full absolute top-4 right-4 ${
                  favorites.includes(id)
                    ? "text-red-600"
                    : ""
                }`}
              >
                {favorites.includes(id) ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Page;
