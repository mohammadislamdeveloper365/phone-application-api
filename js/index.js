function loadPhones(searchValue) {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>displayPhones(data.data))
}

loadPhones('iphone');
addClickListener("phone-store-search-btn",searchClickHandler);

function displayPhones(apiResponse) {
    let container = getElement("phone-store-container");
    let ele = getElement('error-message');
    addElementText(container,'',false);
    ele.classList.add('d-none');
    console.log(apiResponse)
    if(apiResponse.length) {
        for(phone of apiResponse) {
            let phoneCard = createElement('div','col-lg-3','col-md-5','mr-1','mb-2','d-flex','flex-column','align-items-center');
            let phoneName = createElement('p');
            let phoneImageContainer = createElement('div');
            let phoneImage = createElement('img','img-fluid');
            phoneImage.src = phone.image;
            addElementText(phoneName,phone.phone_name,false);
            phoneImageContainer.append(phoneImage);
            phoneCard.append(phoneName,phoneImageContainer)
            container.append(phoneCard);
        
        }
    }

    else {
        ele.classList.remove('d-none')
    }
    
}

function searchClickHandler() {
    let inputValue = getElementValue('phone-store-search-input',true);
    inputValue = inputValue.trim();
    console.log(inputValue)
    loadPhones(inputValue)
}
function createElement(tagName,...classList) {
    let ele = document.createElement(tagName);
    if(classList) {
        for(let list of classList) {
            ele.classList.add(list);
        }
        return ele;
    }

    else return ele;
}
function addElementText(element,text,isInput) {
    if(isInput)
    element.value = text;
    else element.innerText = text;
}
function getElement(id) {
    return document.getElementById(id);
}

function getElementValue(id,isInput) {
    if(isInput)
    return getElement(id).value;
    else return getElement(id).innerText;
}

function addClickListener(id,callBack) {
    getElement(id).addEventListener('click',callBack);
}

