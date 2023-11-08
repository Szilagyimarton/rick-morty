const fetchUrl = (url) => fetch(url).then((res) => res.json());

const characterComponent = (characterData) => `
<div class="char">
<img src=${characterData.image}>
<h2>${characterData.name}</h2>
<h3>appers in: ${characterData.episode.length} episode</h3>
</div>`;

const init = () => {
  fetchUrl("https://rickandmortyapi.com/api/character").then((data) => {
    const rootElement = document.querySelector("#root");
    console.log(data);
    const info = data.info;
    const characters = data.results;
    characters.forEach((character) => rootElement.insertAdjacentHTML("beforeend",characterComponent(character))
    );
  });
};
init();
