const avtar = document.getElementById("UserAvtar");
const exitBtn = document.querySelector(".exit")

const ownerName = document.querySelector(".ownerName");
const bio = document.querySelector(".bio");
const urls = document.querySelector(".url");
const boxContainer = document.getElementById("box-container");
const Userlocation = document.querySelector(".location");
const twitter = document.querySelector(".Twitter");
const searchBtn = document.getElementById("searchBtn");
const Loader = document.getElementById("loader")
const preLoader = document.getElementById("preLoader")
async function showUserDetails(username) {
  let res = await fetch(`https://api.github.com/users/${username}`);
  res = await res.json();
  avtar.src = res.avatar_url;
  document.title = res.name
  ownerName.innerHTML = res.name;
  bio.innerHTML = res.bio;
  Userlocation.innerHTML = `<i class="uil uil-location-point"></i>${res.location}`;
  twitter.innerHTML = `Twitter : ${res.twitter_username}`;
  urls.innerHTML = ` <i class="uil uil-link-alt"></i> ${res.url}`;
  urls.href = res.url;
}


function ShowingRepo(data) {
  boxContainer.innerHTML = ""
  data.forEach((element) => {
    let boxes = document.createElement("div");
    let boxContent = document.createElement("div");
    let H2 = document.createElement("h2");
    let P = document.createElement("p");
    const topics = document.createElement("div");
    boxes.classList.add("boxes");
    boxContent.classList.add("boxes-content");
    topics.classList.add("topics");
    element.topics.forEach((el)=>{
      let top1 = document.createElement("div");
      top1.classList.add("top1");
      top1.innerHTML = el
      topics.append(top1);
    })
    boxContent.append(H2)
    boxContent.append(P)

    H2.innerText = element.name
    P.innerText = element.description
    boxes.append(boxContent)
    boxes.append(topics)
    boxContainer.append(boxes);
    

  });
}

 async function show(){
  let res = await fetch(`https://api.github.com/users/${window.localStorage.getItem("token")}/repos?per_page=10`);
  res = await res.json();
  ShowingRepo(res)
}
  searchBtn.addEventListener("click" , async (e)=>{
    e.preventDefault()
    boxContainer.innerHTML = ""
    Loader.classList.add("hidden")
     query = document.getElementById("search").value
    
    let res = await fetch(`https://api.github.com/search/repositories?q=${query}+user:${window.localStorage.getItem("token")}&per_page=10`);
    res = await res.json();
    Loader.classList.remove("hidden")
    ShowingRepo(res.items)
  })
function showingData() {
  const username = window.localStorage.getItem("token");
  if (username) {
    showUserDetails(username);
    show();
  } else {
    window.localStorage.clear();
    window.location.href = `index.html`;
  }
}
let currentPage = 1;
// pagination function
 async function perPageData(page){
  boxContainer.innerHTML = ""
  Loader.classList.add("hidden")
  let res = await fetch(`https://api.github.com/users/${window.localStorage.getItem("token")}/repos?page=${page}&per_page=10`)
  res = await res.json();
  document.querySelector(".pageNumber").innerHTML = currentPage;
  Loader.classList.remove("hidden")
  ShowingRepo(res);
}
function pre(){
  if(currentPage == 1){
        document.querySelector(".pageNumber").innerHTML = currentPage;
  }else{
    currentPage = currentPage -1 
  
    perPageData(currentPage)
  }

}
function next(){
  if(currentPage == Math.round( window.localStorage.getItem("len")/10) ){
    document.querySelector(".pageNumber").innerHTML = currentPage;
}else{
  currentPage = currentPage +1
perPageData(currentPage)
}

}


exitBtn.addEventListener("click" , ()=>{
  window.localStorage.clear()
  window.location.href = "/"
})
perPageData(currentPage)
showingData()

