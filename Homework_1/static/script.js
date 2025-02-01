// Array to store book data
const applications = [];
var appnumber = 0;

// Function to add an app to the list and send it to the server
function addApplication() {
    const applicationTitle = document.getElementById('applicationTitle').value;
    appnumber = appnumber +1;

    // Create a JSON object with app data
    const applicationData = {
        title: applicationTitle,
        stat: 'Recevied',
        app: appnumber

    };

    // Send the book data to the server via POST request
    fetch('/api/add_application', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(applicationData)
    })
        .then(response => response.json())
        .then(data => {
            // Display a success message or handle errors if needed
            console.log(data.message);

            // Add the new book data to the books array
            applications.push(applicationData);
            console.log(applications)

            // Refresh the book list
            displayApplications();
        })
        .catch(error => {
            console.error('Error adding application:', error);
        });
}
// Function to add a book to the list and send it to the server
function check_stat() {
    const application_number = parseInt(document.getElementById('application_number').value, 10);
    
    const statusDiv = document.getElementById("applicationsStatus");

    statusDiv.innerHTML = "";

    for (let i = 0; i < applications.length; i++) {
        if (application_number === applications[i].app){
        
        
        status_temp = applications[i].stat;
        document.getElementById('applicationsStatus').innerHTML = `Status: ${status_temp}`;
        return;   
        } 
        }

    
    document.getElementById('applicationsStatus').innerHTML = "Application not found.";
            
}

// Function to add a book to the list and send it to the server
function change_stat() {
    const application_number2 = parseInt(document.getElementById('application_number2').value, 10);
    
    for (let i = 0; i < applications.length; i++) {
        if (application_number2 === applications[i].app){ 
        applications[i].stat = document.getElementById('statusSelect').value;
        return;    
        }

    }
    document.getElementById('applicationsStatus').innerHTML = "Application not found.";
            

}

// Function to display books in the list
function displayApplications() {
    const applicationList = document.getElementById('applicationList');
    applicationList.innerHTML = ''; // Clear existing book list

    applications.forEach(application => { 
        const applicationElement = document.createElement('div');
        applicationElement.innerHTML = `
            <h2>Application Added Successfully :${application.app}</h2>
        `;
        applicationList.appendChild(applicationElement);
    });
}
// Function to fetch and display all books from the server
function showAllApplications() {
    fetch('/api/applications')
        .then(response => response.json())
        .then(data => {
            const applicationList = document.getElementById('allbooks');
            applicationList.innerHTML = ''; // Clear existing book list
            console.log(data);
            applicationList.textContent = JSON.stringify(data); // Display the list as a string
        })
        .catch(error => {
            console.error('Error fetching all applications:', error);
        });
}
