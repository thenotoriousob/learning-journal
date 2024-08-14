import { renderHomePage } from "./home-page.js";
import { renderAboutMeSection } from "./about-me-page.js";
import { renderArticles } from "./articles.js";
import { renderMainArticle } from "./main-article.js";
import { renderSelectedArticle } from "./selected-article.js";

const mainContentEl = document.getElementById("main-content");
const navListEl = document.querySelector(".main-nav-list");
const articlesContentEl = document.getElementById("articles")

// For smaller screens just open with 3 additional blogs, otherwise 6
let noOfArticles = window.innerWidth > 500 ? 6 : 3;
// The recent posts text shouldn't display on the home page, but display on all other pages
let displayRecentPostText = false;

document.addEventListener("click", (e) => {

    if (e.target.classList.contains("view-more-btn")) {
        e.preventDefault();

        /* When the view more articles link is pressed, show 3 more */
        noOfArticles += 3;

        renderArticleContent(false);
    }
    else if (e.target.id === "home") {
        displayRecentPostText = false;

        renderMainContent(renderHomePage())
    }
    else if (e.target.id === "about-me") {
        displayRecentPostText = true;

        renderMainContent(renderAboutMeSection());
    }
    else if (e.target.id === "main-article") {
        displayRecentPostText = true;

        renderMainContent(renderMainArticle());
    }
    else if (e.target.dataset.articleId) {
        displayRecentPostText = true;

        renderMainContent(renderSelectedArticle(e.target.dataset.articleId));
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


function showMenu() {
    if (navListEl.style.display === "block") {
        navListEl.style.display = "none";
    } else {
        navListEl.style.display = "block";
    };
};

function renderMainContent(mainContent) {
    mainContentEl.innerHTML = mainContent;

    renderArticleContent(true);
};

function renderArticleContent(scrollToTop) {
    articlesContentEl.innerHTML = renderArticles(noOfArticles, displayRecentPostText);

    if (scrollToTop) {
        scroll(0,0);
    };
};

renderMainContent(renderHomePage());
