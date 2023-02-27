$.getJSON("http://localhost:3000/api/type", (data) => {
  const select = document.getElementById("type");
  for (const type of data) {
    let res = `<option>${type.replaceAll("_", " ").toUpperCase()}</option>`;
    select.innerHTML += res;
  }
});
const button_form = document.getElementById("search_type");
button_form.addEventListener("click", (e) => {
  const select = document.getElementById("type");
  let selected_type = select.options[select.selectedIndex].text
    .replaceAll(" ", "_")
    .toLowerCase();
  location.href = "./etablissements.html?type=" + selected_type;
});
