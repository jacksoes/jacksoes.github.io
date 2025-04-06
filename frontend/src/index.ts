//const serverURI = "https://airatemyclasses-server.onrender.com/"

//const serverURI = "http://localhost:3000";

type Course = {
    rating: string,
    subject: Array<string>,
    resource: Array<string>
}



const serverURI: string = "http://localhost:3000";
const addCourse = (event: Event) => {
  event.preventDefault();

  const courseName: string = event.target.children[0].value;

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
            let resources = document.createElement("ul");

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
};

const updateRating = (rating: string, name: string) => {
  const oldRating = document.querySelector("#test-rating");
  console.log("update rating:");
  console.log(oldRating);
  oldRating.innerHTML = rating;

  const oldName = document.querySelector("#test-name");
  oldName.innerHTML = name;
};

const updateTopics = (topics: Array<string>) => {
  const sec: HTMLElement = document.querySelector("#section-one");

  //fill section 1 with
  //div class flexpair
  // child -> div class child flex, button class ball, div class line
  //div dic class child -felx grow
  //  child -> <p>course text

  while (sec.firstChild) {
    sec.removeChild(sec.firstChild);
  }

  const header = document.createElement("h1");
  header.classList.add("card-title");
  header.innerHTML = "Topics covered";
  sec.appendChild(header);

  console.log(sec);
  console.log(topics.length);

  let count = 0;
  topics.forEach((topic) => {
    const div1: HTMLDivElement = document.createElement("div");
    div1.classList.add("flex-pair");

    const div2: HTMLDivElement = document.createElement("div");
    div2.classList.add("child-flex");

    const button: HTMLButtonElement = document.createElement("button");
    button.classList.add("ball");

    const line: HTMLDivElement = document.createElement("div");
    line.classList.add("line");

    const div3: HTMLDivElement = document.createElement("div");
    div3.classList.add("child-flex-grow");

    const yo: HTMLParagraphElement = document.createElement("p");
    yo.innerHTML = topic;

    sec.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(button);
    div2.appendChild(line);
    div1.appendChild(div3);
    div3.appendChild(yo);

    //remove last line div
    count++;
    if (count == topics.length) div2.removeChild(div2.lastChild);
  });
};

const updateResources = () => {};

const dummyCourse = {
  rating: "3.5",
  topics: [
    "\nLimits and Continuity",
    "Derivatives",
    "Applications of Derivatives",
    "Integrals",
    "Techniques of Integration",
    "Sequences and Series",
    "Differential Equations",
    "Functions",
  ],
  resources: [
    "\nTextbook",
    "Online Homework System",
    "Professor's Office Hours",
    "Teaching Assistant Sessions",
    "Online Forums",
    "Khan Academy",
    "Paul's Online Math Notes",
    "Calculus Study Guides",
  ],
};

updateTopics(dummyCourse.topics);
updateRating(dummyCourse.rating, "Calculus 1");

/*
 <div class="flex-pair">
            <div class="child-flex">
          <button class="ball"></button>
          <div class="line"></div>
        </div>
            <div class="child-flex-grow">
                <p>yo dawg</p>
            </div>
        </div>
        */

const getCourseData = (courseName: string, serverURI: string) => {
  fetch(`${serverURI}/queryCourse`, {
    method: "POST",
    body: JSON.stringify({
      courseName: courseName,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((courseData: Course) => {
      updateRating(courseData.rating, courseName);
      updateTopics(courseData.subject);
      //updateResources(courseData.resource)
    });
};
