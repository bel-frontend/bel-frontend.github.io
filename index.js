document.addEventListener("DOMContentLoaded", async () => {
  const avatar = document.querySelector(".user_avatar");
  const userName = document.querySelector(".user_name");
  const email = document.querySelector(".email");

  const getDataFromServer = async () => {
    const data = await fetch("https://randomuser.me/api/", {
      method: "GET",
    });
    const userData = await data.json();
    const user = userData.results[0];
    avatar.setAttribute("src", user.picture.large);
    email.textContent = user.email;
    userName.textContent = `${user.name.title} ${user.name.first} ${user.name.last}`;
    return user;
  };

  const user = await getDataFromServer();
});
