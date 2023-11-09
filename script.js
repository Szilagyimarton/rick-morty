const rootElement = document.querySelector("#root");

const fetchUrl = (url) => fetch(url).then((res) => res.json());

const skeletonComponent =() => `
<h1>Rick & Morty App</h1>
<div class="characters"></div>
<div class="buttons"></div>`

const characterComponent = (characterData) => `
<div class="char">
<img src=${characterData.image}>
<h2>${characterData.name}</h2>
<h3>appers in: ${characterData.episode.length} episode</h3>
</div>`;
const buttonComponent = (id,text) => {
  return `<button id=${id}>${text}</button>`
}

const buttonEventComponent = (id,url) => {
  const buttonElement = document.querySelector(`#${id}`)
  buttonElement.addEventListener("click", () => {
    fetchUrl(url).then(data => makeDomFromData(data,rootElement))
  })
}
const makeDomFromData = (data,element) => {
  rootElement.innerHTML = skeletonComponent()
  const characterElement = document.querySelector(".characters")
  const buttonElement = document.querySelector(".buttons")
  const info = data.info;
  const characters = data.results;
  characters.forEach((character) => characterElement.insertAdjacentHTML("beforeend",characterComponent(character))
  );
  if(info.prev){
    buttonElement.insertAdjacentHTML("beforeend", buttonComponent("prev",`<span class="material-symbols-outlined">
    arrow_back
    </span>`))
    buttonEventComponent("prev", info.prev)
  }
  if(info.next){
    buttonElement.insertAdjacentHTML("beforeend",buttonComponent("next",`<span class="material-symbols-outlined">
    arrow_forward
    </span>`))
    buttonEventComponent("next", info.next)
    }
  
}
const init = () => {
  fetchUrl("https://rickandmortyapi.com/api/character").then((data) => {
   makeDomFromData(data,rootElement);
  });
};
init();
