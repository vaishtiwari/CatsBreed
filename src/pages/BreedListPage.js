import React, { useEffect, useState } from "react";
import "./style.css";

const BreedListPage = () => {
  const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const handleBreedClick = (breed) => {
    setSelectedBreed(breed);
  };

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const apiKey = "https://api.thecatapi.com/v1/breeds?limit=10&page=0";
        const headers = {
          headers: {
            "x-api-key":
              "live_HPvtNnVPu1A9xKut0K5qyf3W1PDYmtd0bF5cO9E4b91gexTeAIiryvgkuMhgSiqP",
          },
        };

        const response = await fetch(apiKey, headers);
        const data = await response.json();
        setBreedList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div className="main-container">
      <div className="breed-card">
        <div className="left-container">
          <table>
            <thead>
              <tr>
                <th>Breed name</th>
                <th>Breed origin</th>
              </tr>
            </thead>
            <tbody>
              {breedList.map((item) => (
                <tr key={item.id} onClick={() => handleBreedClick(item)}>
                  <td>{item.name}</td>
                  <td>{item.origin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="right-container">
          {selectedBreed && (
            <div key={selectedBreed.id} className="breed-details">
              <img
                src={selectedBreed.image?.url}
                alt={`Image ${selectedBreed.name}`}
                width={200}
              />
              <div className="name">Name: {selectedBreed.name}</div>
              <div>Origin: {selectedBreed.origin}</div>
              <div>Weight: {selectedBreed.weight?.metric} kg</div>
              <div>Temperament: {selectedBreed.temperament}</div>
              <div>Description: {selectedBreed.description}</div>
              <div>Life Span: {selectedBreed.life_span} years</div>
         
              <div>Dog Friendly: {selectedBreed.dog_friendly}</div>
              <div>Health Issues: {selectedBreed.health_issues}</div>
              <div>Intelligence: {selectedBreed.intelligence}</div>
              <div>Social Needs: {selectedBreed.social_needs}</div>
             
              <div>Natural: {selectedBreed.natural ? "Yes" : "No"}</div>
           
              <div>Short Legs: {selectedBreed.short_legs ? "Yes" : "No"}</div>
              <a
                href={selectedBreed.wikipedia_url}
                className="name"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Click to View More</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedListPage;
