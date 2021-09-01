const inputText = document.getElementById('input');
const displayBook = document.getElementById('show-book');
const bookFound = document.getElementById('book-found');
const spinner = document.getElementById('spinner');
const alart = document.getElementById('alart')
const alart1 = document.getElementById('alart-1')
const searchBook = ()=>{
    if(inputText.value === ''){
        alart.style.display ='block'
        alart1.style.display ='none'
    }
    else{
        getBook(inputText.value);
    spinner.style.display = 'block'
    alart.style.display ='none'
    }
}

const getBook = (search) => {
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data))
}
// getBook('java')

const showBook = books => { 
    // condition
    const bookDetails = books.docs;
    if(bookDetails.length === 0){
        alart1.style.display ='block'
        spinner.style.display = 'none';
        inputText.value = '';
    }

    else{
        const h3 = document.createElement('h3');
    h3.innerText= `${books.numFound} search results for "${inputText.value}"`;
    bookFound.innerHTML = '';
    bookFound.appendChild(h3);
    displayBook.innerHTML = '';
    inputText.value = '';
    // for each loop for get docs details
    bookDetails?.forEach(book => {
        // console.log(book.title);
        const div = document.createElement("div");
        div.classList.add("col");
        div.innerHTML = `
        <div class="card mb-3 h-100" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : '10909258'}-M.jpg" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${book.title} </h5>
                                <p class="card-text">Author : ${book.author_name ? book.author_name : 'not found'}</p>
                                <p class="card-text">Publisher : ${book.publisher ? book.publisher : 'not found'}</p>
                                <p class="card-text">First Publish Year : ${book.first_publish_year ? book.first_publish_year : 'not found'}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
       displayBook.appendChild(div);
       spinner.style.display = 'none';
    });
    }
    
}

