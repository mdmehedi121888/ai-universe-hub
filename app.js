
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
    // console.log(data.id);
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
                         <li>${data.features[2]}</li>
                         </ol>
                        <hr class="my-3">
                        <h5 class="card-title mb-3">${data.name}</h5>
                        <img src="images/calendar.png" style="height:12px; width:15px">
                        <span>${data.published_in}</span>
                       
                        <!-- Button trigger modal -->
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style ="float:right" onclick="modal(${data.id})">
                        <a><img src="images/right-arrow.png" style="height:20px; width:25px; float:right;
                        "> </a>

                        </button>
                        
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

const modal = (value) => {
  // let b = '0';
  // b+=value;
  const url = `https://openapi.programming-hero.com/api/ai/tool/0${value}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayModal(data));
//  console.log(b); 
}
const displayModal = (data) => {
  console.log(data.data.accuracy.score);
const rightId = document.getElementById('modal-right');
const leftId = document.getElementById('modal-left');
rightId.innerText = '';
const div = document.createElement('div');
let score = data.data.accuracy.score * 100;
console.log(score);
div.innerHTML = `

<div class="position-relative">
<img src="${data.data.image_link[0]}" alt="" style="height:300px; width:100%" >
<div class="position-absolute"><button class="btn btn-danger rounded" style="margin-top:-560px;margin-left:360px">${score}% accuracy</button></div>
</div>


<h4 class="text-center">${data.data?.input_output_examples[0]?.input}</h4>
<p class="text-center">${data.data?.input_output_examples[0]?.output}</p>
`
rightId.appendChild(div);
}
