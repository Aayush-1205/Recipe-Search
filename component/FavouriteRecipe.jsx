"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTimeOutline } from 'react-icons/io5'
import { FaFire, FaHeart, FaRegHeart } from 'react-icons/fa'
import { BiDish } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { toggleFavorite } from "@/state/recipeSlice";
import Image from "next/image";

const FavoriteRecipe = ({ setLike }) => {
    const dispatch = useDispatch();

    const { recipes, favorites } = useSelector((state) => state.recipes);

    const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id));

    return (
        <div className="bg-white rounded-3xl w-full h-full relative">
            <div className="flex items-center justify-between w-full px-8 bg-white">
                <h1 className="text-xl font-semibold my-4">Favorite Recipes</h1>
                <RxCross2 size={24} onClick={() => setLike(false)} className="cursor-pointer" />
            </div>
            {favorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-content-center gap-4 px-4 mt-4">
                    {favoriteRecipes.map(
                        ({
                            name,
                            id,
                            image,
                            servings,
                            ingredients,
                            cookTimeMinutes,
                            caloriesPerServing,
                            instructions
                        }) => (
                            <div
                                key={id}
                                className="border rounded-3xl w-72 h-full flex flex-col items-center justify-center overflow-hidden relative"
                            >
                                <Image
                                    src={image}
                                    width={100}
                                    height={100}
                                    alt={name}
                                    className="w-full h-full rounded-3xl object-cover"
                                />

                                <div className="mx-4 px-4 py-2 bg-white border rounded-xl relative bottom-6 flex flex-col items-center">
                                    <h2 className="text-lg font-medium">{name}</h2>

                                    <p className="text-sm text-gray-400">{`${ingredients.length} ingredients`}</p>

                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="flex items-center gap-1"> <IoTimeOutline className="text-orange-400 text-xl" /> {cookTimeMinutes}</span>
                                        <span className="flex items-center gap-1"> <FaFire className="text-orange-400 text-xl" /> {caloriesPerServing}</span>
                                        <span className="flex items-center gap-1"> <BiDish className="text-orange-400 text-xl" /> {servings}</span>
                                    </div>
                                </div>

                                <div className="px-4 pb-4">
                                    <h3 className="font-medium">Instructions:</h3>
                                    <p className="line-clamp-2 text-sm text-gray-400">{instructions}</p>
                                </div>

                                <button
                                    onClick={() => dispatch(toggleFavorite(id))}
                                    className={`border p-1 bg-orange-500 text-white rounded-full absolute top-4 right-4 ${favorites.includes(id)
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
            ) : (
                <div className="w-full h-full flex items-center justify-center">
                    <p>Looking for something???</p>
                </div>
            )}
        </div>
    );
};

export default FavoriteRecipe;
