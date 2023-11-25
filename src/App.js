import React, { useEffect, useState } from "react";
import "./index.scss";
import Collection from "./components/Collection";
import data from "./helpers/data.json";

const categories = [...data.categories];
const collections = [...data.collections];

function App() {
  const [category, setCategory] = useState("Все");
  const [activeCollection, setActiveCollection] = useState(collections);
  const [searchValue, setSearchValue] = useState("");

  const editCategory = function (value) {
    setCategory(value);
  };

  const editActiveCollection = function () {
    const updatedCollections =
      category === "Все"
        ? collections
        : collections.filter(
            (value) =>
              value.category ===
              categories.findIndex((value) => value.name === category)
          );
    setActiveCollection(updatedCollections);
  };

  useEffect(editActiveCollection, [category]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul
          onClick={(e) => {
            e.currentTarget
              .querySelectorAll("li")
              .forEach((value) => value.classList.remove("active"));
            if (e.target.tagName === "LI") {
              e.target.classList.add("active");
            }
            editCategory(e.target.textContent);
          }}
          className="tags"
        >
          <li className="active">Все</li>
          <li>Горы</li>
          <li>Море</li>
          <li>Архитектура</li>
          <li>Города</li>
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {activeCollection
          .filter((value) => {
            return value.name
              .toLowerCase()
              .replace(/\s/g, "")
              .includes(searchValue.toLowerCase().replace(/\s/g, ""));
          })
          .map((value, index) => {
            return (
              <Collection name={value.name} images={value.photos} key={index} />
            );
          })}
      </div>
    </div>
  );
}

export default App;
