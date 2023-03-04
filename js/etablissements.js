const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const selected_type = urlParams.get("type");
const liste_etablissements = document.getElementById("liste_etablissements");
$.getJSON(`http://localhost:3000/api/type/${selected_type}`, (data) => {
  for (const establishment of data) {
    let res = "";
    if (establishment.properties.name != null) {
      res += `<div class="etablissement"> <h2>${establishment.properties.name}</h2>`;

      if (
        establishment.properties.addr_housenumber != null &&
        establishment.properties.addr_street != null
      ) {
        res += `<br> Adresse: ${establishment.properties.addr_housenumber} ${establishment.properties.addr_street}<br>`;
      }

      if (establishment.properties.tags != null) {
        let tags = establishment.properties.tags;
        tags = tags.split(",");
        for (let tag of tags) {
          let sub_tag = tag.split("=>");
          if (sub_tag.length > 1) {
            sub_tag[0] = sub_tag[0].replaceAll('"', "").replaceAll("_", " ");
            sub_tag[1] = sub_tag[1].replaceAll('"', "").replaceAll("_", " ");
            if (
              sub_tag[0] == " phone" ||
              sub_tag[0] == " outdoor seating" ||
              sub_tag[0] == " contact:facebook" ||
              sub_tag[0] == " website"
            ) {
              if (
                sub_tag[0] == " contact:facebook" ||
                sub_tag[0] == " website"
              ) {
                res += `<a href="${sub_tag[1]}">${sub_tag[0]}</a><br>`;
              } else {
                res += `${sub_tag[0]} ${sub_tag[1]}<br>`;
              }
            }
          }
        }
      }
      liste_etablissements.innerHTML += res + "</div><hr>";
    }
  }
});
