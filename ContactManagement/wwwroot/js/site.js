var url = "/cms/";

function SaveData() {

    var inputs = document.querySelectorAll('form input'),formData = {};
    inputs.forEach(function (input) {
        formData[input.name] = input.value;
    });
    var xhr = new XMLHttpRequest(); 
    xhr.open('POST', `${url}CmsContact`, true); 
    xhr.setRequestHeader('Content-Type', 'application/json');
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
    xhr.send(JSON.stringify(formData)); 

    console.log(formData);

    return false;
} 