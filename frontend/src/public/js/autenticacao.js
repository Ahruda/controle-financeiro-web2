const token = localStorage.getItem("token");

let requestAuth = new XMLHttpRequest()
requestAuth.open("POST",`http://localhost:3000/token`)
requestAuth.setRequestHeader('x-access-token', token)
requestAuth.send() 
requestAuth.onload = () => {
   
    if(requestAuth.status !== 200) {
        window.location.replace("http://localhost:3001/login");
    }
    
}