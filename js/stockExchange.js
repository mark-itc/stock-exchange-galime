const companySearch = document.getElementById("companySearch");
const datalist = document.getElementById("results");
const spinner = document.getElementById("loading");
const resultlist = document.getElementById("show_result");
const marquee = document.getElementById("marquee");
const marqueeURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${100}`
const URLForNameAndSymbol = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=`
const QuaryURLForNameAndSymbol = `&limit=10&exchange=NASDAQ`;
const URLForLogoAnsStockPrice = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/`

addEventListener("load", getMarqueeData());
companySearch.addEventListener('input', getLestTenReasults);

async function fetchData (url) {
  startLoader()
  const response = await fetch(url);
  stopLoader()
  
  if (response.ok) {
    const responseJson = await response.json();      
    return(responseJson);
      }
  else {
    const errorMessage = await response.text();
    alert(errorMessage);
  }
}

async function getMarqueeData(){
  const stockPriceResponse =await fetchData(marqueeURL);
  
  let listOfCompanyAndPrices = [];
  
  for (let i = 0; i < 100; i++){
    listOfCompanyAndPrices.push(stockPriceResponse[i].companyName);
    listOfCompanyAndPrices.push(": $");  
    listOfCompanyAndPrices.push(Number(stockPriceResponse[i].price).toFixed(2));  
    listOfCompanyAndPrices.push(";   ");  
  }
  marquee.innerHTML = listOfCompanyAndPrices.join(" ");
}


async function getLestTenReasults() {
  const companyResultResponse = await fetchData(URLForNameAndSymbol + companySearch.value + QuaryURLForNameAndSymbol);

  for (let i = 0; i < 10; i++) {
    let symbol = companyResultResponse[i].symbol;
    const responseJsonFromCompanyData = await fetchData(URLForLogoAnsStockPrice + symbol);
    
    const companyLogo = document.createElement("img");
    companyLogo.className = "small_img";
    companyLogo.setAttribute("src", responseJsonFromCompanyData.profile.image);
    
    const listItem = document.createElement("li");
    const Item = document.createTextNode(companyResultResponse[i].name + " (" + companyResultResponse[i].symbol + ") ("+ Number(responseJsonFromCompanyData.profile.changesPercentage).toFixed(2)+")");
    
    const listUrl = document.createElement("a");
    listUrl.setAttribute('target', '_blank');
    listUrl.href = `/company.html?symbol=${companyResultResponse[i].symbol}`;
    
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
