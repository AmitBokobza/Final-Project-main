//CRUD

import axios from "axios";
import Recipe from "../interfaces/Recipe/Recipe";

const API: string = import.meta.env.VITE_API_RECIPES;

// Recipes

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getRecipeById = async (id: string) => {
  const url = `${API}/${id}`;
  console.log("Fetching recipe from:", url);
  try {
    const response = await axios.get(`${API}/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMyRecipes = async (token: string) => {
  try {
    const response = await axios.get(`${API}/my-recipes`, {
      headers: {
        "token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createRecipe = async (recipe: Recipe, token: string) => {
  try {
    const response = await axios.post(API, recipe, {
      headers: {
        "token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const likeRecipe = async (id: string, token: string) => {
  try {
    const response = await axios.patch(
      `${API}/${id}`,
      {},
      {
        headers: {
          "token": token,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteRecipe = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API}/${id}`, {
      headers: {
        "token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = async (id: string, recipe: Recipe, token: string) => {
  try {
    const response = await axios.put(`${API}/${id}`, recipe, {
      headers: {
        "token": token,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};