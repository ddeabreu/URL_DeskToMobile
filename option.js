function restaurerLesOptions()//resélectionner les options déja choisies
{
document.getElementById('nom').value=localStorage['nom'];//remplissage du champs de nom
var couleur = localStorage['couleur'];//sélection de la liste déroulante de couleur (un peu plus dur)
if (!couleur){
	return;
	}
var choix = document.getElementById('couleur').getElementsByTagName('option');
for (var i = 0; i < choix.length; i++)
	{
	if (choix[i].value == couleur)
		{
		choix[i].selected = "true";
		break;
		}
	}
}

function enregistrer(){//enregistrer les options, fonction appelée par le click sur le bouton
	localStorage['nom']=document.getElementById('nom').value;
	localStorage['couleur']=document.getElementById('couleur').value;
	console.log('enregistrement du nom: '+localStorage['nom']+' et la couleur de fond: '+localStorage['couleur']);
}

function clickHandler(e) {
  setTimeout(enregistrer, 1000);
}

function main() {
  document.getElementsByTagName('body')[0].style.backgroundColor=localStorage['couleur']; //'grey';//
  restaurerLesOptions();//au chargement de la page, on restaure les options
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', clickHandler);
  main();

});