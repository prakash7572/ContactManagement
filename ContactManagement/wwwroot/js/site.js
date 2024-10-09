var url = "/cms/";
var xhr = new XMLHttpRequest();
var data = [];
function LoadData() {
    try {
        xhr.open('GET', `${url}fetch`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const responseData = JSON.parse(xhr.responseText);
                    if (responseData.IsSuccess) {
                        data = responseData.Data;
                    }

                    let html = '', htmlFav = '';
                    for (let i = 0; i < data.length; i++) {
                        html += `<div class="p-1"><i class="fa fa-edit" style="color:#2486db"></i>&nbsp;&nbsp;<span>${data[i].FirstName}</span>
                                 <br/>
                                 <i class="fa fa-close" style="font-size: larger;color: red"></i>&nbsp;&nbsp;<span>${data[i].Email}</span>
                                 <span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-star-o" style="margin-left:111px;font-size:larger;color:#ff8100;" data-fav-val="${data[i].IsFavourite}" data-fav="${data[i].ID}" onclick=IsFavourite(this)></i></span>
                                 <br/>
                                 </div>`
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

function IsFavourite(e) {
    try {
        let id = e.getAttribute("data-fav");
        let formData = {
            ID: Number(id), IsFavourite: Boolean(e.getAttribute("data-fav-val"))
        };
        xhr.open('POST', `${url}favourite?id=${id}&isFavourite=${IsFavourite}`, true); 
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
        xhr.send();

        const filteredData = data.filter(x => x.ID == id);

        let html = `<div class="p-1">
                                 &nbsp;&nbsp;<span>${filteredData[0].FirstName}</span>
                                 <br/>
                                 &nbsp;&nbsp;<span>${filteredData[0].Email}</span>
                                 <span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa fa-close" style="margin-left:111px;font-size:larger;color:#ff8100;"></i></span>
                                 <br/>
                                 </div>`

        const element = document.querySelector('.left-container');
        if (element) {
            element.innerHTML += html;
        }
        e.getAttribute("class") == "fa fa-star" ? e.setAttribute("class", "fa fa-star-o") : e.setAttribute("class", "fa fa-star");
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