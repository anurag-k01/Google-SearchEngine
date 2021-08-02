function Register(e) {
  e.preventDefault();
  let formdata = {
    name: document.getElementById("inp1").value,
    email: document.getElementById("inp2").value,
    password: document.getElementById("inp3").value,
    username: document.getElementById("inp4").value,
    mobile: document.getElementById("inp5").value,
    description: document.getElementById("inp6").value,
  };
  // console.log("formdata:", formdata);
  formdata = JSON.stringify(formdata);
  fetch("https://masai-api-mocker.herokuapp.com/auth/register", {
    method: "POST",
    body: formdata,
    //ADDITIONAL information
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
}
function Login(e) {
  e.preventDefault();

  let formdata = {
    password: document.getElementById("inp8").value,
    username: document.getElementById("inp7").value,
  };
  let body = JSON.stringify(formdata);
  fetch("https://masai-api-mocker.herokuapp.com/auth/login", {
    method: "POST",
    body: body,
    //ADDITIONAL information
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res);
      let u = formdata.username;
      let t = res.token;
      getmyProfile(u, t);
      if (res.message === "Invalid login creadentials") {
        //if invalid it will throw error
        alert("error");
      } else {
        window.location.href = "home.html";
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
}

function getmyProfile(username, token) {
  fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {
    headers: {
      Authorization: `Bearer ${token} `,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log("res", res);
    })
    .catch((err) => {
      console.log("err", err);
    });
}
