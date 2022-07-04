const button = document.getElementById("button");
const input = document.getElementById("input");
const info = document.getElementById("info");
const podaci = document.getElementById("podaci");
const podaci_naslov = document.getElementById("podaci_naslov");




async function pozoviServerAsinkrono(e) {
    const termin = input.value;
    //if (termin == "") 
    info.innerHTML = '<progress class="progress is-small is-primary" max="100">15%</progress>';
    const odgovor = await fetch(`https://poetrydb.org/title/${termin}`);


    let data = await odgovor.json();
    console.log(data);

    if ( data.length === 0 ||termin == "") {
        podaci.innerHTML = "";
        
        info.innerHTML = `<div class="notification is-primary">Uneseni termin  ${termin} ne postoji! </div>`;
    } else {

        ubaciRezultateUdom(
            data,
            podaci)

    }

    function ubaciRezultateUdom(data, element) {
        info.innerHTML = "";
        let rezultat = `<div class="box"><h3>Ovo su fetch rezultati:</h3></div>`;

        data.forEach((element) => {
            

            rezultat += `
          
              <p>${element.author} <span>(title)</span></p> 
              
            </div>
            `
        });
        rezultat += "</div>";
        
        element.innerHTML = `<div class="notification is-primary">${rezultat} </div>`;;

    }

}


const tipkajFilter = (fn, delay) => {
    let timeoutID = null;
    return (...args) => {
      if (timeoutID) clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  
  input.addEventListener("input", tipkajFilter(pozoviServerAsinkrono, 500));







  