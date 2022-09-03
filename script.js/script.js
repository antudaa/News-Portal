

// Adding Cetegory Section .
const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCetagory(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNewsCetagory = (newsitems) => {
    // Getting the Cetegory Section By ID .
    const NewsCetegory = document.getElementById('news-cetegory');
    // console.log(NewsCetegory);

    // Creating List Section HTML .
    newsitems.forEach(news => {
        const newsDiv = document.createElement('li');
        // Adding Cetegory .
        newsDiv.innerHTML = `
        <li class="nav-item mx-2">
            <a onclick ="IdNewsCetegory('${news.category_id}')" class="nav-link" aria-current="page" href="#">${news.category_name}</a>
        </li>
        `;

        NewsCetegory.appendChild(newsDiv);
    });
}


const loadingNews = async (cetegoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${cetegoryId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        showNews(data.data);
    } catch (error) {
        console.log(error);
    }
}

const showNews = (id) => {
    const cardSection = document.getElementById("news-section");

    const numberOfResults = document.getElementById('number-of-result');
    if (id.length == 0) {
        numberOfResults.value = `No Data Found For This Cetegory.`;
        // Stopping Toogle Spinner.
        toogleSpinner(false);
    } else {
        numberOfResults.value = `${id.length} Items Found In This Cetegory`;
    }


    cardSection.innerHTML = ''

    // Nothing Fond Warning....
    const nothingFond = document.getElementById("warning-msg");
    if (id.length <= 0) {
        nothingFond.classList.remove('d-none');
    } else {
        nothingFond.classList.add("d-none");
    }

    id.forEach(newsCard => {
        const cardDiv = document.createElement('div');

        cardDiv.innerHTML = `
        <div class="card mb-3" >
            <div class="row g-0">
                <div class="col-md-4">
                    <img  src="${newsCard.image_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${newsCard.title}</h5>
                        <p class="card-text">${newsCard.details.slice(0, 200)}</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        <div class="d-lg-flex  justify-content-evenly align-items-center">
                            <div class="d-flex justify-content-between">
                                <img style="width : 50px; height: 50px; border-radius : 47% 53% 48% 52% / 50% 50% 50% 50% "
                                    src="${newsCard.author.img}" alt="">
                                <div class="mx-4">
                                    <h6>${newsCard.author.name ? newsCard.author.name : "No Name Found."}</h6>
                                    <h6>${newsCard.author.published_date}</h6>
                                </div>
                            </div>
                            <div class="d-flex my-2">
                                <i class="fa-solid fa-eye"></i>
                                <h6 class="mx-3">${newsCard.total_view ? newsCard.total_view : "No View."}</h6>
                            </div>
                            <div class="d-flex my-2">
                                <!-- Rating Stars. -->
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div class="mt-2">
                                <!-- More Details Modal -->
                                <button onclick = "details('${newsCard._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class = "btn bg-info"><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardSection.appendChild(cardDiv);
        // Toolge Sinner .
        toogleSpinner(false);

    })

}

const IdNewsCetegory = (id) => {
    // Toogle Spinner .
    toogleSpinner(true);
    loadingNews(id);
}


// Modal
const details = async (id) => {
    // Spinner
    toogleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);

}
// News Details ...
const displayDetails = d => {
    const detailCard = document.getElementById('detail-card');
    detailCard.innerHTML = '';
    d.forEach(detail => {


        const title = document.createElement('div');
        title.innerHTML = `
        <div class="card text-center">
            <div class="card-header bg-black text-white">
                ${detail.title}
            </div>
            <div class="card-body">
                <div class = "d-flex justify-content-evenly align-items-center">
                    <h5 class="card-title">Author : </h5>
                    <h6>${detail.author.name ? detail.author.name : "No Name Found."}</h6>
                </div>
                <p class="card-text">${detail.details.slice(0, 250)}</p>
                
            </div>
            <div class="d-flex my-2 justify-content-center">
                <!-- Rating Stars. -->
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star"></i>
            </div>
        </div>
        `
        detailCard.appendChild(title);
        // Spinner
        toogleSpinner(false);
    })
}


// Spinner 
const toogleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading");
    if (isLoading) {
        loadingSpinner.classList.remove('d-none');
    }
    else {
        loadingSpinner.classList.add('d-none');
    }
}

loadPhones();

// loadingNews("05");