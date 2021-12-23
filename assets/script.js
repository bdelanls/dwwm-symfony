/* Script JS du projet DWWM - Bertrand Delanlssays 2021  - */ 

const btMenu = document.querySelectorAll('.bt-menu');
const btClose = document.querySelector('.bt-close');
const menu = document.getElementById("menu");

btMenu.forEach(elem => {

    elem.addEventListener('click', e => {
        if (menu.className === "") {
            menu.classList.add("active");
            btClose.classList.add("active");
        } else {
            menu.classList.remove("active");
            btClose.classList.remove("active");
        }
    })
    
});

// close window when width than 800px

window.onresize = () =>{
    if(window.innerWidth >= 800 && menu.className !== ""){
            menu.classList.remove("active");
            btClose.classList.remove("active");
    }else if (window.innerWidth < 800){
    }

};






  