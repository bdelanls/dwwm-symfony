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

// le menu est fermé quand on agrandit la fenêtre au delà de 800px

window.onresize = () =>{
    if(window.innerWidth >= 800 && menu.className !== ""){
            menu.classList.remove("active");
            btClose.classList.remove("active");
    }else if (window.innerWidth < 800){
    }

};

// lire la suite

if (window.innerWidth < 800){
    lirePlusTxt();
}


function lirePlusTxt() {
    var numCaractere = 40;
    lirePlus = document.querySelectorAll('.readmore');

    for(let i=0; i < lirePlus.length; i++){
        
        let txt = lirePlus[i].textContent;
        
        let txtVisible = txt.substring(0, numCaractere);
        let txtCache = txt.substring(numCaractere, txt.length);

        let txtAfficher = txtVisible + '... ' + '<a class="voirPlus">Voir plus</a>';
        lirePlus[i].innerHTML = txtAfficher;

        let btVoirPlus = lirePlus[i].querySelector('.voirPlus');
        btVoirPlus.addEventListener('click', e => {
            lirePlus[i].innerHTML = txtVisible + txtCache;
        });
        
    }
}

// message alert
function closeMessage(){
    
}





  