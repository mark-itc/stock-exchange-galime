import {fetchData} from "./utils.js"


const companySearch = document.getElementById("companySearch");
const datalist = document.getElementById("results");
const resultlist = document.getElementById("show_result");
const marqueeDiv = document.getElementById("marquee");


addEventListener("load", getMarqueeData());
companySearch.addEventListener('input', getLestTenReasults);

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
 
    

