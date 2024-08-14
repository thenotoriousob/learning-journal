import { blogData } from "./blog-data.js";

export const renderSelectedArticle = (articleId) => {

    let html = `
                <section class="selected-article" id="selected-article">
                    <div class="container">
    `;

    if (blogData[articleId].coursecontent) {

        html += `
                 <h2 class="topics-title">Topics Covered and Solo Projects</h2>
                 <ul class="course-content-list">
        `;

        blogData[articleId].coursecontent.forEach(content => {
            html += `
                    <li>${content}</li>
            `;
        });

        /* Only do this if the module has solo projects */
        if (blogData[articleId].projects) {

            blogData[articleId].projects.forEach((blog) => {

                const { name, url, img } = blog;

                html += `
                        <div class="project">
                            <a class="project-links" href="${url}">
                                <p class="project-title">${name}</p>
                                <img class="project-img" src="${img}" alt="Thumbnail of project">
                            </a>
                        </div>
                `;

            });

        };

    } else {
        html += `
                 <h2 class="topics-title">Please come back when I have completed these modules</h2>
        `;
    };

    html += `
                </div>
            </section>
    `;

    return html;

};
