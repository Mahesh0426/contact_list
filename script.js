let userList = [];
const API_URL = "https://randomuser.me/api/?results=6";

const userListElement = document.getElementById("userListElement");

const fetchUsers = async (url) => {
  //   const user = fetch(API_URL);
  //   console.log(user);

  //promise method
  //   fetch(url)
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data.results);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //async/await

  try {
    const response = await fetch(url);
    const data = await response.json();
    userList = data.results;

    dispaly(userList);
  } catch (error) {
    console.log(error);
  }
};

// first load
fetchUsers(API_URL);

const dispaly = (userList) => {
  let userCardElement = "";

  userList.forEach((user) => {
    userCardElement += `
    <div class="col-md-sm-2 col-lg-6 d-flex">
      <div class="card flex-fill">
        <div class="card-body d-flex align-items-center gap-2">
          <img src="${user.picture.large}" alt="Profile Picture" class="rounded-circle me-3">
          <div>
            <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
            <p class="card-text"><i class="fas fa-phone-alt"></i> ${user.cell}</p>
            <p class="card-text"><i class="fas fa-envelope"></i> ${user.email}</p>
            <p class="card-text"><i class="fas fa-map-marker-alt"></i> 
            ${user.location.street.number}
            ${user.location.street.name}
            ${user.location.city}
            ${user.location.country}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  });
  userListElement.innerHTML = userCardElement;
  document.getElementById("userCount").innerText = userList.length;
};

const handleOnGenderSelect = (event) => {
  const gender = event.value;
  const gender_API_URL = API_URL + "&gender=" + gender;
  fetchUsers(gender_API_URL);
};

document.getElementById("search").addEventListener("keyup", (e) => {
  const searchedname = e.target.value.toLowerCase();

  const filteredUser = userList.filter((user) => {
    const fullName = (user.name.first + " " + user.name.last).toLowerCase();
    return fullName.includes(searchedname);
  });

  dispaly(filteredUser);
});
