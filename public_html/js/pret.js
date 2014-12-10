var self = this;
var give = function (pret) {
    this.id = ko.observable(pret.id);
    this.livre = ko.observable(pret.categorie.nom);
    this.user = ko.observable(pret.users.nomUtilisateur);
    this.Duree = ko.observable(pret.Duree);   
};

/* 
 Cette function est le controlleur de la vue  
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi!  
 */
var ViewModelPret = function (prets) {

    //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.livres = ko.observableArray(ko.utils.arrayMap(prets, function (pret) {
        return new give(pret);
    }));
};

self.removed = function (pret) {
    self.prets.remove(pret);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/pret/" + pret.id(),
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


self.added = function (pret) {
    
    this.id = document.getElementById("id").value;
    this.livre = document.getElementById("livre").value;
    this.user = document.getElementById("user").value;
    this.Duree = document.getElementById("Duree").value;  
    
    var JSONObject = {
        "id": id,
        "Duree": Duree 
    };
    
    /*
       "categorie": categorie,
        "publishedDate": publishedDate,
        "ecrit_par": ecrit_par
     */
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/pret/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(JSONObject),
        dataType: 'JSON'
    })
            .success(function (data) {
                self.prets.update(pret);

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));
            });

};
self.updated = function (pret) {
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/pret/" + pret.id(),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(ko.toJS(pret), null, 2),
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
self.removed = function (pret) {
    self.prets.remove(pret);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/pret/" + pret.id(),
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
