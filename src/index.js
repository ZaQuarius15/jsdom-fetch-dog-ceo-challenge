console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"
const breedArray = []
//LOAD DOM, RUN MAIN
document.addEventListener("DOMContentLoaded", main)

function main(){
    //ASSIGN <ul> TO VARIABLE
    const ul = document.getElementById("dog-breeds")
    //FETCH DOG IMAGES
    getDogImages(imgUrl)
    //FETCH DOG BREEDS
    getDogBreeds(breedUrl)
    //ASSIGN DROPDOWN TO VARIABLE
    document.getElementById("breed-dropdown").addEventListener("change",function(){
        console.log("anything")
        //CALL selectByFirstLetter FUNCTION
        selectByFirstLetter()
    })

    //DEFINE FETCH DOG IMAGES
    function getDogImages(url) { 
        //BEGIN FETCH REQUEST TO API
        fetch(url) .then(resp => resp.json())
        .then(function(json) { console.log(json)
        //RENDERS IMAGES ONCE THEY HAVE LOADED
        let div = document.getElementById("dog-image-container")
        //SET ARRAY OF IMAGE URLS TO VARIABLE
        let images = json.message
        images.forEach(function(image) {
            //ITERATING THROUGH EACH IMAGE URL:
            //CREATE IMG ELEMENT
            let img = document.createElement("img");
            //SET IMG SRC ATTRIBUTE TO IMAGE URL
            img.setAttribute("src",image);
            //APPEND IMAGE TAG TO dog-image-container
            div.appendChild(img);
        })
    })
    }

    //DEFINE FETCH DOG BREEDS
    function getDogBreeds(url) {
        //BEGIN FETCH REQUEST TO API
        fetch(url)
        .then(resp => resp.json())
        .then(function(json) {
            //ASSIGNING JSON RESPONSE INTO JS OBJECT
            let links = json.message;
            //ITERATE THROUGH EACH OF JS OBJECT's KEYS
            for(const key in links) {
                //IF KEY POINTS TO EMPTY ARRAY (i.e., NO BREED PREFIX)
                if (links[key].length === 0){
                    //ITERPOLATE KEY NAME AND PUSH INTO BREED ARRAY
                    breedArray.push(`${key}`)
                    //IF KEY POINTS TO BREED PREFIX
                } else {
                    links[key].forEach(function(prefix){
                        //BUILD FULL BREED-NAME - PUSH INTO BREED ARRAY
                        breedArray.push(`${prefix} ${key}`);
                })}

            }
            //CREATES INITIAL LIST OF BREEDS
            selectByFirstLetter()
        })
    }

    function selectByFirstLetter() {
        //DESTROY ALL CHILDREN, SYSTEMATICALLY
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        //SET CURRENT DROPDOWN ELEMENT VALUE TO VARIABLE
        drop_index = document.getElementById("breed-dropdown").value
        //SET DEFAULT ARRAY
        let filteredArray = breedArray
        if (drop_index != "none") {
            filteredArray = breedArray.filter(function(word){
            //RETURN DOG BREEDS WHOSE FIRST LETTER MATCHES DROPDOWN VALUE
            return word.split('')[0] === drop_index
            })
        }
        filteredArray.forEach(function(breed){
            //CREATE NEW <li> ELEMENT
            let li = document.createElement('li')
            //SET <li> ELEMENT TEXT TO BREED NAME
            li.innerText = breed
            //ADD LISTENER FOR RANDOM COLOR GENRERATOR FOR <li> BREED NAMES
            li.addEventListener("click", function(e) {
                //SET COLOR TO RANDOM COLOR 
                li.style.color = "#" + randomColor() 
            })
            //APPEND <li> to <ul>
            ul.appendChild(li)

        })    
    }
    //GENERATE RANDOM COLOR (6HEX)
    function randomColor() {
        return Math.floor(Math.random()*16777215).toString(16);
    }

    
}