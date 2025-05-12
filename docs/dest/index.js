"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const serverURI = "http://3.217.238.48:3000";
//const serverURI: string = "http://localhost:3000";
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
        credentials: "include",
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
        // store data in local storag
    });
};
const userLogin = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const username = event.target[0].value;
    const password = event.target[1].value;
    yield fetch(`${serverURI}/logIn`, {
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
        if (!data.loggedIn) {
            return;
        }
        console.log(data);
        console.log(data.userID);
        document.cookie = `userID=${data.userID}`;
        let name = document.querySelector("#usernameContainer");
        name === null || name === void 0 ? void 0 : name.innerHTML = username;
    });
    fetch(`${serverURI}/add`, {
        credentials: "include",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        console.log("courses are: ", data.courses);
        localStorage.clear();
        data.courses.forEach((course) => {
            localStorage.setItem(course._id, JSON.stringify(course));
        });
        main();
    });
});
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
    const courseToRemove = document.getElementById(courseID);
    closeButton.addEventListener("click", () => {
        removeElement(courseToRemove);
        localStorage.removeItem(courseID);
        removeCourse(courseID);
    });
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
        button.addEventListener("click", () => getCourseData(courseName, serverURI));
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
    //bc010e6ed25b802da7eb
    console.log(courseID);
    // make button = selected
    //if button is already selected
    /* if(button.style.background === 'rgb(0, 102, 51)' || button.style.background === "#006633")
    {
      button.style.background = "unset";
    } // else select
    else{
      button.style.background = "#006633"
    }*/
    let course = localStorage.getItem(courseID);
    course = JSON.parse(course);
    // load topics
    loadSimilarCourses(course.similarClasses);
    loadResources(course.learningResources);
    updateTopics(course.topicsCovered);
    //load resources
    //load similar classe
}
function loadLogin() {
    /*
  
    const formContainer: HTMLDivElement = document.createElement("div");
    formContainer.classList.add("form-container");
    formContainer.classList.add("card");
  
    document.body.appendChild(formContainer)
  
  
    // add child to formContainer ->
  
    
  
    const closeButton: HTMLButtonElement = document.createElement("button");
    closeButton.classList.add("button-minimal")
    closeButton.classList.add("close-button")
    closeButton.innerHTML = "X"
    // add event and maybe type button
    formContainer.appendChild(closeButton);
  
  
    // add adjacent to closeButton ->
    const form: HTMLFormElement = document.createElement("form");
    form.classList.add("signUp-form")
    // aad event
    closeButton.insertAdjacentElement("afterend", form)
  
  
  
    // add as child to form ->
    const flexPair: HTMLDivElement = document.createElement("div");
    flexPair.classList.add("flex-pair")
  
    form.appendChild(flexPair)
  
    // add as child to flexpar->
    const header: HTMLDivElement = document.createElement("h2");
    header.innerHTML = "rate my classes"
  
    flexPair.appendChild(header)
    
    // ad as sibling to header ->
    const image: HTMLImageElement = document.createElement("img");
    //image.src = "../resources/book.jpg"
    image.alt = "book-logo"
  
    flexPair.appendChild(image)
  
  
    // add adjacent to flex-pair ->
  
     const headerLogin: HTMLDivElement = document.createElement("h1");
     headerLogin.classList.add("form-header")
    headerLogin.innerHTML = "User Log in"
  
    flexPair.insertAdjacentElement("afterend", headerLogin)
  
    // add adjacent to header ->
    const flexCol: HTMLDivElement = document.createElement("div");
    flexCol.classList.add("flex-col")
  
    headerLogin.insertAdjacentElement("afterend", flexCol)
  
    // add child to flexCol ->
  
    const label: HTMLLabelElement = document.createElement("label");
    label.classList.add("signUp-label")
    //label.innerHTML="Email"
  
    const testSpan = document.createElement("span");
    testSpan.innerHTML = "email"
    label.appendChild(testSpan)
  
  
    flexCol.appendChild(label);
  
   
  
    // add span as child
    const span: HTMLSpanElement = document.createElement("span");
    span.classList.add("red")
    span.innerHTML = "*"
  
    label.appendChild(span)
  
  
    //input as child of label
  
    const input: HTMLInputElement = document.createElement("input");
  
    label.appendChild(input)
  
    const label2: HTMLLabelElement = document.createElement("label");
    label2.classList.add("signUp-label")
  
    flexCol.appendChild(label2)
  
    // add span as child
    const span2: HTMLSpanElement = document.createElement("span");
    span2.classList.add("red")
    span2.innerHTML = "*"
  
    const testSpan2 = document.createElement("span");
    testSpan2.innerHTML = "password"
    label2.appendChild(testSpan2)
  
    label2.appendChild(span2);
  
  
    //input as child of label
  
    const input2: HTMLInputElement = document.createElement("input");
  
    label2.appendChild(input2);
  
    const button = document.createElement("button");
    button.classList.add("course-button");
    button.innerHTML ="Log In"
  
    label2.insertAdjacentElement("afterend", button)
  
  
    const button2 = document.createElement("button");
    button2.classList.add("button-minimal");
    button2.innerHTML ="Sign Up"
  
    button.insertAdjacentElement("afterend", button2)
    */
    /*
    <button class="course-button">Log In</button>
    <br>
    <button class="button-minimal"> Sign Up </button>
  */
    //
    /*
    <div class="form-container card">
    <button class="button-minimal close-button" type="button" onclick="removeElement(document.querySelector('.form-container'))">x</button>
    <form class="signUp-form" onsubmit="userLogin(event)">
  
  
      <div class="flex-pair">
        <h2>AI rate my classes</h2>
        <img
          class="signUp-logo"
          height="50px"
          width="50px"
          src="resources/book.jpg"
          alt="book-logo"
        />
      </div>
  
      <h1 class="form-header">User log in</h1>
     
  
      <div class="flex-col">
  
  
        <label class="signUp-label">Email<span class="red">*</span>
        <input
          class="signUp-input"
          type="text"
          placeholder="Enter your email"
        /></label>
  
        <label class="signUp-label">Password<span class="red">*</span>
        <input
          class="signUp-input"
          type="password"
          placeholder="Enter your password"
        /></label>
        
        
        <button class="course-button">Log In</button>
        <br>
        <button class="button-minimal"> Sign Up </button>
      </div>
    </form>
  </div>
  */
    const div = document.createElement("div");
    div.innerHTML = `<div class="form-container card">
<button class="button-minimal close-button" type="button" onclick="removeElement(document.querySelector('.form-container'))">x</button>
<form class="signUp-form" onsubmit="userLogin(event)">


  <div class="flex-pair">
    <h2>AI rate my classes</h2>
    <img
      class="signUp-logo"
      height="50px"
      width="50px"
      src="resources/book.jpg"
      alt="book-logo"
    />
  </div>

  <h1 class="form-header">User log in</h1>
 

  <div class="flex-col">


    <label class="signUp-label">Email<span class="red">*</span>
    <input
      class="signUp-input"
      type="text"
      placeholder="Enter your email"
    /></label>

    <label class="signUp-label">Password<span class="red">*</span>
    <input
      class="signUp-input"
      type="password"
      placeholder="Enter your password"
    /></label>
    
    
    <button class="course-button">Log In</button>
    <br>
    <button class="button-minimal" type="button" onclick="loadSignup()"> Sign Up </button>
  </div>
</form>
</div>`;
    document.body.appendChild(div);
}
function loadSignup() {
    const div = document.createElement("div");
    div.innerHTML = `<div class="form-container card">
    <button class="button-minimal close-button" type="button" onclick="removeElement(document.querySelector('.form-container'))">x</button>
      <form class="signUp-form" onsubmit="userSignup(event)">
        <div class="flex-pair">
          <h2>AI rate my classes</h2>
          <img
            class="signUp-logo"
            height="50px"
            width="50px"
            src="resources/book.jpg"
            alt="book-logo"
          />
        </div>

        <h1 class="form-header">Create your account</h1>
        <p style="text-align: center; margin-top: 1rem">
          Save your personalized course data!
        </p>

        

        <div class="flex-col">
          <label class="signUp-label">Email<span class="red">*</span>
          <input pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
            class="signUp-input"
            type="text"
            placeholder="Enter your email"
          /></label>

          <label class="signUp-label">Password<span class="red">*</span>
          <input
            class="signUp-input"
            type="password"
            placeholder="Enter your password"
          /></label>
          
          <label class="signUp-label"
            >Confirm password<span class="red">*</span>
          <input
            class="signUp-input"
            type="password"
            placeholder="Confirm your password"
          />
          </label
          >
          <button class="course-button">Sign Up</button>
          <button class="button-minimal" type="button" onclick="loadLogin()"> Log In </button>
        </div>
      </form>
    </div>`;
    document.body.appendChild(div);
}
function removeCourse(courseID) {
    fetch(`${serverURI}/remove`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            courseID: courseID,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
    });
}
function logout() {
    document.cookie = "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.clear();
    let name = document.querySelector("#usernameContainer");
    name === null || name === void 0 ? void 0 : name.innerHTML = "";
    let container = document.querySelector(".course-span");
    while (container === null || container === void 0 ? void 0 : container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
function advisor(event) {
    event.preventDefault();
    let prompt = "You are a course advisor, I am a student asking for course advice. Respond to my following prompt: ";
    prompt += event.target[0].value;
    console.log(prompt);
    fetch(`${serverURI}/advisor`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
            prompt: prompt,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        alert(data.result);
    });
}
function main() {
    //get each course from local storage
    let totalDifficulty = 0;
    let courseCount = 0;
    Object.keys(localStorage).forEach(function (key) {
        // to do: better type checking for if its a course
        if ((key === null || key === void 0 ? void 0 : key.charAt(0)) == "6") {
            loadCourse(JSON.parse(localStorage.getItem(key)));
            let difficulty = JSON.parse(localStorage.getItem(key));
            difficulty = difficulty.rating;
            difficulty = parseFloat(difficulty);
            totalDifficulty += difficulty;
            courseCount++;
        }
    });
    if (totalDifficulty != 0) {
        totalDifficulty = totalDifficulty / courseCount;
        let diff = document.querySelector("#diff");
        diff === null || diff === void 0 ? void 0 : diff.innerHTML = totalDifficulty;
    }
}
main();
//loadSignup();
//loadLogin()
