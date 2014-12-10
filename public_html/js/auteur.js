var self = this;
var author = function (auteur) {
    this.id = ko.observable(auteur.id);
    this.aProposDe = ko.observable(auteur.aProposDe);
    this.nationalite = ko.observable(auteur.nationalite);
};

/* 
 Cette function est le controlleur de la vue  
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi!  
 */
var ViewModelAuteur = function (auteurs) {

    //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.auteurs = ko.observableArray(ko.utils.arrayMap(auteurs, function (auteur) {
        return new author(auteur);
    }));
};

self.removed = function (auteur) {
    self.categories.remove(auteur);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/auteur/" + auteur.id(),
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        }
    })
            .success(function (data, status, jq) {

                // self.categories.remove(categorie);
            })
            .error(function (jq, status, error) {
                //$(".error").text(JSON.stringify(status + " " + error));
            });
};


self.added = function (auteur) {
    var id = document.getElementById("id").value;
    var nationalite = document.getElementById("nationalite").value;
    var aProposDe = document.getElementById("aProposDe").value;
    var JSONObject = {
        "id": id,
        "aProposDe": aProposDe,
        "nationalite": nationalite
    };
    
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/auteur/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(JSONObject),
        dataType: 'JSON'
    })
            .success(function (data) {
                self.auteurs.update(auteur);

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));
            });

};
self.updated = function (auteur) {
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/auteur/" + auteur.id(),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(ko.toJS(auteur), null, 2),
        headers: {
            Accept: "application/json"
        }
    })
            .success(function (data, status, jq) {

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));

            });
};
self.removed = function (auteur) {
    self.auteurs.remove(auteur);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/auteur/" + auteur.id(),
        type: "DELETE",
        contentType: "application/json",
        headers: {
            Accept: "application/json"
        }
    })
            .success(function (data, status, jq) {

            })
            .error(function (jq, status, error) {
    
            });
};
