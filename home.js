let search_div = document.getElementById("search_results");
var timerId;
async function searchMovies() {
  let result = document.getElementById("bar").value;
  if (result.length <= 0) {
    return false;
  } else {
    let res = await fetch(
      `http://api.serpstack.com/search?query=${result}&access_key=132a3b615aef985adaa87f25ea2edf96`
    );
    let data = await res.json();
    console.log(data);
    return data.organic_results;
  }
}
function throttleFunction() {
  if (timerId) {
    return false;
  }

  timerId = setTimeout(() => {
    main();
    timerId = undefined;
  }, 1000);
  //   searchMovies();
}

function appendM(d) {
  search_div.innerHTML = null;
  let print_div = document.createElement("div");

  d.forEach(({ title }) => {
    let searchDiv = document.createElement("div");
    let p = document.createElement("span");

    p.innerText = title;
    p.style.margin = "10px";
    p.style.marginTop = "30px";
    searchDiv.addEventListener("mouseover", function () {
      searchDiv.style.backgroundColor = "gray";
    });
    searchDiv.addEventListener("mouseout", function () {
      searchDiv.style.backgroundColor = "white";
    });
    searchDiv.append(p);
    print_div.append(searchDiv);
    search_div.append(print_div);
  });
}

async function main() {
  let resultss = await searchMovies();
  appendM(resultss);
}
