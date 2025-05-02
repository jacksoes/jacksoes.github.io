"use strict";
//const serverURI = "https://airatemyclasses-server.onrender.com/"
const serverURI = "http://localhost:3000";
const addCourse = (event) => {
    event.preventDefault();
    const courseName = event.target.children[0].value;
    getCourseData(courseName, serverURI);
};
const updateRating = (rating, name) => {
    const oldRating = document.querySelector("#test-rating");
    oldRating.innerHTML = rating;
    const oldName = document.querySelector("#test-name");
    oldName.innerHTML = name;
};
const updateTopics = (topics) => {
    const sec = document.querySelector("#section-one");
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
    let count = 0;
    topics.forEach((topic) => {
        const div1 = document.createElement("div");
        div1.classList.add("flex-pair");
        const div2 = document.createElement("div");
        div2.classList.add("child-flex");
        const button = document.createElement("button");
        button.classList.add("ball");
        const line = document.createElement("div");
        line.classList.add("line");
        const div3 = document.createElement("div");
        div3.classList.add("child-flex-grow");
        const yo = document.createElement("p");
        yo.innerHTML = topic;
        sec.appendChild(div1);
        div1.appendChild(div2);
        div2.appendChild(button);
        div2.appendChild(line);
        div1.appendChild(div3);
        div3.appendChild(yo);
        //remove last line div
        count++;
        if (count == topics.length)
            div2.removeChild(div2.lastChild);
    });
};
const updateResources = (resources) => {
    let oldResources = document.querySelector("#resources-list");
    while (oldResources.firstChild) {
        oldResources.removeChild(oldResources.firstChild);
    }
    resources.forEach((resource) => {
        let newResource = document.createElement("li");
        newResource.innerHTML = resource;
        oldResources.appendChild(newResource);
    });
};
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
/*
updateTopics(dummyCourse.topics);
updateRating(dummyCourse.rating, "Calculus 1");
updateResources(dummyCourse.resources)
*/
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
const getCourseData = (courseName, serverURI) => {
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
        .then((courseData) => {
        updateRating(courseData.rating, courseName);
        updateTopics(courseData.subjects);
        updateResources(courseData.resources);
    });
};
const userSignup = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    const confirmPassword = event.target[2].value;
    fetch(`${serverURI}/signUp`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
    });
};
const userLogin = (event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    fetch(`${serverURI}/logIn`, {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        console.log(data.userID);
        document.cookie = "test=testcookies";
    });
};
function showCookies() {
    const output = document.getElementById("cookies");
    output.textContent = `> ${document.cookie}`;
}
showCookies();
