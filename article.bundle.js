/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/assets/javascripts/article.js ***!
  \*******************************************/
const articlesContainer = document.querySelector(".articles-container");
const fetchArticles = async () => {
  try {
    const response = await fetch("https://restapi.fr/api/articleOdilon");
    if (response.ok) {
      let data = await response.json();
      createArticle(data);
    }
  } catch (e) {
    console.log("erreur :", e);
  }
};
fetchArticles();
const createArticle = data => {
  /*on vide le container d'articles avant d'inserer de nouveau articles
   afin d'eviter que les articles se repeter*/
  articlesContainer.innerHTML = "";
  if (data._id !== undefined) {
    const article = document.createElement("div");
    article.classList.add("article");
    article.innerHTML = ` 
            <img
                src=${data.image || data.img}
                alt="profil"
            />
            <h2>${data.title}</h2>
            <p class="article-author">
                ${data.author} - ${data.category}
            </p>
            <p class="article-content">
            ${data.content}
            </p>
            <div class="article-action">
                <button class="btn btn-primary">
                    Modifier
                </button>
                <button class="btn btn-danger" 
                  data-id=${data._id}>
                    Supprimer
                </button>
            </div>
            `;
    articlesContainer.append(article);
  } else if (data.length !== 0) {
    const tabArticles = data.map(element => {
      const article = document.createElement("div");
      article.classList.add("article");
      article.innerHTML = `  
            <img
              src=${element.image}
              alt="profil"
            />
            <h2>${element.title}</h2>
            <p class="article-author">
                ${element.author} - ${element.category}
            </p>
            <p class="article-content">
            ${element.content}
            </p>
            <div class="article-action">
              <button class="btn btn-primary">Modifier</button
              ><button class="btn btn-danger" data-id=${element._id}>Supprimer</button>
            </div>

            `;
      return article;
    });
    tabArticles.forEach(element => {
      console.log(element);
    });
    articlesContainer.append(...tabArticles);
  }
  const btnDanger = articlesContainer.querySelectorAll(".btn-danger");
  btnDanger.forEach(element => {
    element.addEventListener("click", async event => {
      const id = event.target.dataset.id;
      console.log("id :", id);
      try {
        const response = await fetch(`https://restapi.fr/api/articleOdilon/${id}`, {
          method: "DELETE"
        });
        console.log("response :", response.ok);
        if (response.ok) {
          fetchArticles();
        }
      } catch (e) {
        console.log(e);
      }
    });
  });
};
/******/ })()
;
//# sourceMappingURL=article.bundle.js.map