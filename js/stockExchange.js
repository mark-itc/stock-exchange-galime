const datalist = document.getElementById("results");
const spinner = document.getElementById("loading");
const marquee = document.getElementById("marquee");
addEventListener("load", getMarqueeData());
document.getElementById("companySearch").addEventListener('input', getLestTenReasults);
console.log('1');

async function getMarqueeData(){
  const response = await fetch (`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${50}`);
  if (response.ok) {   
    const responseJson = await response.json();
    let listOfCompanyAndPrices = [];
    let price =[];
    for (let i = 0; i < 50; i++){
      listOfCompanyAndPrices.push(responseJson[i].companyName);
      listOfCompanyAndPrices.push(": $");  
      listOfCompanyAndPrices.push(Number(responseJson[i].price).toFixed(2));  
      listOfCompanyAndPrices.push(";   ");  
  }
  marquee.innerHTML = listOfCompanyAndPrices.join(" ");
   }else {
      const errorMessage = await response.text();
      console.log(errorMessage);
  }
}


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

    
function startLoader() {
  spinner.classList.remove("d-none");
}

function stopLoader() {
  spinner.classList.add("d-none");
}
