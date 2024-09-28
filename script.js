document.getElementById("clear-btn").addEventListener("click", () => {
  document.getElementById("search").value = "";
});

document.getElementById("search-btn").addEventListener("click", () => {
  const query = document.getElementById("search").value;
  if (query) {
    alert(`You searched for: ${query}`);
  } else {
    alert("Please enter a valid search query.");
  }
});
