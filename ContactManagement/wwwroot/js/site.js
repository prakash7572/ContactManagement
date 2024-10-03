
function SaveData() {

    var inputs = document.querySelectorAll('form input');
    var formData = {};
    inputs.forEach(function (input) {
        formData[input.name] = input.value;
    });
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', "", true); 
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            alert('Response:', xhr.responseText); 
        } else {
            alert('Request failed with status:', xhr.status);
        }
    };
    xhr.onerror = function () {
        alert('Request error'); 
    };
    xhr.send(); 

    console.log(formData);

    return false;
} 