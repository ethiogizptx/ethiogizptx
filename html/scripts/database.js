"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const expertsList = document.getElementById("experts-list");
  if (!expertsList) return; // Ensure the element exists

  // Fetch expert profiles from the JSON file
  fetch("data/experts.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(experts => {
      // Clear the container before populating
      expertsList.innerHTML = "";

      // Loop through each expert and create a card element
      experts.forEach(expert => {
        const card = document.createElement("div");
        card.classList.add("expert-card");

        // Expert Name
        const nameEl = document.createElement("h3");
        nameEl.classList.add("expert-name");
        nameEl.textContent = expert.name;
        card.appendChild(nameEl);

        // Optional: Profile Image
        if (expert.profileImage) {
          const img = document.createElement("img");
          img.src = expert.profileImage;
          img.alt = expert.name;
          img.style.width = "100%";
          card.appendChild(img);
        }

        // Expert Profession
        const professionEl = document.createElement("p");
        professionEl.classList.add("expert-profession");
        professionEl.textContent = expert.profession;
        card.appendChild(professionEl);

        // Expert Location
        const locationEl = document.createElement("p");
        locationEl.classList.add("expert-location");
        locationEl.textContent = expert.location;
        card.appendChild(locationEl);

        // Optional: Expert Description
        if (expert.description) {
          const descEl = document.createElement("p");
          descEl.textContent = expert.description;
          card.appendChild(descEl);
        }

        // Append the expert card to the experts list container
        expertsList.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error fetching experts data:", error);
      expertsList.innerHTML = "<p>Sorry, we couldn't load the expert profiles at this time.</p>";
    });
});