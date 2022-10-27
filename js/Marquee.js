import {fetchData} from "./utils.js"

export class Marquee {
    constructor (element){
       this.element = element;
    }
    
    async load(){
      console.log("shalom!");
      const spinner = document.createElement("div");
      spinner.id = "loading";
      spinner.className = "spinner-border d-none";
      spinner.role = "status";
      this.element.appendChild(spinner);

      const stockPriceResponse = await fetchData(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock-screener?exchange=NASDAQ&limit=${100}`);
        
        let listOfCompanyAndPrices = [];
        
        for (let i = 0; i < 100; i++){
          listOfCompanyAndPrices.push(stockPriceResponse[i].companyName);
          listOfCompanyAndPrices.push(": $");  
          listOfCompanyAndPrices.push(Number(stockPriceResponse[i].price).toFixed(2));  
          listOfCompanyAndPrices.push(";   ");  
        }
        this.element.innerHTML = listOfCompanyAndPrices.join(" ");
      }
}

