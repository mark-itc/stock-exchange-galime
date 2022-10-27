export async function fetchData (url) {
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


function startLoader() {
  document.getElementById("loading").classList.remove("d-none");
}

function stopLoader() {
  document.getElementById("loading").classList.add("d-none");
}