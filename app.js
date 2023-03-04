// toggleSpinner function

const toggleSpinner = (isLoading) => {
  const loadSpinner = document.getElementById("loader");
  if (isLoading) loadSpinner.classList.remove("d-none");
  else loadSpinner.classList.add("d-none");
};

// loadData function

const loadData = (dataLimit) => {
  // console.log(dataLimit);
  const seeMoreBtn = document.getElementById('see-more-btn');
  if(dataLimit==6)
   seeMoreBtn.classList.remove("d-none");
   else
   seeMoreBtn.classList.add("d-none");
  toggleSpinner(true);
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => displayData(data.data.tools, dataLimit));
};

// displayData function

const displayData = (datas, dataLimit) => {
  const cardContainer = document.getElementById("card-container");
  for (const data of datas.slice(0, dataLimit)) {
    // console.log(data.id);
    const featuresLength = data.features;
    // console.log(featuresLength);

    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
        <div class="card">
                        <img src="${
                          data.image
                        }" class="card-img-top" style="width:460px; height:260px">
                        <div class="card-body" id="card-body">
                          <h4 class="card-title fw-semibold">Features</h4>
                         <ol>
                         <li>${data.features[0]}</li>
                         <li>${data.features[1]}</li>
                         ${
                           data.features.length > 2
                             ? `<li>${data.features[2]}</li>`
                             : ""
                         }
                         ${
                           data.features.length > 3
                             ? `<li>${data.features[3]}</li>`
                             : ""
                         }
                         </ol>
                        <hr class="my-3">
                        <h4 class="card-title mb-3 fw-semibold">${data.name}</h4>
                        <img src="images/calendar.png" style="height:12px; width:15px">
                        <span>${data.published_in}</span>
                       
                        <!-- Button trigger modal -->
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" style ="float:right" onclick="modal(${
                          data.id
                        })">
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

//seeMore function


const seeMore = () => {
  toggleSpinner(true);
  
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";
  loadData();
  toggleSpinner(false);
  
};

const modal = (value) => {
  let value1 = "";
  if (value < 10) {
    value1 += "0";
  }
  value1 += value;
  let url = `https://openapi.programming-hero.com/api/ai/tool/${value1}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModal(data));
  //  console.log(b);
};

//display modal 

const displayModal = (data) => {
  const rightId = document.getElementById("modal-right");
  const leftId = document.getElementById("modal-left");

  // right section

  rightId.innerText = "";
  const div = document.createElement("div");
  let score = data.data.accuracy.score * 100;
  console.log(data.data.accuracy.score);

  // modal pic and input output text 

  div.innerHTML = `
<div class="position-relative">
<img src="${
    data.data.image_link[0]
  }" alt="" style="height:300px;" class="img-fluid">

  ${data.data.accuracy.score? `<div class="position-absolute"><button class="btn btn-danger rounded" style="margin-top:-560px;margin-left:360px">${score}% accuracy</button></div>` : ''}

</div>
<div class="text-center">
${
  data.data?.input_output_examples
    ? `<h4>${data.data?.input_output_examples[0]?.input}</h4>`
    : "Can you give any example?"
}
<br>
${
  data.data?.input_output_examples
    ? `${data.data?.input_output_examples[0]?.output}`
    : "No! Not Yet! Take a break!!!"
}
</div>


`;
  rightId.appendChild(div);

  // left section

  leftId.innerText = "";
  const div1 = document.createElement("div");
  // console.log(data.data.integrations[0])

  div1.innerHTML = `
<h4 class="text-center">${data.data.description}</h4>
<div class="d-flex text-center justify-content-evenly my-5">

<div class="text-primary">${
    data.data?.pricing ? `${data.data.pricing[0].price}` : ""
  } <br> ${data.data?.pricing ? `${data.data.pricing[0].plan}` : ""}</div>
<div class="text-success">${
    data.data?.pricing ? `${data.data.pricing[1].price}` : ""
  } <br> ${data.data?.pricing ? `${data.data.pricing[1].plan}` : ""}</div>
<div class="text-info">${
    data.data?.pricing ? `${data.data.pricing[2].price}` : ""
  } <br> ${data.data?.pricing ? `${data.data.pricing[2].plan}` : ""}</div>

</div>

<div class="d-flex text-center justify-content-evenly">
<div>
<h4 >Features</h4>
                        <ul>
                         <li>${data.data.features["1"].feature_name}</li>
                         <li>${data.data.features["2"].feature_name}</li>
                         <li>${data.data.features["3"].feature_name}</li>
                         
                         </ul>
    
</div>
<div>
<h4 class="">Integrations</h4>
                        <ul>
                        
                        ${
                          data.data?.integrations?.length > 0
                            ? `<li>${data.data?.integrations[0]}</li>`
                            : "No Data Found"
                        }
                        ${
                          data.data?.integrations?.length > 1
                            ? `<li>${data.data?.integrations[1]}</li>`
                            : ""
                        }
                        ${
                          data.data?.integrations?.length > 2
                            ? `<li>${data.data?.integrations[2]}</li>`
                            : ""
                        }
                           
                         </ul>
</div>
</div>
`;
  leftId.appendChild(div1);
};


function sortBtn() {
  const seeMoreBtn = document.getElementById('see-more-btn');
    seeMoreBtn.classList.add("d-none");
    console.log(seeMoreBtn.classList);
  fetch('https://openapi.programming-hero.com/api/ai/tools')
  .then(res => res.json())
  .then(data => displayByDate(data.data.tools))
}
function displayByDate (datas){
  datas.sort((a, b) => new Date(b.published_in) - new Date(a.published_in));

 const cardContainer = document.getElementById("card-container");
 cardContainer.textContent = '';
 displayData(datas);


}