var self = this;
var use = function (users) {
    this.id = ko.observable(users.id);
    this.nomUtilisateur = ko.observable(users.nomUtilisateur);
    this.motDePasse = ko.observable(users.motDePasse);
    this.derniereConnexion = ko.observable(users.derniereConnexion);
};

/* 
 Cette function est le controlleur de la vue  
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi!  
 */
var ViewModelUsers = function (userss) {

    //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.userss = ko.observableArray(ko.utils.arrayMap(userss, function (users) {
        return new use(users);
    }));
};

self.removed = function (users) {
    self.categories.remove(users);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/users/" + users.id(),
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


self.added = function (users) {
    var id = document.getElementById("id").value;
    var nomUtilisateur = document.getElementById("nomUtilisateur").value;
    var motDePasse = document.getElementById("motDePasse").value;

    var JSONObject = {
        "id": id,
        "nomUtilisateur": nomUtilisateur,
        "motDePasse": motDePasse
    };
    
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/users/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(JSONObject),
        dataType: 'JSON'
    })
            .success(function (data) {
                self.userss.update(users);

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));
            });

};
self.updated = function (users) {
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/users/" + users.id(),
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(ko.toJS(livre), null, 2),
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
self.removed = function (users) {
    self.userss.remove(users);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/users/" + users.id(),
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
