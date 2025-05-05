"use strict";
//const serverURI = "https://airatemyclasses-server.onrender.com/"
const serverURI = "http://localhost:3000";
const addCourse = (event) => {
    event.preventDefault();
    const courseName = event.target.children[0].value;
    getCourseData(courseName, serverURI);
    // add if user is logged in
};
const updateTopics = (topics) => {
    //fill section 1 with
    //div class flexpair
    // child -> div class child flex, button class ball, div class line
    //div dic class child -felx grow
    //  child -> <p>course text
    const list = document.getElementById("topics-list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
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
        list.appendChild(div1);
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
const loadResources = (resources) => {
    const list = document.getElementById("resources-list");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    resources.forEach((resource) => {
        const container = document.createElement("div");
        container.classList.add("resource-container");
        list.appendChild(container);
        const span = document.createElement("span");
        span.classList.add("rl-padding");
        container.appendChild(span);
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        span.appendChild(input);
        const resourceName = document.createElement("p");
        resourceName.innerHTML = resource;
        container.appendChild(resourceName);
    });
    /*
    <div class="resource-container">
      <span class="rl-padding">
        <input type="checkbox" />
      </span>
      <p>Paul's Online Math Notes</p>
    </div>
   */
};
const dummyCourse = {
    _id: "testinggg",
    title: "alebra",
    rating: "3.5",
    similarClasses: ["calc1", "calc2", "linear algebra"],
    topicsCovered: [
        "\nLimits and Continuity",
        "Derivatives",
        "Applications of Derivatives",
        "Integrals",
        "Techniques of Integration",
        "Sequences and Series",
        "Differential Equations",
        "Functions",
    ],
    learningResources: [
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
const dummyCourse2 = {
    _id: "testingggadwwad",
    title: "calculus1",
    rating: "4",
    similarClasses: ["calc1", "calc2", "linear algebra"],
    topicsCovered: [
        "\nLimits and CoASSSSDADSDADy",
        "DeASSSSDADSDADes",
        "Applications of DeASSSSDADSDADes",
        "IASSSSDADSDADs",
        "Techniques of IASSSSDADSDADion",
        "Sequences anASSSSDADSDADs",
        "DifferentialASSSSDADSDADons",
        "FASSSSDADSDAD"
    ],
    learningResources: [
        "\nASSSSDADSDADk",
        "OnlASSSSDADSDADework System",
        "Professor'ASSSSDADSDADe Hours",
        "Teaching AASSSSDADSDADt Sessions",
        "OnlinASSSSDADSDADs",
        "KhanASSSSDADSDADy",
        "PaulASSSSDADSDADne Math Notes",
        "Calculus ASSSSDADSDADuides",
    ],
};
/*
updateRating(dummyCourse.rating, "Calculus 1");
loadResources(dummyCourse.resources)
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
        console.log("test");
        courseData.title = courseName;
        loadCourse(courseData);
        localStorage.setItem(courseData._id, JSON.stringify(courseData));
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
        // store data in local storage
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
//showCookies();
function removeElement(element) {
    /*console.log("close form ran")
    let form = document.querySelector(".form-container");
  
    while(form?.firstChild){
      form.removeChild(form.firstChild);
    }
  
    form?.remove();
  
    */
    console.log("close form ran");
    while (element === null || element === void 0 ? void 0 : element.firstChild) {
        element.removeChild(element.firstChild);
    }
    element === null || element === void 0 ? void 0 : element.remove();
}
const loadCourse = (course) => {
    const courseID = course._id;
    const courseTitle = course.title;
    const courseRating = course.rating;
    // select course-span
    let parentContainer = document.querySelector(".course-span");
    //parentContainer?.insertAdjacentElement("afterend",)
    // add-child->
    const courseContainer = document.createElement("div");
    courseContainer.id = courseID;
    courseContainer.classList.add("course");
    parentContainer === null || parentContainer === void 0 ? void 0 : parentContainer.appendChild(courseContainer);
    //add sibling ->
    const closeButtonContainer = document.createElement("div");
    closeButtonContainer.classList.add("course-close-container");
    courseContainer === null || courseContainer === void 0 ? void 0 : courseContainer.appendChild(closeButtonContainer);
    //add child->
    const closeButton = document.createElement("button");
    closeButton.classList.add("button-minimal");
    closeButton.classList.add("course-close-button");
    closeButton.innerHTML = "X";
    //add even listener to remove by id
    const courseToRemove = document.getElementById(courseContainer.id);
    closeButton.addEventListener("click", () => removeElement(courseToRemove));
    closeButtonContainer === null || closeButtonContainer === void 0 ? void 0 : closeButtonContainer.appendChild(closeButton);
    //add sibling ->
    const titleSpan = document.createElement("span");
    titleSpan.classList.add("course-heading");
    closeButtonContainer === null || closeButtonContainer === void 0 ? void 0 : closeButtonContainer.insertAdjacentElement("afterend", titleSpan);
    // add child ->
    const title = document.createElement("h1");
    title.innerHTML = courseTitle;
    titleSpan.appendChild(title);
    // add sibling ->
    const ratingSpan = document.createElement("span");
    ratingSpan.classList.add("course-rating");
    titleSpan === null || titleSpan === void 0 ? void 0 : titleSpan.insertAdjacentElement("afterend", ratingSpan);
    // add child ->
    const rating = document.createElement("h1");
    rating.innerHTML = courseRating;
    ratingSpan === null || ratingSpan === void 0 ? void 0 : ratingSpan.appendChild(rating);
    // add sibling ->
    const detailsSpan = document.createElement("span");
    detailsSpan.classList.add("course-details");
    ratingSpan === null || ratingSpan === void 0 ? void 0 : ratingSpan.insertAdjacentElement("afterend", detailsSpan);
    // add child ->
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("course-button-container");
    detailsSpan.appendChild(buttonContainer);
    // add child ->
    const button = document.createElement("button");
    button.classList.add("course-button");
    button.innerHTML = "details";
    button.addEventListener("click", () => selectCourse(courseID, button));
    buttonContainer.appendChild(button);
    console.log(course);
    loadSimilarCourses(course.similarClasses);
    loadResources(course.learningResources);
    updateTopics(course.topicsCovered);
    /*
      <span class="course-span">
    
      <div class="course" id="course1">
      <div class="course-close-container"><button class="button-minimal course-close-button" type="button" onclick="removeElement(document.querySelector('#course1'))">x</button></div>
    
        <span class="course-heading">
    
          <h1>Algebra</h1>
        </span>
        <span class="course-rating">
          <h1>0</h1>
        </span>
        <span class="course-details">
          <div class="course-button-container">
            <button class="course-button">details</button>
          </div>
        </span>
      </div>
    */
};
function loadSimilarCourses(similarCourses) {
    const list = document.getElementById("similar-list");
    while (list === null || list === void 0 ? void 0 : list.firstChild) {
        list.removeChild(list === null || list === void 0 ? void 0 : list.firstChild);
    }
    similarCourses.forEach((courseName) => {
        // add sibling ->
        // add child ->
        const container = document.createElement("div");
        container.classList.add("resource-container");
        list === null || list === void 0 ? void 0 : list.appendChild(container);
        // add child to container ->
        const span = document.createElement("span");
        span.classList.add("rl-padding");
        container === null || container === void 0 ? void 0 : container.appendChild(span);
        // add child to span ->
        const button = document.createElement("button");
        button.classList.add("green-small-button");
        button.innerHTML = "+";
        span.appendChild(button);
        // add sibling to span ->
        const name = document.createElement("p");
        name.innerHTML = courseName;
        span === null || span === void 0 ? void 0 : span.insertAdjacentElement("afterend", name);
    });
    /*
  
    <div class="recommended card vw-20">
          <h2>similar classes:</h2>
  
          <ul id="similar-list">
           
            <div class="resource-container">
              <span class="rl-padding">
                <button class="green-small-button">+</button>
              </span>
              <p>algebra</p>
            </div>
          </ul>
  
        </div>*/
}
function selectCourse(courseID, button) {
    //find course by course id
    console.log(courseID);
    // make button = selected
    button.style.background = "#006633";
    let course = localStorage.getItem(courseID);
    course = JSON.parse(course);
    // load topics
    loadSimilarCourses(course.similarClasses);
    loadResources(course.learningResources);
    updateTopics(course.topicsCovered);
    //load resources
    //load similar classe
}
