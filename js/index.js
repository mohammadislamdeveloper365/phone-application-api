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
    let searchAllBtn = getElement('phone-store-all-search-btn');
    toggleBodySpinner(true);
    addElementText(container,'',false);
    ele.classList.add('d-none');

    console.log(apiResponse)
    if(apiResponse.length) {
        if(apiResponse.length > 10) {
            apiResponse = apiResponse.slice(0,10);
            searchAllBtn.classList.remove('d-none')
        }

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

        toggleBodySpinner(false);
        toggleButtonSpinner(false);
    }

    else {
        toggleBodySpinner(false);
        toggleButtonSpinner(false);
        ele.classList.remove('d-none');
        
    }
    
}



function searchClickHandler() {
    let inputValue = getElementValue('phone-store-search-input',true);
    let searchAllBtn = getElement('phone-store-all-search-btn');
    searchAllBtn.classList.add('d-none');
    inputValue = inputValue.trim();
    console.log(inputValue);
    toggleButtonSpinner(true);
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

function toggleBodySpinner(isLoading) {
    if(isLoading) {
        getElement('body-spinner').classList.remove('d-none');
    }
    
    else {
        getElement('body-spinner').classList.add('d-none');

    }
    
    
}

function toggleButtonSpinner(isLoading) {
    if(isLoading) {
        getElement('loading-text').classList.remove('d-none');
        getElement('search-text').classList.add('d-none');
        
    }
    
    else {
        getElement('loading-text').classList.add('d-none');
        getElement('search-text').classList.remove('d-none');
    }
}

// function toggleAllButtonSpinner(isLoading) {
//     if(isLoading) {
//         getElement('loading-all-text').classList.remove('d-none');
//         getElement('search-all-text').classList.add('d-none');
        
//     }
    
//     else {
//         getElement('loading-all-text').classList.add('d-none');
//         getElement('search-all-text').classList.remove('d-none');
//     }
// }