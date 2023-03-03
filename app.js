
const toggleSpinner = isLoading => {
  const loadSpinner = document.getElementById('loader');
  if(isLoading)
  loadSpinner.classList.remove('d-none');
  else
  loadSpinner.classList.add('d-none');
}

const loadData = (dataLimit) => {
  toggleSpinner(true);
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools,dataLimit));
};
const displayData = (datas,dataLimit) => {
  const cardContainer = document.getElementById("card-container");
  for (const data of datas.slice(0,dataLimit)) {
    console.log(data.published_in);
    const featuresLength = data.features;
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
        <div class="card">
                        <img src="${data.image}" class="card-img-top" style="width:460px; height:260px">
                        <div class="card-body">
                          <h5 class="card-title">Features</h5>
                         <ol>
                         <li>${data.features[0]}</li>
                         <li>${data.features[1]}</li>
                    
                           <li>${data.features[2] ? data.features[2] : ''}</li>
                         </ol>
                        <hr class="my-3">
                        <h5 class="card-title mb-3">${data.name}</h5>
                        <img src="images/calendar.png" style="height:12px; width:15px">
                        <span>${data.published_in}</span>
                        <a><img src="images/right-arrow.png" style="height:20px; width:25px; float:right;
                        "> </a>
                       
                        
                        </div>
                      </div>
        `;
    cardContainer.appendChild(div);
  }
};
loadData(6);
toggleSpinner(false);
const seeMore = () =>{
  // toggleSpinner(true);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = '';
  loadData();
  toggleSpinner(false);
}
