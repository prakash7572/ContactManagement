var url = "/cms/", xhr = new XMLHttpRequest();
const elements = document.getElementsByClassName('span-content');
if (elements.length > 0) {
    elements[0].addEventListener('click', function () {
        document.querySelectorAll('input').forEach(input => input.value = '');
    });
}

function LoadData() {
    try {
        xhr.open('GET', `${url}fetch`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText).Data;
                    let html = '', htmlFav = '';
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].IsFavourite) {
                            htmlFav += `<div class="p-1">
                                   &nbsp;&nbsp;<span>${data[i].FirstName}</span>
                                   <br/>
                                   &nbsp;&nbsp;<span>${data[i].Email}</span>
                                   <span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-close" style="margin-left:111px;font-size:larger;color:red;" data-fav-val="${data[i].IsFavourite}" data-fav="${data[i].ID}" onclick=IsFavourite(this)></i></span>
                                   <br/>
                                   </div>`

                        }
                        html += `<div class="p-1"><i class="fa fa-edit" style="color:#2486db" onclick="GetData('${data[i].ID}')"></i>&nbsp;&nbsp;<span>${data[i].FirstName}</span>
                                 <br/>
                                 <i class="fa fa-close" style="font-size: larger;color: red" onclick="Delete('${data[i].ID}')"></i>&nbsp;&nbsp;<span>${data[i].Email}</span>
                                 <span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa ${data[i].IsFavourite == true ? `fa-star` : `fa-star-o`}" style="margin-left:111px;font-size:larger;color:#ff8100;" data-fav-val="${data[i].IsFavourite}" data-fav="${data[i].ID}" onclick=IsFavourite(this)></i></span>
                                 <br/>
                                 </div>`;

                    }
                    const element = document.querySelector('.div-container');
                    if (element) {
                        element.innerHTML = html;
                    }
                    const e = document.querySelector('.left-container');
                    if (e) {
                        e.innerHTML = htmlFav;
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
function GetData(id) {
    const elements = document.getElementsByClassName('span-content');
    if (elements.length > 0) {
        elements[0].click();
    }
    xhr.open('GET', `${url}Fetch?id=${id}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            const data = response.Data; 
            if (data) {
                var inputs = document.querySelectorAll('form input[type="text"], form input[type="hidden"]');
                inputs.forEach(function (input) {
                    if (data[0][input.name] !== undefined) {
                        input.value = data[0][input.name];
                    }
                });
                var inputID = document.getElementsByName('ID');
                inputID.value = data[0].ID;
               
            }
        } else {
            alert('Request failed with status: ' + xhr.status);
        }
    };

    xhr.onerror = function () {
        alert('Request error');
    };
    xhr.send();
}

if (window.location.pathname == "/cms/cms") {
    LoadData();
}
function IsFavourite(e) {
    try {
        let IsFavourite = e.getAttribute("data-fav-val") == "true" ? false : true;
        let id = e.getAttribute("data-fav");
        e.setAttribute("class", "fa fa-star");
        xhr.open('POST', `${url}favourite?id=${id}&isFavourite=${IsFavourite}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                if (responseData.IsSuccess) {
                    LoadData();
                }
            } else {
                alert('Request failed with status:', xhr.status);
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

function Delete(id) {
    try {

        xhr.open('GET', `${url}Delete?id=${id}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData = JSON.parse(xhr.responseText);
                if (responseData.IsSuccess) {
                    LoadData();
                }
            } else {
                alert('Request failed with status:', xhr.status);
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

function SaveData() {

    try {
        var inputs = document.querySelectorAll('form input[type="text"]'), formData1 = {};
        formData1.ID = document.getElementsByName("ID").value;
        inputs.forEach(function (input) {
            formData1[input.name] = input.value;
        });

        xhr.open('POST', `${url}CmsContact`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText)
                if (data.IsSuccess) {
                    alert(data.Data[0].MESSAGE);
                    document.querySelector('[data-dismiss="modal"]').click();
                    LoadData();
                }
             
            } else {
                alert(xhr.status);
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
