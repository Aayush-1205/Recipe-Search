import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async () => {
    const response = await axios.get("https://dummyjson.com/recipes");
    return response.data.recipes;
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    favorites: [],
    loading: false,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const recipeId = action.payload;
      const exists = state.favorites.includes(recipeId);
      if (exists) {
        state.favorites = state.favorites.filter((id) => id !== recipeId);
      } else {
        state.favorites.push(recipeId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
