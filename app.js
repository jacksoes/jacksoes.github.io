//const serverURI = "https://airatemyclasses-server.onrender.com/"

const serverURI = "http://localhost:3000"



const addCourse = (event) => {
    event.preventDefault()
    
    
    let courseName = event.target.children[0].value;

    getCourseData(courseName, serverURI)

    // get courseDATA as json from getCourseData()

    // put each course data property into dom


    /*
    fetch(serverURI, {
        method: "POST",
        body: JSON.stringify({
            promptRating: `give me an exact rating out of 5 of the general difficulty of the class ${value} return only a length of 3 in the format $.$, use factors such as fail rate and course level,  if you do not recognize the course return the string: 'invalid'`,
            promptSubject: `give me a list of subjects that will be learned in the class: ${value} format it as a javscript array like so [$, $, $, $] the $ are strings of topics typically covered.`,
            promptResource: `give me a list of resources that will be useful in the class: ${value} format it as a javscript array like so [$, $, $, $] the $ are strings of resources such as websites or books when taking the specified class.`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
        .then((response) => response.text())
        .then((prompts) => {
            let promptsArr = prompts.split("&split")
            console.log(promptsArr)

            promptsArr[1] = promptsArr[1].substring(2, promptsArr[1].length - 1)
            promptsArr[2] = promptsArr[2].substring(2, promptsArr[2].length - 1)
            console.log(promptsArr)

            promptsArr[1] = promptsArr[1].split(',')
            promptsArr[2] = promptsArr[2].split(',')

            let topics = document.createElement("ul");
            let resources = document.createElement("ul");

            let oldTopics = document.querySelector("#topics-list")
            while (oldTopics.firstChild) {
                oldTopics.removeChild(oldTopics.firstChild);
              }

            promptsArr[1].forEach(topic => {
                let newTopic = document.createElement("li")
                newTopic.innerHTML = topic
                oldTopics.appendChild(newTopic)

            });

          
            let oldResources = document.querySelector("#resources-list")

            while (oldResources.firstChild) {
                oldResources.removeChild(oldResources.firstChild);
              }
            promptsArr[2].forEach(resource => {
                let newResource = document.createElement("li")
                newResource.innerHTML = resource
                oldResources.appendChild(newResource)
            })


            let oldRating = document.querySelector("#test-rating")
            let oldName = document.querySelector("#test-name")
            let totalRating = "difficulty: " + promptsArr[0] + "/5"
            oldRating.innerHTML = totalRating
            oldName.innerHTML = value

            
        });*/





}

const getCourseData = (courseName, serverURI) =>{

    fetch(`${serverURI}/queryCourse`, {
        method: "POST",
        body: JSON.stringify({
            courseName: courseName
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        }
    })
    .then((response) => response.text())
    .then((prompts) => {
            console.log(prompts)
    })


    
}



