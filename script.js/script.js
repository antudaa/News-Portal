

// Adding Cetegory Section .
const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCetagory(data.data.news_category);
}

const displayNewsCetagory = (newsitems) => {
    // Getting the Cetegory Section By ID .
    const NewsCetegory = document.getElementById('news-cetegory');
    // console.log(NewsCetegory);

    // Creating List Section HTML .
    newsitems.forEach(news => {
        const newsDiv = document.createElement('li');
        newsDiv.innerHTML = `
        <li class="nav-item mx-3">
            <a onclick ="IdNewsCetegory('${news.category_id}')" class="nav-link" aria-current="page" href="#">${news.category_name}</a>
        </li>
        `;

        NewsCetegory.appendChild(newsDiv);
    });
}


const loadingNews = async (cetegoryId) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${cetegoryId}`
    const res = await fetch(url);
    const data = await res.json();
    showNews(data.data);
}

const showNews = (id) => {
    const cardSection = document.getElementById("news-section");
    console.log(id.rating);
    cardSection.innerHTML = ''

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
                                    <h6>${newsCard.author.name}</h6>
                                    <h6>${newsCard.author.published_date}</h6>
                                </div>
                            </div>
                            <div class="d-flex my-2">
                                <i class="fa-solid fa-eye"></i>
                                <h6 class="mx-3">${newsCard.total_view}</h6>
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
                                <button onclick = "details('${newsCard._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class = "btn"><i class="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardSection.appendChild(cardDiv);

    })

}

const IdNewsCetegory = (id) => {
    loadingNews(id);
}


// Modal
const details = async (id) => {
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
                    <h6>${detail.author.name}</h6>
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
    })
}

loadPhones();

// loadingNews("05");