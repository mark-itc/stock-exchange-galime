const datalist = document.getElementById("results");
const spinner = document.getElementById("loading");

document.getElementById("companySearch").addEventListener('input', getLestTenReasults);

async function getLestTenReasults() {
  startLoader();
  
  const response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ`);
    
  stopLoader();
  getResponse(response)  
}

async function getResponse(response){
  if (response.ok) {   
    const responseJson = await response.json();
    appendResults(responseJson);
  
  } else {
      const errorMessage = await response.text();
      console.log(errorMessage);
  }
}

async function appendResults(responseJson){
  for (let i = 0; i < 10; i++) {
    
    const listItem = document.createElement("li");
    const Item = document.createTextNode(responseJson[i].name + " (" + responseJson[i].symbol + ")");
    const listUrl = document.createElement("a");
    
    listUrl.setAttribute('target', '_blank');
    listUrl.href = `/company.html?symbol=${responseJson[i].symbol}`;
    listUrl.appendChild(Item);
    listItem.appendChild(listUrl);
    datalist.appendChild(listItem);}
}

function startLoader() {
  spinner.classList.remove("d-none");
}

function stopLoader() {
  spinner.classList.add("d-none");
}
