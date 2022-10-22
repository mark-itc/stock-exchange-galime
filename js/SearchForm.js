
export class SearchForm {
    constructor (companies){
        this.companies = companies;
    }
    
    addFormToPage (){
        console.log('1');     
        
        let pageContainer = "<div class='page_container'>"; 
        let endPageContainer = "</div>"; 
        document.body.prepend(pageContainer)
        document.body.append(endPageContainer) 

        const searchContainer = document.createElement("div");
        searchContainer.className = "search_container";

        const userInput = document.createElement("input");
        userInput.id = "companySearch";
        userInput.type = "search";
        userInput.placeholder = "Company name";

        const button = document.createElement("button");
        button.type = "button";
        const buttonText = document.createTextNode("Search");
        button.appendChild(buttonText);

        const spinner = document.createElement("div");
        spinner.id = "loading";
        spinner.className = "spinner-border d-none";
        spinner.role = "status";
        this.companies.appendChild(searchContainer);
        this.companies.appendChild(userInput);
        this.companies.appendChild(button);
        this.companies.appendChild(spinner);
    }
    
}