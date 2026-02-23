const axios = require("axios");
const BASE_URL = "https://mediaupload-backend.onrender.com";
async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Select file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  await axios.post(`${BASE_URL}/upload`, formData);
  alert("Uploaded Successfully");
  loadMedia();
}

async function loadMedia() {
  const res = await axios.get(`${BASE_URL}/media`);
  const mediaList = document.getElementById("mediaList");
  mediaList.innerHTML = "";

  res.data.forEach(item => {
    if (item.type.startsWith("image")) {
      mediaList.innerHTML += `
        <img src="${BASE_URL}/uploads/${item.filepath}" width="150">
      `;
    } else {
      mediaList.innerHTML += `
        <video width="200" controls>
          <source src="${BASE_URL}/uploads/${item.filepath}">
        </video>
      `;
    }
  });
}

loadMedia();