/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const pageHeader = document.getElementsByClassName('page-header cf');
const studentList = document.getElementsByClassName('student-list');
const students = document.getElementsByClassName('student-item cf');
const page = document.getElementsByClassName('page');

let newStudentSearch = document.createElement('div');
newStudentSearch.className = 'student-search';
pageHeader[0].appendChild(newStudentSearch);
const studentSearch = document.getElementsByClassName('student-search');


const newStudentSearchInput = document.createElement('input');
newStudentSearchInput.placeholder = 'Search for students...';
studentSearch[0].appendChild(newStudentSearchInput);

const newStudentSearchButton = document.createElement('button');
newStudentSearchButton.textContent = 'Search';
studentSearch[0].appendChild(newStudentSearchButton);


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 studetns, the last page will only display four
 
function hideStudents() {
    for (let i = 0; i < students.length; i++) {
        students[i].style.display = 'none';
    }
}

function studentVisibility(pageNumber) {
    const maximum = pageNumber * 10;
    const minimum = maximum - 10;
    
    hideStudents();

    const a = document.getElementsByTagName('a');
    for (let i = 0; i < a.length; i++) {
        if (i == pageNumber - 1){
            a[i].className = 'active';
        } else {
            a[i].className = 'inactive';
        }
    }

    for (let i = minimum; i < maximum; i++) {
        if (students[i]) {
            students[i].style.display = '';
        } else {
            return;
        }
    }
}


// Create and append the pagination links - Creating a function that can do this is a good approach
function createPaginationLinks () {
    const studentCount = students.length;
    const pageCount = studentCount / 10.0;

    let newPaginationDiv = document.createElement('div');
    newPaginationDiv.className = 'pagination';
    page[0].appendChild(newPaginationDiv);
    const paginationDiv = document.getElementsByClassName('pagination')[0];

    let newPaginationUl = document.createElement('ul');
    paginationDiv.appendChild(newPaginationUl);
    const paginationUl = paginationDiv.children[0];

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
            studentVisibility(e.target.textContent);
        }, false);
    }
}



// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here


createPaginationLinks();

document.querySelector('a').className = 'active';

studentVisibility(1);
