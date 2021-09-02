// Global Variable
const inputText = document.getElementById('input');
const displayBook = document.getElementById('show-book');
const bookFound = document.getElementById('book-found');
const spinner = document.getElementById('spinner');
const alert = document.getElementById('alert')
const alert1 = document.getElementById('alert-1')

// onclick function
const searchBook = () => {
    if (inputText.value === '') {
        alert.style.display = 'block'
        alert1.style.display = 'none'
        bookFound.innerHTML = '';
        displayBook.innerHTML = '';
    }
    else {
        getBook(inputText.value);
        spinner.style.display = 'block'
        alert.style.display = 'none'
        alert1.style.display = 'none'
        bookFound.innerHTML = '';
        displayBook.innerHTML = '';
    }
}
// fetch url
const getBook = (search) => {
    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showBook(data))
}
//  display book function

const showBook = books => {
    // condition
    const bookDetails = books.docs;
    if (bookDetails.length === 0) {
        alert1.style.display = 'block'
        spinner.style.display = 'none';
        inputText.value = '';
    }

    else {
        const h3 = document.createElement('h3');
        h3.innerText = `${books.numFound} search results for "${inputText.value}"`;
        bookFound.appendChild(h3);
        inputText.value = '';

        // for each loop for get docs details
        bookDetails?.forEach(book => {
            const div = document.createElement("div");
            div.classList.add("col");
            div.innerHTML = `
                <div class="card  h-100  border-0 rounded-3 shadow books mx-2">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : '10909258'}-M.jpg" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8 ">
                            <div class="card-body">
                                <h5 class="card-title fs-4">${book.title} </h5>
                                <p class="card-text"><span class="fw-bold ">Author :</span> ${book.author_name ? book.author_name : 'not found'}</p>
                                <p class="card-text"><span class="fw-bold ">Publisher :</span> ${book.publisher ? book.publisher : 'not found'}</p>
                                <p class="card-text"><span class="fw-bold ">First publish year :</span> ${book.first_publish_year ? book.first_publish_year : 'not found'}</p>
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

