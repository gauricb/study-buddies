const login_button = document.getElementById("login-button");

login_button.addEventListener("click", async function () {
  console.log("clicked");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`/user/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
    });
    //fetch login redirects to user _id specific url
    if (res.ok && res.redirected) {
      window.location.replace(res.url);
    } else {
      alert("Cannot log in, check your username and password");
    }
  } catch (error) {
    console.log(error);
  }
});
