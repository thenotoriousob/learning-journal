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

        renderArticles();
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

    const templateEl = document.getElementById("main-article-template");

    let clonedTemplate = templateEl.content.cloneNode(true);

    mainContentEl.innerHTML = "";

    mainContentEl.appendChild(clonedTemplate);

    renderArticles(true);

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

    renderArticles(true);

    scroll(0,0);

}

const renderAboutMeSection = () => {

    const templateEl = document.getElementById("about-me-template");

    let clonedTemplate = templateEl.content.cloneNode(true);

    mainContentEl.innerHTML = "";

    mainContentEl.appendChild(clonedTemplate);

    renderArticles(true);

    scroll(0,0);

}

const renderArticles = (displayRecentPostText) => {

    const articlesContentEl = document.getElementById("articles")
    const templateEl = document.getElementById("article-template");

    /* Load in outer template so we can access the inner template */
    let clonedTemplate = templateEl.content.cloneNode(true);

    const innerTemplateEl = clonedTemplate.getElementById("article-content-template");
    const articleListEl = clonedTemplate.getElementById('article-list');

    articlesContentEl.innerHTML = "";

    /* For each of the articles create an inner template and append it to the
    article list of the outer template */
    blogData.forEach((blog, index) => {

        if (index < noOfArticles) {

            const { title, image, published, summary, alttext } = blog;

            let clonedInnerTemplate = innerTemplateEl.content.cloneNode(true);

            clonedInnerTemplate.querySelector('.article').dataset.articleId = index;
            clonedInnerTemplate.querySelector('.article-img').src = image;
            clonedInnerTemplate.querySelector('.article-date').textContent = published;
            clonedInnerTemplate.querySelector('.article-title').textContent = title;
            clonedInnerTemplate.querySelector('.article-summary').textContent = summary;

            articleListEl.append(clonedInnerTemplate);

        };

    });

    clonedTemplate.querySelector(".recent-posts").style.display = displayRecentPostText ? "block" : "none";

    articlesContentEl.appendChild(clonedTemplate);

};

const renderHomePage = () => {

    const templateEl = document.getElementById("home-page-template");

    let clonedTemplate = templateEl.content.cloneNode(true);

    mainContentEl.innerHTML = "";

    mainContentEl.appendChild(clonedTemplate);

    renderArticles(false);
};

renderHomePage();

