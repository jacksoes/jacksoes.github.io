const serverURI = "http://localhost:3000"
function testForm() {
    event.preventDefault()
    let testi = document.querySelector("#test").value;
    console.log(testi)

    test(testi)   
  
}

function test(value) {
  
    fetch(serverURI, {
        method: "POST",
        body: JSON.stringify({
          promptRating: `give me an exact rating out of 5 of the general difficulty of the class ${value} return only a length of 3 in the format $.$, use factors such as fail rate and course level,  if you do not recognize the course return the string: 'invalid'`,
          promptSubject: `give me a list of subjects that will be learned in the class: ${value} format it as a javscript array`
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
   

}

function testin(){
    test();
}


