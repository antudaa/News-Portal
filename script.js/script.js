


const loadPhones = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCetagory(data.data.news_category);
}

const displayNewsCetagory = (newsitems) => {
    const NewsCetegory = document.getElementById('news-cetegory');
    console.log(NewsCetegory);

    newsitems.forEach(news => {
        const newsDiv = document.createElement('li');
        newsDiv.innerHTML = `
        <li class="nav-item mx-3">
            <a class="nav-link" aria-current="page" href="#">${news.category_name}</a>
        </li>
        `;

        NewsCetegory.appendChild(newsDiv);
    });

}
loadPhones();