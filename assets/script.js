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

// close message
var btMsg = document.querySelector('.bt-message');

if (btMsg){
    btMsg.addEventListener('click', e => {
        btMsg.parentNode.classList.add('close')
    })
}



// articles
if (document.querySelector('section').className === 'article'){
    const btPrevious = document.querySelector('.previous a');
    const btNext = document.querySelector('.next a');

    if (btPrevious) {
        btPrevious.innerHTML = '<svg><title>Article précédent</title><use xlink:href="/img/icons.svg#angle-left"></use></svg>';
    }
    if (btNext) {
        btNext.innerHTML = '<svg><title>Article suivant</title><use xlink:href="/img/icons.svg#angle-right"></use></svg>';
    }
}


// plus d'articles
if (document.querySelector('section').className === 'liste-articles'){
    
    const btArticles = document.getElementById("load-articles");
    const list = document.getElementById("list");
    var page = 1;
    var totalArticles = list.dataset.totalArticles ;
    var limit = list.dataset.limit ;

    var nbPages = Math.ceil(totalArticles / limit) ;


    function get(url) {
        return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            req.open('GET', url);
            req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
            req.onerror = (e) => reject(Error(`Network Error: ${e}`));
            req.send();
        });
    }

    btArticles.addEventListener('click', e => {

        page++ ;
        get("/articles/ajax?page=" + page)

        .then((data) => {

            data = JSON.parse(data);

            for(i = 0; i < data.length; i++) { 
                
                let article = data[i];

                list.innerHTML += '<li class="item">'
                + '<a href="/article/' + article['slug'] + '">'
                + '<picture>'
                + '<source srcset="/img/article/thumbnail/'+ article['photoPath'] +'.webp" type="image/webp">'
                + '<source srcset="/img/article/thumbnail/'+ article['photoPath'] +'.jpg" type="image/jpeg">'
                + '<img src="/img/article/thumbnail/'+ article['photoPath'] +'.jpg" alt="'+ article['photoTitle'] +'">'
                + '</picture>'
                + '<h3>'+ article['title'] +'</h3>'
                + '</a>'
                + '<p>'+ article['body']
                + '</li>';
        }
        
        })
        .catch((err) => {
            alert('Une erreur est survenue !');
        });

        if (page === nbPages ) {
            btArticles.classList.remove("active");
        }

    });

}

// student file
if (document.querySelector('section').className == 'admin student-file'){



    const btNoteOpen = document.querySelector('.bt-note-pencil');
    const btNoteClose = document.querySelector('.bt-note-close');
    const noteTxt = document.querySelector('.note-txt');
    const noteForm = document.querySelector('.note-form');

    const btDoc = document.querySelector('#bt-plus');
    const fileList = document.querySelector('#file-list'); 
    const fileForm = document.querySelector('#form-file-user');

    if (btNoteOpen){
        btNoteOpen.addEventListener('click', e => {
            btNoteClose.classList.add("active");
            noteForm.classList.add("active");
            btNoteOpen.classList.remove("active");
            noteTxt.classList.remove("active");
        })
    }
    if (btNoteClose){
        btNoteClose.addEventListener('click', e => {
            btNoteClose.classList.remove("active");
            noteForm.classList.remove("active");
            btNoteOpen.classList.add("active");
            noteTxt.classList.add("active");
        })
    }

    if (btDoc){
        btDoc.addEventListener('click', e => {
            if (btDoc.className == "active"){
                btDoc.classList.remove("active");
                fileList.classList.add("active");
                fileForm.classList.remove("active");
            }else{
                btDoc.classList.add("active");
                fileList.classList.remove("active");
                fileForm.classList.add("active");
            }
        })
    }
    
}

// article
if (document.querySelector('section').className == 'admin form-article'){

    var article = '#' + document.querySelector('form').name;
    var fieldBody = document.querySelector(article + '_body');

    // init CKeditor
    ClassicEditor
    .create(document.querySelector('#editor'), {
        toolbar: [ 'bold', 'italic', 'underline', 'blockQuote', '|', 'alignment', '|', 'bulletedList', 'numberedList', '|', 'link', '|', 'insertTable', '|', 'undo', 'redo' ],
        language: 'fr',
    } )
    .then(editor => {
        editor.setData(fieldBody.value);
        document.querySelector('form').addEventListener('submit', function(e){
            e.preventDefault();
            fieldBody.value = editor.getData();
            this.submit();
        })
    })
    .catch( error => {
        console.log( error );
    } );

    // test chars number in meta
    var metaTitle = document.querySelector(article + '_meta_title');
    var pCharTitle = document.querySelector('.nbCharTitle');
    var metaDescription = document.querySelector(article + '_meta');
    var pCharDescription = document.querySelector('.nbCharDescription');

    function show(champ, p, nb){
        nbChar =  champ.value.length;
        p.innerHTML = nbChar + " caractères / " + nb;
        if (nbChar > nb){
            p.style.color = 'red';
        }else{
            p.style = '';
        }
    }	
  
    const eventTitle = (event) => {
        show(metaTitle, pCharTitle, 60);
    }
    const eventDescription = (event) => {
        show(metaDescription, pCharDescription, 160);
    }

    show(metaTitle, pCharTitle, 60);
    show(metaDescription, pCharDescription, 160);

    metaTitle.onkeyup = eventTitle;
    metaDescription.onkeyup = eventDescription;


}