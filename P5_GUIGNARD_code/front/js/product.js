// Récupération de l'ID du produit dans l'API avec la méthode GET
const str = window.location;
const url = new URL(str);
const productId = url.searchParams.get("id");
const objectURL = "http://localhost:3000/api/products/" + productId;

// Ajout d'un produit au panier si (IF) le panier est vide sinon (ELSE) 
function addToCart(productItem) {
  let cartItems = localStorage.getItem("cartItems");

  if (cartItems === null) {
    let items = [productItem];
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  } 
  else {
    // Si le panier contient des produits de même id et même couleur
    let items = JSON.parse(cartItems);
    const resultat = items.find((product) => {
      if (product.id === productItem.id && product.color === productItem.color)
        return true;
      return false;
    });
    if (resultat != undefined) {
      items = items.map((item, index) => {
        if (item.id === productItem.id && item.color === productItem.color) {
          item.quantity += productItem.quantity;
        }
        return item;
      });
    } else {
      // Si le panier contient des produits différents
      items.push(productItem);
    }
    let itemsStr = JSON.stringify(items);
    localStorage.setItem("cartItems", itemsStr);
    alert("Produit ajouté au panier !");
  }
}

// Récupération des produits de l'API
function displayProduct() {
  fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .catch((err) => {
      // Une erreur est survenue
      console.log("erreur");
    })

    // Affichage dans la page product des données du produit
    .then(function (getProduct) {
      const product = getProduct;
    
      let productTitle = document.querySelector("title");
      productTitle.textContent = `${product.name}`;

      let productImg = document.createElement("img");
      document.querySelector(".item__img").appendChild(productImg);
      productImg.setAttribute("src", `${product.imageUrl}`);
      productImg.setAttribute("alt", `${product.altTxt}`);

      let productName = document.getElementById("title");
      productName.textContent = `${product.name}`;

      let productPrice = document.getElementById("price");
      productPrice.textContent = `${product.price}`;

      let productDescription = document.getElementById("description");
      productDescription.textContent = `${product.description}`;
      

      document.querySelector("#colors").insertAdjacentHTML(
        "beforeend",
        product.colors.map(
          (color) =>
            `<option id= "valueColor" value="${color}">${color}</option>`
        )
      );
    
    });

  // Au click sur le bouton commander, vérifie la quantité et la couleur sinon transmet un tableau comprenant l'ID/Couleur/Quantité 
  const cartButton = document.getElementById("addToCart");
  cartButton.addEventListener("click", (event) => {
    event.preventDefault();
    let productColor = document.getElementById("colors").value;
    let productQuantity = parseInt(document.getElementById("quantity").value);

    if (productColor === "") {
      alert("Veuillez sélectionner une couleur");
      return;
    }
    else if (productQuantity === 0) {
      alert("Veuillez renseigner une quantité");
      return;
    }
    
    const productOptions = {
      id: productId,
      color: productColor,
      quantity: productQuantity,
    };
    addToCart(productOptions);
  });
}
displayProduct();
