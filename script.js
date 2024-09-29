const images = {
  sydney:
    "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3lkbmV5fGVufDB8fDB8fHww",
  melbourne:
    "https://images.unsplash.com/photo-1545044846-351ba102b6d5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVsYm91cm5lfGVufDB8fDB8fHww",
  tokyo:
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG9reW98ZW58MHx8MHx8fDA%3D",
  kyoto:
    "https://images.unsplash.com/photo-1512692723619-8b3e68365c9c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lvdG98ZW58MHx8MHx8fDA%3D",
  rio: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmlvfGVufDB8fDB8fHww",
  ["angkor-wak"]:
    "https://plus.unsplash.com/premium_photo-1661963188432-5de8a11f21a7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5na29yJTIwd2F0fGVufDB8fDB8fHww",
  taj_mahal:
    "https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFqX21haGFsfGVufDB8fDB8fHww",
  ["bora-bora"]:
    "https://images.unsplash.com/photo-1532408840957-031d8034aeef?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9yYV9ib3JhfGVufDB8fDB8fHww",
  copacabana:
    "https://images.unsplash.com/photo-1643400813604-b3877e0c4db9?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvcGFjYWJhbmF8ZW58MHx8MHx8fDA%3D",
  "angkor-wat":
    "https://plus.unsplash.com/premium_photo-1661963188432-5de8a11f21a7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5na29yJTIwd2F0fGVufDB8fDB8fHww",
  "taj-mahal":
    "https://plus.unsplash.com/premium_photo-1661885523029-fc960a2bb4f3?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGFqJTIwbWFoYWx8ZW58MHx8MHx8fDA%3D",
  "sao-paulo":
    "https://plus.unsplash.com/premium_photo-1683888229109-17cb0975af20?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FvJTIwcGF1bG98ZW58MHx8MHx8fDA%3D",
};

const destinationList = document.getElementById("destination-list");
const submitForm = document.querySelector(".search-bar");
const clearBtn = document.getElementById("clear-btn");

const getTravelRecommend = async () => {
  const response = await fetch(
    "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json",
  );
  const data = await response.json();
  return data;
};

const destination_card = (
  info = { id: "", description: "", imageUrl: "", name: "" },
) => `
    <img src=${
      images[
        Object.keys(images).find((key) => info.imageUrl?.includes?.(key))
      ] ?? ""
    } alt="Sydney, Australia" class="destination-image">
    <div class="destination-content">
        <h3>${info.name}</h3>
        <p>${info.description}</p>
        <button class="visit-btn">Visit</button>
    </div>
`;

const drawTravelRecommendations = (recommendations = []) => {
  if (recommendations.length === 0) {
    destinationList.innerHTML = `
    <h2>No recommendations found</h2>
    <h3>Please enter one of <code> beaches<code>, <code>temples</code>, <code>countries</code></h3> `;
    return;
  }

  recommendations.forEach((recommendation) => {
    const card = document.createElement("div");
    card.classList.add("destination-card");
    card.innerHTML = destination_card(recommendation);
    destinationList.appendChild(card);
  });
};

const searchHandler = async (e) => {
  e.preventDefault();
  destinationList.innerHTML = "";
  const keyword = document.getElementById("search").value;

  function flattenData(data) {
    let flattenedArray = [];

    if (data.countries) {
      flattenedArray = data.countries.reduce((acc, country) => {
        const cities = country.cities.map((city) => ({
          name: city.name,
          imageUrl: city.imageUrl,
          description: city.description,
          category: "countries",
        }));
        return acc.concat(cities);
      }, []);
    }

    Object.keys(data).forEach((category) => {
      if (category !== "countries") {
        const items = data[category].map((item) => ({
          name: item.name,
          imageUrl: item.imageUrl,
          description: item.description,
          category: category,
        }));
        flattenedArray = flattenedArray.concat(items);
      }
    });
    console.log(flattenedArray);

    return flattenedArray;
  }

  const results = await getTravelRecommend().then((data) => {
    return flattenData(data).filter(
      (item) => item.category === keyword.toLowerCase(),
    );
  });
  console.log(results, results.length);

  drawTravelRecommendations(results);
};

const clearHandler = () => {
  destinationList.innerHTML = "";
  document.getElementById("search").value = "";
};

window.addEventListener("DOMContentLoaded", () => {
  submitForm.addEventListener("submit", searchHandler);
  clearBtn.addEventListener("click", clearHandler);
});
