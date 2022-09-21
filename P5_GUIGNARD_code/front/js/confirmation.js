// Recupère les données et affiche le numéro de commande 
// On crée une 
const params = new URL(document.location).searchParams;
const orderId = params.get("orderId");
document.getElementById("orderId").textContent = orderId;
alert("Commande effectuée avec succès");
