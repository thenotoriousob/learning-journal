import { blogData } from "./blog-data.js";

const mainContentEl = document.getElementById("main-content");
const navListEl = document.querySelector(".main-nav-list");

// For smaller screens just open with 3 additional blogs, otherwise 6
let noOfArticles = window.innerWidth > 500 ? 6 : 3;
// The recent posts text shouldn't display on the home page, but display on all other pages
let displayRecentPostText = false;

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
    else if (e.target.id === "hamburger-menu") {
        showMenu();
    };

});

window.addEventListener("resize", () => {
    /* When the window resizes need to determine which menu style to display */
    if (window.innerWidth > 499) {
        navListEl.style.display = "flex";
    } else {
        navListEl.style.display = "none";
    };
});

const renderHomePage = () => {

    displayRecentPostText = false;

    appendToMainElement("home-page-template");

};

const renderMainArticle = () => {

    displayRecentPostText = true;

    appendToMainElement("main-article-template");

};

const renderAboutMeSection = () => {

    displayRecentPostText = true;

    appendToMainElement("about-me-template");

};

const appendToMainElement = templateId => {

    const templateEl = document.getElementById(templateId);

    let clonedTemplate = templateEl.content.cloneNode(true);

    mainContentEl.innerHTML = "";

    mainContentEl.appendChild(clonedTemplate);

    renderArticles();

    scroll(0,0);

}

const renderSelectedArticle = (articleId) => {

    const templateEl = document.getElementById("selected-article-template");

    /* Load in outer template so we can access the inner template */
    let clonedTemplate = templateEl.content.cloneNode(true);

    mainContentEl.innerHTML = "";

    if (blogData[articleId].coursecontent) {

        const innerTemplateEl = clonedTemplate.getElementById("course-content-template");

        clonedTemplate.querySelector('.topics-title').textContent = "Topics Covered and Solo Projects";

        let clonedInnerTemplate = innerTemplateEl.content.cloneNode(true);

        const listEl = clonedInnerTemplate.querySelector(".course-content-list");

        blogData[articleId].coursecontent.forEach(content => {

            const li = document.createElement("li");
            li.textContent = content;
            listEl.appendChild(li);

        });

        clonedTemplate.querySelector(".container").insertBefore(clonedInnerTemplate,clonedTemplate.querySelector(".projects-container"));

        /* Only do this if the module has solo projects */
        if (blogData[articleId].projects) {

            blogData[articleId].projects.forEach((blog) => {

                const { name, url, img } = blog;
                const innerTemplateEl = clonedTemplate.getElementById("projects-template");

                let clonedInnerTemplate = innerTemplateEl.content.cloneNode(true);

                clonedInnerTemplate.querySelector(".project-links").href = url;
                clonedInnerTemplate.querySelector(".project-title").textContent = name;
                clonedInnerTemplate.querySelector(".project-img").src = img;

                clonedTemplate.querySelector(".projects-container").appendChild(clonedInnerTemplate)

            });

        };

    } else {
        clonedTemplate.querySelector('.topics-title').textContent = "Please come back when I have completed these modules";
    };

    mainContentEl.appendChild(clonedTemplate);

    displayRecentPostText = true;

    renderArticles();

    scroll(0,0);

};

const renderArticles = () => {

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
            clonedInnerTemplate.querySelector('.article-img').alt = alttext;
            clonedInnerTemplate.querySelector('.article-date').textContent = published;
            clonedInnerTemplate.querySelector('.article-title').textContent = title;
            clonedInnerTemplate.querySelector('.article-summary').textContent = summary;

            articleListEl.append(clonedInnerTemplate);

        };

    });

    clonedTemplate.querySelector(".recent-posts").style.display = displayRecentPostText ? "block" : "none";

    articlesContentEl.appendChild(clonedTemplate);

};

function showMenu() {
    if (navListEl.style.display === "block") {
        navListEl.style.display = "none";
    } else {
        navListEl.style.display = "block";
    };
};

renderHomePage();

