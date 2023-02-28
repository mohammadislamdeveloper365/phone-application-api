function loadPhones(searchValue,dataLimit) {
    let url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data=>displayPhones(data.data,dataLimit))
}

loadPhones('iphone',10);
addClickListener("phone-store-search-btn",searchHandler);
getElement('phone-store-search-input').addEventListener('keydown',()=>{
    if(event.key === "Enter" ) {
        searchHandler();
    }
})
function displayPhones(apiResponse,dataLimit) {
    let container = getElement("phone-store-container");
    let ele = getElement('error-message');
    toggleBodySpinner(true);
    addElementText(container,'',false);
    ele.classList.add('d-none');

    console.log(apiResponse)
    if(apiResponse.length) {
        if(apiResponse.length > 10 && dataLimit === 10) {
            let searchAllBtn = getElement('phone-store-all-search-btn');
            apiResponse = apiResponse.slice(0,10);
            searchAllBtn.classList.remove('d-none');
            console.log(searchAllBtn)
            addClickListener('phone-store-all-search-btn',searchAllClickHandler);
        }

        for(phone of apiResponse) {
            let phoneCard = createElement('div','col-lg-3','col-md-5','mr-1','mb-5','d-flex','flex-column','align-items-center');
            let phoneName = createElement('p');
            let phoneImageContainer = createElement('div');
            let phoneImage = createElement('img','img-fluid');
            let phoneModalContainer = createElement('div');
            phoneImageContainer.classList.add('mb-1');
            phoneModalContainer.classList.add('mb-3');
            phoneModalContainer.innerHTML = `
            <!-- Button to Open the Modal -->
            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#myModal">
              Phone Details
            </button>
            
            <!-- The Modal -->
            <div class="modal" id="myModal">
              <div class="modal-dialog">
                <div class="modal-content">
            
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title">Brand Name: ${phone.brand}</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
            
                  <!-- Modal body -->
                  <div class="modal-body">
                    Phone Model: ${phone.phone_name}
                    <br/>
                    image link: ${phone.image}
                  </div>
            
                  <!-- Modal footer -->
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  </div>
            
                </div>
              </div>
            </div>
            `
            phoneImage.src = phone.image;
            addElementText(phoneName,phone.phone_name,false);
            phoneImageContainer.append(phoneImage);
            phoneCard.append(phoneName,phoneImageContainer,phoneModalContainer)
            container.append(phoneCard);
        
        }

        toggleBodySpinner(false);
        toggleButtonSpinner(false);
        toggleAllButtonSpinner(false);
    }

    else {
        toggleBodySpinner(false);
        toggleButtonSpinner(false);
        toggleAllButtonSpinner(false);
        ele.classList.remove('d-none');
        
    }
    
}

function processSearch(dataLimit) {
    let inputValue = getElementValue('phone-store-search-input',true);
    inputValue = inputValue.trim();
    console.log(inputValue);
    loadPhones(inputValue,dataLimit)
}

function searchHandler() {
    let searchAllBtn = getElement('phone-store-all-search-btn');
    searchAllBtn.classList.add('d-none');
    toggleButtonSpinner(true);
    processSearch(10);
}


function searchAllClickHandler() {
    toggleAllButtonSpinner(true);
    processSearch();
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

function toggleAllButtonSpinner(isLoading) {
    if(isLoading) {
        getElement('loading-all-text').classList.remove('d-none');
        getElement('search-all-text').classList.add('d-none');
        
    }
    
    else {
        getElement('loading-all-text').classList.add('d-none');
        getElement('search-all-text').classList.remove('d-none');
    }
}