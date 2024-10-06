var url = "/cms/";
var xhr = new XMLHttpRequest();

function LoadData() {
    try {
        xhr.open('GET', `${url}fetch`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    alert('Response: ' + responseData);
                } catch (e) {
                    alert('Response: ' + xhr.responseText);
                }
            } else {
                alert('Request failed with status: ' + xhr.status);
            }
        };
        xhr.onerror = function () {
            alert('Request error');
        };
        xhr.send();
    } catch (e) {
        console.log(e);
    }
   
}

LoadData();

function SaveData() {

    try {
        var inputs = document.querySelectorAll('form input[type="text"]'), formData1 = {};
        inputs.forEach(function (input) {
            formData1[input.name] = input.value;
        });

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
        xhr.send(JSON.stringify(formData1));

    } catch (e) {
        console.log(e);

    }
    

    return false;
} 