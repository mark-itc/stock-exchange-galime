import {fetchData} from "./utils.js"
const URLForNameAndSymbol = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=`
const QuaryURLForNameAndSymbol = `&limit=10&exchange=NASDAQ`;


export class SearchResults {
    constructor (companies){
        this.companies = companies;
    }

    async renderReasults() {
        const companyResultResponse = await fetchData(URLForNameAndSymbol + document.getElementById('companySearch').value + QuaryURLForNameAndSymbol);
        const unOrderedList = document.createElement("ul");

        for (let i = 0; i < 10; i++) {
          let symbol = companyResultResponse[i].symbol;
          const responseJsonFromCompanyData = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
        
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
          unOrderedList.appendChild(listItem);
          }
          this.companies.appendChild(unOrderedList);}

}