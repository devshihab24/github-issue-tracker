document.getElementById("login-btn").addEventListener("click", (e) => {
  e.preventDefault();
  let userName = document.getElementById("login-username");
  let password = document.getElementById("login-password");
//   console.log(userName, password);
  if (
    userName.value.toLowerCase() == "admin" &&
    password.value.toLowerCase() == "admin123"
  ) {
    window.location.assign("home/home.html")
    userName.value = "";
    password.value = "";
  } else {
    alert("Invalid Inputs");
    userName.value = "";
    password.value = "";
  }
});
