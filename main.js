const inputValue = document.getElementById("username");
const btn = document.getElementById("Search");


btn.addEventListener("click", (e)=>{
   e.preventDefault()
   let value = inputValue.value;
   fetch(`https://api.github.com/users/${value}/repos`)
   .then((data)=>{
      if(data.status != 200){
        throw Error()
      }
      else{
        return data.json()
      }
   })
   .then((data)=>{
     window.localStorage.setItem("token" , value)
     window.localStorage.setItem("len" , data.length)
     window.location.href = `user.html`
   })
   .catch((err)=>{
      alert("User Not Found");
   })
})

