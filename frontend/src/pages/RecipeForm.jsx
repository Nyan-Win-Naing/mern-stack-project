import React, { useEffect, useState } from "react";
// @ts-ignore
import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients.jsx";
import axios from "../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function RecipeForm() {
  let { id } = useParams();

  console.log("Use Params is ===> ", id);

  let navigate = useNavigate();
  let [ingredients, setIngredients] = useState([]);
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newIngredient, setNewIngredient] = useState("");
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState(null);
  let [errors, setErrors] = useState([]);

  useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get("/api/recipes/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
        }
      }
    };

    fetchRecipe();
  }, [id]);

  let addIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  let submit = async (e) => {
    try {
      e.preventDefault();

      let recipe = {
        title,
        description,
        ingredients,
      };

      let res;
      if (id) {
        res = await axios.patch("/api/recipes/" + id, recipe);
      } else {
        res = await axios.post("/api/recipes", recipe);
      }

      // file
      let formData = new FormData();
      formData.set("photo", file);

      // upload
      let uploadRes = await axios.post(
        `/api/recipes/${res.data._id}/upload`,
        formData,
        {
          headers: {
            Accept: "multipart/form-data"
          }
        }
      );

      console.log(uploadRes);
      if (res.status === 200) {
        navigate("/");
      }
      console.log(res);
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
    }
  };

  let upload = (e) => {
    let file = e.target.files[0];
    setFile(file);

    // preview
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };

  return (
    <div className="mx-auto max-w-md border-2 border-white p-4">
      <h1 className="mb-6 text-2xl font-bold text-orange-400 text-center">
        Recipe {id ? "Edit" : "Create"} Form
      </h1>
      <form action="" className="space-y-5" onSubmit={submit}>
        <ul className="list-disc pl-3">
          {!!errors.length &&
            errors.map((error, i) => (
              <li className="text-red-500 text-sm" key={i}>
                {error} is invalid value
              </li>
            ))}
        </ul>
        <input type="file" onChange={upload} />

        {preview && <img src={preview} alt="" />}

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Recipe Title"
          className="w-full p-1 bg-white"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Recipe Description"
          rows={5}
          className="w-full p-1 bg-white"
        />
        <div className="flex space-x-2 items-center">
          <input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            type="text"
            placeholder="Recipe Ingredient"
            className="w-full p-1 bg-white"
          />
          <img
            src={plus}
            alt=""
            className="cursor-pointer"
            onClick={addIngredient}
          />
        </div>
        <div>
          <Ingredients ingredients={ingredients} />
        </div>
        <button
          type="submit"
          className="w-full px-3 py-1 rounded-full bg-orange-400 text-white"
        >
          {id ? "Update" : "Create"} Recipe
        </button>
      </form>
    </div>
  );
}
