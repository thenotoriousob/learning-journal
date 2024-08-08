import { blogData } from "./blog-data.js";

const mainContentEl = document.getElementById("main-content");
const blogsEl = document.getElementById("blogs");

// For smaller screens just open with 3 additional blogs, otherwise 6
let noOfArticles = window.innerWidth > 500 ? 6 : 3;

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("view-more-btn")) {
        e.preventDefault();

        /* When the view more articles link is pressed, show 3 more */
        noOfArticles += 3;

        renderBlogs();
    }
    else if (e.target.id === "home") {
        renderHomePage();
    }
    else if (e.target.id === "about-me") {
        renderAboutMeSection();
    }
    else if (e.target.id === "main-article") {
        renderMainArticle();
    }
    else if (e.target.dataset.articleId) {
        renderSelectedArticle(e.target.dataset.articleId);
    }

});

const renderMainArticle = () => {

    mainContentEl.innerHTML = `
        <div class="container">
            <section>
                <div class="main-article-header-container">
                    <p class="article-date">JULY, 2024</p>
                    <h2 class="article-title">My new journey as a bootcamp student</h2>
                    <p class="article-summary">I started the bootcamp end of June 2024 and I wanted to track what I have learned.</p>
                </div>
                <img class="main-article-img" src="./images/hero.png" alt="">
                <div class="main-article-content-container">
                    <div class="article-content">
                        <h2 class="article-content-header">How I stay committed to learning</h2>
                        <p class="article-content-text">I try and do something at the same time each day so that it becomes routine. </p>
                        <p class="article-content-text">The key difference with Scrimba is that you are writing code from day 1 so you are always getting to put into practice what you are learning. That definitely helps when you are doing a long course, as it would get very boring just watching videos.</p>
                        <h2 class="article-content-header">What are the key benefits of the bootcamp</h2>
                        <p class="article-content-text">For me the main benefits of the bootcamp so far have been the additional solo projects. I think I have built more than 15 already so I am constantly getting to use the skills I have been learning.</p>
                        <p class="article-content-text">And on the back of that getting all of these code reviewed by a mentor. Each one of these gives you tips for taking into your next project so you are constantly improving. Its also good to know that you are on the correct path with things, and any bad habits are picked up straight away</p>
                    </div>
                </div>
            </section>
        </div>
    `;

    renderBlogs(true);

    scroll(0,0);

}

const renderSelectedArticle = (articleId) => {

    let html = "";

    html = `
          <section class="selected-article" id="selected-article">
              <div class="container">
    `;

    /* Only do this if the module has course content, otherwise display message to come back later */
    if (blogData[articleId].coursecontent) {

        html += `
                <h2 class="topics-title">Topics Covered and Solo Projects</h2>
                <ul class="course-content-container">

                `;
        /* Build a list of each of the things taught on the module */
        blogData[articleId].coursecontent.forEach(content => {
            html += `
                    <li>${content}</li>
                    `
        })

        html += `
                </ul>
                `;

        /* Only do this if the module has solo projects */
        if (blogData[articleId].projects) {

            html += `
                    <div class="projects-container">
                    `;

            blogData[articleId].projects.forEach((blog, index) => {

                const { name, url, img } = blog;

                html += `
                        <div class="project">
                            <a class="project-links" href="${url}">
                                <p class="project-title">${name}</p>
                                <img class="project-img" src="${img}" alt="">
                            </a>
                        </div>
                `;

            });

            html += `
                    </div>`

        };

    } else {
        html += `<h2 class="topics-title">Please come back when I have completed these modules</h2>`;
    };

    html += `
                </div>
            </section>
            `;

    mainContentEl.innerHTML = html;

    renderBlogs(true);

    scroll(0,0);

}

const renderAboutMeSection = () => {

    mainContentEl.innerHTML = `
        <section class="about-me-container">
            <div class="container">
                <img class="about-me-avatar" src="./images/mark.jpg" alt="">
                <h2 class="about-me-title">Hey! My name is Mark and welcome to my learning journal.</h2>
                <p class="about-me-content">After years of being a Backend Developer, I've decided to start the Bootcamp to learn Frontend and hopefully start working on both sides. I love learning new things</p>

                <p class="about-me-content">I love travelling and I guess that ties in with the learning journal as part of that I like learning about new cultures. My avatar is a picture of me in Bolivar Square in Bogotá. The best £2 I ever spent! My favourite city is New York (I have been many times but running the marathon was my best experience!), but I have recently been to Buenos Aires and that runs it close. I am going again this year so maybe it will overtake it, haha.</p>

                <p class="about-me-content">Before starting the bootcamp I had been learning Spanish for 4 years. I had burned myself out with that a bit so the Bootcamp is filling the void for a few months whilst I rediscover my motivation :) It needs to be quick as I am going to Argentina in a few months!</p>
            </div>
        </div>
    `;

    renderBlogs(true);

    scroll(0,0);

}

const renderBlogs = (displayRecentPostText) => {

    let html = `${displayRecentPostText ? '<h2 class="recent-posts">Recent posts</h2>' : ''}
                <section class="article-container" id="article-list">`;

    blogData.forEach((blog, index) => {

        if (index < noOfArticles) {
            const { title, image, published, summary, alttext } = blog;

            html += `
                    <article class="article" data-article-id="${index}">
                        <img class="article-img" src="${image}" alt="${alttext}">
                        <p class="article-date">${published}</p>
                        <h2 class="article-title">${title}</h2>
                        <p class="article-summary">${summary}</p>
                    </article>
            `;
        };
    });

    html += `
            </section>
            <div class="view-more-container">
                <button type="button" class="view-more-btn">View more</button>
            </div>
    `;

    blogsEl.innerHTML = html;

    const viewMoreBlogsEl = document.querySelector(".view-more-btn");

    // If there are no more article to display then there is no point displaying the link
    if (noOfArticles >= blogData.length) {
        viewMoreBlogsEl.style.display = "none";
    } else {
        viewMoreBlogsEl.style.display = "inline";
    }
};

const renderHomePage = () => {
    
    mainContentEl.innerHTML = `
        <section class="main-page-hero" id="main-article">
            <div class="container">
                <p class="article-date">JULY 23, 2024</p>
                <h2 class="main-article-title">My new journey as a bootcamp student.</h2>
                <p class="main-article-summary">After several months of learning in the Frontend Developer Career Path, I've made the big jump over to the Bootcamp to get expert code reviews of my Solo Projects projects and meet like-minded peers.</p>
            </div>
        </section>
    `;

    renderBlogs(false);
}

renderHomePage();

