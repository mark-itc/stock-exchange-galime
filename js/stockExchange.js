const datalist = document.getElementById("results");
const spinner = document.getElementById("loading");
addEventListener("load", marquee());
document.getElementById("companySearch").addEventListener('input', getLestTenReasults);
console.log('1');

async function getLestTenReasults() {
  startLoader();
  console.log('2');
  
  const response = await fetch(
    `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${companySearch.value}&limit=10&exchange=NASDAQ`);
    
  stopLoader();
  getResponse(response)  
}

async function getResponse(response){
  console.log('3');
  
  if (response.ok) {   
    const responseJson = await response.json();
    appendResults(responseJson);
  
  } else {
      const errorMessage = await response.text();
      console.log(errorMessage);
  }
}

async function appendResults(responseJson){
  console.log('4');
  let response2Json = 0;
  for (let i = 0; i < 10; i++) {
    let symbol = responseJson[i].symbol;
    const response = await fetch(
      `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
      console.log(response);
      
      if (response.ok) {   
        response2Json = await response.json();
        
      } else {
          const errorMessage = await response.text();
          console.log(errorMessage);
      }
    const companyLogo = document.createElement("img");
    companyLogo.className = "small_img";
    console.log(response2Json.profile.image);
    
    companyLogo.setAttribute("src", response2Json.profile.image);
    const listItem = document.createElement("li");
    const Item = document.createTextNode(responseJson[i].name + " (" + responseJson[i].symbol + ") ("+ Number(response2Json.profile.changesPercentage).toFixed(2)+")");
    const listUrl = document.createElement("a");
    
    listUrl.setAttribute('target', '_blank');
    listUrl.href = `/company.html?symbol=${responseJson[i].symbol}`;
    listUrl.appendChild(Item);
    listItem.appendChild(companyLogo);
    listItem.appendChild(listUrl);
    datalist.appendChild(listItem);}
    }

    async function marquee(){
    const response = await fetch('https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/profile/aapl');
    console.log("try1:", response);
    if (response.ok) {   
      const responseJson = await response.text();
      console.log("try2:", responseJson);

    } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
    }
  }
    
function startLoader() {
  spinner.classList.remove("d-none");
}

function stopLoader() {
  spinner.classList.add("d-none");
}
