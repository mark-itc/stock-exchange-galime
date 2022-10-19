const urlParams = new URLSearchParams(location.search);
const symbol = urlParams.get("symbol");
const companyIndustry = document.getElementById("companyIndustry");
const companyFullName = document.getElementById("companyName");
const stockPrice = document.getElementById("stockPrice");
const stockPriceChange = document.getElementById("stockPriceChange");
const companyDescription = document.getElementById("companyDescription");
const companyLogo = document.getElementById("companyLogo");
const spinner = document.getElementById("loading");
const title = document.getElementById("title");
const companyDataURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
const stockDataURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`

addEventListener("load", addCompanyData());

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

async function addCompanyData(){
    const responseJson = await fetchData (companyDataURL);

    const changeInStock = Number(responseJson.profile.changesPercentage).toFixed(2)
    if (changeInStock < 0) stockPriceChange.style.color    = "red"

    companyFullName.innerHTML = responseJson.profile.companyName;
    title.innerHTML = responseJson.profile.companyName + " Information";
    companyIndustry.innerHTML =responseJson.profile.industry;
    stockPrice.innerHTML = "$" + responseJson.profile.price + "&nbsp";
    stockPriceChange.innerHTML = "(" + changeInStock + "%)";
    companyDescription.innerHTML = responseJson.profile.description;
    companyLogo.setAttribute("src", responseJson.profile.image);
    addStockChart()
}

async function addStockChart(){
    const responseJson = await fetchData (stockDataURL);

    const labelsArr = [];
    const labelsPriceArr = [responseJson.historical[0].close];

    for (let i = 0; i < responseJson.historical.length; i++) {
        labelsArr.push(responseJson.historical[i].date);
    }
    for (let i = 1; i < responseJson.historical.length; i++) {
        labelsPriceArr.push(responseJson.historical[i].close);
    }

    const data = {
        labels: labelsArr,
        datasets: [{
        label: "Stock closing price",
        backgroundColor: "#30AA47",
        borderColor: "#30AA47",
        data: labelsPriceArr,
        },],};
        
    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    type: 'timeseries',
                    time: {
                        unit: 'month'
                    },  
                },
            }
        }
    };
        
    const myChart = new Chart(document.getElementById("myChart"), config);
}

function startLoader() {
  spinner.classList.remove("d-none");
}

function stopLoader() {
  spinner.classList.add("d-none");
}