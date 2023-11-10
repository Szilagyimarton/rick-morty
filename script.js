const rootElement = document.querySelector("#root");

const fetchUrl = (url) => fetch(url).then((res) => res.json());

const skeletonComponent =() => `
<h1>Rick & Morty App</h1>
<p id="selected-card"></p>
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
const selectedCharacterComponent = (chardata) =>{
let episodeHtml =[]
chardata.episode.forEach(episode => {
  episodeHtml.push(episode.substring(40)) 

})
return  `
  <h2>${chardata.name}</h2>
  <h3>${chardata.status}</h3>
  <h4>${chardata.gender}</h4>
  <h5>${chardata.species}</h5>
  <h6>${episodeHtml.join(", ")}</h6>
  `
}
const buttonEventComponent = (id,url) => {
  const buttonElement = document.querySelector(`#${id}`)
  buttonElement.addEventListener("click", () => {
    fetchUrl(url).then(data => {
      makeDomFromData(data,rootElement)
     cardEventComponent(data)})
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

const cardEventComponent = (data) => {
  const charElements = document.querySelectorAll(".char")
  const selectedCardElement = document.querySelector("#selected-card")
  charElements.forEach(element => element.addEventListener("click",()=>{
    const selectedName = element.querySelector("h2").innerText
    const selectedChar = data.results.find(char => char.name === selectedName)
    selectedCardElement.innerHTML= selectedCharacterComponent(selectedChar)
  }))
}
const init = () => {
  fetchUrl("https://rickandmortyapi.com/api/character").then((data) => {
   makeDomFromData(data,rootElement);
   cardEventComponent(data)
  });
};
init();
