// Appel à l'API products
displayProducts();
async function getProducts() {
  return await fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    .catch(function (err) {
      // Une erreur est survenue
      console.log(err);
    });
}

// Récupération des données et intégration dans le DOM
async function displayProducts() {
  // Analyse le code source xml/html de la chaine de caractere
  const parser = new DOMParser();
  // On attend le résultat de getProduct qui fetch l'API
  const products = await getProducts();
  // Selection de items dans le html (la ou on injecte les articles plus tard)
  let productsSection = document.getElementById("items");
  // Boucle qui donne une valeur 0 a i, et qui tant que products(l'API) a une valeur plus haute continue a ajouter avec i++
  ///
  for (i = 0; i < products.length; i++) {
    // Ajoute a la variable let les informations contenue dans l'API
    // on a 8 produits la boucle de length
    // i donne le numéro de l'article
    let productsItems = `
      <a href="./product.html?id=${products[i]._id}">
      <article>
      <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
      <h3 class="productName">${products[i].name}</h3>
      <p class="productDescription">${products[i].description}</p>
      </article> 
      </a>`;
      // Methode du DOMParserAnalyse productsItems qui est une chaine HTML et le renvoie en documentHTML
    const displayShop = parser.parseFromString(productsItems, "text/html");
    // Ajoute un noeud comportant l'ensemble de productItems dans productSection (items dans le html)
    productsSection.appendChild(displayShop.body.firstChild);
  };
};