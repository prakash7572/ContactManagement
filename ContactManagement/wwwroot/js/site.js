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
                    let html = '', htmlFav = '';
                    for (let i = 0; i < responseData.Data.length; i++) {
                        html += `<i class="fa fa-edit"><span>${responseData.Data[i].FirstName}</span>
                                 <br/>
                                 <i class="fa fa-trash"></i><span>${responseData.Data[i].Email}</span>
                                 <br/>`
                    }
                    const element = document.querySelector('.div-container'); 
                    if (element) {
                        element.innerHTML = html;
                    }

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