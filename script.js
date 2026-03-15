// script.js

// Function to load CSV dataset from GitHub repository
function loadCSV() {

fetch("sample_dataset.csv")

.then(function(response) {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.text();
})

.then(function(data) {

    // Split CSV into rows
    const rows = data.trim().split("\n");

    // Remove header row
    const header = rows.shift();

    let tableContent = "";

    rows.forEach(function(row, index) {

        const cols = row.split(",");

        if(cols.length < 5) return;

        tableContent += `
        <tr style="animation-delay:${index*0.2}s">
            <td>${cols[0]}</td>
            <td>${cols[1]}</td>
            <td>${cols[2]}</td>
            <td>${cols[3]}</td>
            <td>${cols[4]}</td>
        </tr>
        `;

    });

    const tableBody = document.getElementById("results-table-body");

    if(tableBody){
        tableBody.innerHTML = tableContent;
    }

})

.catch(function(error) {
    console.error("Error loading CSV file:", error);
});

}


// Function to download table results as CSV
function downloadCSV() {

let csv = [];
const rows = document.querySelectorAll("table tr");

rows.forEach(function(row){
    const cols = row.querySelectorAll("td, th");

    let rowData = [];

    cols.forEach(function(col){
        rowData.push(col.innerText);
    });

    csv.push(rowData.join(","));
});

const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });

const downloadLink = document.createElement("a");

downloadLink.download = "model_performance_results.csv";

downloadLink.href = window.URL.createObjectURL(csvFile);

downloadLink.style.display = "none";

document.body.appendChild(downloadLink);

downloadLink.click();

document.body.removeChild(downloadLink);

}


// Function to print table as PDF
function printTable() {

const date = new Date();
const dateString = date.toLocaleString();

const dateContainer = document.getElementById("print-date");

if(dateContainer){
    dateContainer.textContent = "Printed on: " + dateString;
}

window.print();

}


// Load CSV automatically when page opens
window.onload = function(){
    loadCSV();
};