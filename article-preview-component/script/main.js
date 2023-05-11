const share = document.querySelector(".share");
const cardProfileContainer = document.querySelector(".card-profile-container");
const socials = document.querySelector(".socials");
const cardProfile = document.querySelector(".card-profile");
const miniSocials = document.querySelector(".mini-socials");

//show social links
share.addEventListener("click", () => {
    if(window.screen.width >= 768) {
        miniSocials.classList.toggle("hide");
        socials.classList.add("hide");
        cardProfile.classList.remove("hide");
        cardProfileContainer.style.backgroundColor = "#fff";
    } else {
        miniSocials.classList.add("hide");
        // Toggle visibility of element with "card-profile-container" class 
        if(cardProfile.classList.toggle("hide")) {
            cardProfileContainer.style.backgroundColor = "#48556a";
        }else{
            cardProfileContainer.style.backgroundColor = "#fff";
        }
        
        // Toggle visibility of element with "social" class
        socials.classList.toggle("hide");
    }
});