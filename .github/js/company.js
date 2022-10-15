const urlParams = new URLSearchParams(location.search);
const symbol = urlParams.get("symbol");
const companyIndustry = document.getElementById("companyIndustry");
const companyFullName = document.getElementById("companyName");
const stockPrice = document.getElementById("stockPrice");
const stockPriceChange = document.getElementById("stockPriceChange");
const companyDescription = document.getElementById("companyDescription");
const companyLogo = document.getElementById("companyLogo");
const spinner = document.getElementById("loading");
const companyDataURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`
const stockDataURL = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`
let numberOfCalls = 0;

addEventListener("load", controller());

function controller() {
    numberOfCalls = 0;
    fetchData(companyDataURL)
}

async function fetchData(url) {
    startLoader()
    const response = await fetch(url);
    stopLoader()
    if (response.ok) {
        const responseJson = await response.json();
        if (numberOfCalls == 0)addCompanyData(responseJson);
        else {
            addStockChart(responseJson);
        }
    } else {
        const errorMessage = await response.text();
        console.log(errorMessage);
    }
}

function addCompanyData(responseJson){
    const changeInStock = Number(responseJson.profile.changesPercentage).toFixed(2)
    if (changeInStock < 0) stockPriceChange.style.color    = "red"

    companyFullName.innerHTML = responseJson.profile.companyName;
    companyIndustry.innerHTML =responseJson.profile.industry;
    stockPrice.innerHTML = "$" + responseJson.profile.price + "&nbsp";
    stockPriceChange.innerHTML = "(" + changeInStock + "%)";
    companyDescription.innerHTML = responseJson.profile.description;
    companyLogo.setAttribute("src", responseJson.profile.image);
    numberOfCalls++;
    fetchData(stockDataURL)
}

function addStockChart(responseJson){
    const labelsArr = [];
    const labelsPriceArr = [responseJson.historical[0].close];
    console.log(responseJson.historical);

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