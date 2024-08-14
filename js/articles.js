import { blogData } from "./blog-data.js";

export const renderArticles = (noOfArticles, displayRecentPostText) => {

    let html = `<div class="container">
                  ${displayRecentPostText ? '<h2 class="recent-posts">Recent posts</h2>' : ''}
                  <section class="article-container" id="article-list">
    `;

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
                    </div>
    `;

    return html;
};
