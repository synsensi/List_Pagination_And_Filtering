/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


// References to DOM Elements
const pageHeader = document.getElementsByClassName('page-header cf');
const studentList = document.getElementsByClassName('student-list');
const students = document.getElementsByClassName('student-item cf');
const page = document.getElementsByClassName('page');


// An array variable containing a list of students to be displayed
let visibleStudents = [];


// Adds a <div> tag to hold the search <input> and search <button> tags
// Adds a DOM Element Reference to the newly created <div> tag
let newStudentSearch = document.createElement('div');
newStudentSearch.className = 'student-search';
pageHeader[0].appendChild(newStudentSearch);
const studentSearch = document.getElementsByClassName('student-search');


// Adds an <input> tag to function as the search text <input> tag
// Adds a DOM Element Reference to the newly created <input> tag
// Event Listener added to <input> to update search and page on each keyup event
let newStudentSearchInput = document.createElement('input');
newStudentSearchInput.placeholder = 'Search for students...';
studentSearch[0].appendChild(newStudentSearchInput);
const studentSearchInput = document.getElementsByTagName('input')[0];

studentSearchInput.addEventListener('keyup', () => {
    clearVisibleStudentArray();

    hideStudents();

    search();

    searchMessageUpdate();
    
    createPaginationLinks();

    studentVisibility();
});


// Adds a <button> tag to function as the search button
// Adds a DOM Element Reference to the newly created <button> tag
// Event Listener added to <button> tag to update search and page on click
let newStudentSearchButton = document.createElement('button');
newStudentSearchButton.textContent = 'Search';
studentSearch[0].appendChild(newStudentSearchButton);

const studentSearchButton = document.getElementsByTagName('button')[0];

studentSearchButton.addEventListener('click', () => {
    clearVisibleStudentArray();

    hideStudents();

    search();

    searchMessageUpdate();
    
    createPaginationLinks();

    studentVisibility();
}, false);


// Adds a <div> tag to hold search message information <h3> tag
// Adds a DOM Element Reference to the newly created <div> tag
let newSearchMessageDiv = document.createElement('div');
newSearchMessageDiv.className = 'search-message-div';
page[0].insertBefore(newSearchMessageDiv, studentList[0]);
const searchMessageDiv = document.getElementsByClassName('search-message-div')[0];


// Adds an <h3> tag to hold the search information message 
// Adds a DOM Element Reference to the newly created <h3> tag
let newSearchMessage = document.createElement('h3');
newSearchMessage.className = 'search-message';
newSearchMessage.textContent = '';
searchMessageDiv.appendChild(newSearchMessage);
const searchMessage = document.getElementsByClassName('search-message')[0];


// Adds a linebreak <br /> tag as the last child of the search message <div> for formatting purposes
let newLineBreak = document.createElement('br');
searchMessageDiv.appendChild(newLineBreak);


// Function updates search message tag inner text, for example: "# of students were found."
function searchMessageUpdate() {
    searchMessage.textContent = visibleStudents.length + ' students were found.';
}


// Function hides all visible students on the page
function hideStudents() {
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }
}


// Function clears the visibleStudents[] array containing a list of students to be displayed 
function clearVisibleStudentArray() {
    visibleStudents = [];
}


// Function hides and displays students and sets an active paginated link based on the pageNumber Argument
function studentVisibility(pageNumber = 1) {
    // Adds a DOM Reference for the paginated link <a> tags
    // For loop changes the classes of the paginated link  <a> tag based on the pageNumber Argument
    const a = document.getElementsByTagName('a');
    for (let i = 0; i < a.length ; i++) {
        if (i != pageNumber - 1){
            a[i].className = 'inactive';
        } else {
            a[i].className = 'active';
        }
    }

    // Function call to hide students displayed on page
    hideStudents();

    // Variables to calculate the minimum and maximum number of displayed students based on the pageNumber Argument
    // For loop sets the visibilities of the students based on search filtered students in visibleStudents[] array
    const maximum = pageNumber * 10;
    const minimum = maximum - 10;
    for (let i = minimum; i < maximum; i++) {
        if (visibleStudents[i] != null) {
            students[visibleStudents[i]].style.display = '';
        } else {
            return;
        }
    }    
}


// Function to filter students to be displayed in the visibleStudents[]
function search() {
    // Retrieves the value in the search text <input> tag
    // For loop to search through all students names and emails for a match to student text <input> entry
    // If a match is found it is added to the visibleStudents[] array 
    let entry = studentSearchInput.value;
    for (let i = 0; i < students.length; i++) {
        let studentName = students[i].querySelector('div h3').textContent;
        let studentEmail = students[i].querySelector('.email').textContent;

        if (studentName.indexOf(entry) >= 0 || studentEmail.indexOf(entry) >= 0) {
            visibleStudents.push(i);
        }
    }
}


// Function to create and add paginated links to bottom of page based on students in visibleStudents[] array
function createPaginationLinks () {
    // Calculates the amount of paginated links based on length of the visibleStudents[] array
    const pageCount = visibleStudents.length / 10.0;

    // Removes any current paginated links that may exist on the page already
    if (document.getElementsByClassName('pagination')[0] != null) {
        document.getElementsByClassName('pagination')[0].remove();
    }

    // Adds a <div> tag to hold paginated list <ul> tag and page link <li> tags
    // Adds a DOM Element Reference to the newly created <div> tag
    let newPaginationDiv = document.createElement('div');
    newPaginationDiv.className = 'pagination';
    page[0].appendChild(newPaginationDiv);
    const paginationDiv = document.getElementsByClassName('pagination')[0];

    // Adds a paginated list <ul> tag to hold page link <li> tags
    // Adds a DOM Element Reference to the newly created <ul> tag
    let newPaginationUl = document.createElement('ul');
    paginationDiv.appendChild(newPaginationUl);
    const paginationUl = paginationDiv.children[0];

    // For loop to add page link <li> and nested link <a> tags to paginated list <ul> tag
    // Event Listener is added to each page link <li> nested <a> tag on click to change the set of displayed students
    for (let i = 0; i <= pageCount; i++) {
        let newPaginationLi = document.createElement('li');
        paginationUl.appendChild(newPaginationLi);
        
        let paginationLi = paginationUl.children[i];
        
        let newPaginationLink = document.createElement('a');
        newPaginationLink.href = '#';
        newPaginationLink.textContent = i + 1;
        paginationLi.appendChild(newPaginationLink);

        let paginationLink = paginationLi.children[0];
        paginationLink.addEventListener('click', (e) => {
            studentVisibility(parseInt(e.target.textContent));
        }, false);
    }

    // Sets the first pagination link to to active once the createPaginationLinks() Function is called
    document.querySelector('a').className = 'active';
}


// Event Listener added to start executing Functions to generate initial page view
// Initial page view displays the first 10 of all students and paginated links to display every 10 students 
window.addEventListener('load', () => {
    clearVisibleStudentArray();

    hideStudents();

    search();

    searchMessageUpdate();
    
    createPaginationLinks();

    studentVisibility();
});
