const axios = require("axios");

async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];

  if (!file) {
    alert("Select file first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  await axios.post("http://localhost:5000/upload", formData);
  alert("Uploaded Successfully");
  loadMedia();
}

async function loadMedia() {
  const res = await axios.get("http://localhost:5000/media");
  const mediaList = document.getElementById("mediaList");
  mediaList.innerHTML = "";

  res.data.forEach(item => {
    if (item.type.startsWith("image")) {
      mediaList.innerHTML += `
        <img src="http://localhost:5000/uploads/${item.filepath}" width="150">
      `;
    } else {
      mediaList.innerHTML += `
        <video width="200" controls>
          <source src="http://localhost:5000/uploads/${item.filepath}">
        </video>
      `;
    }
  });
}

loadMedia();