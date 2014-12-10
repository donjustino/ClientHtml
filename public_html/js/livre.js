var self = this;
var book = function (livre) {
    this.id = ko.observable(livre.id);
    this.titre = ko.observable(livre.titre);
    this.resume = ko.observable(livre.resume);
    this.isbn = ko.observable(livre.isbn);
    this.categorie = ko.observable(livre.categorie);
    this.quantite = ko.observable(livre.quantite);
    this.photo = ko.observable(livre.photo);
    this.publishedDate = ko.observable(livre.publishedDate);
    this.ecrit_par = ko.observable(livre.ecrit_par);
};

/* 
 Cette function est le controlleur de la vue  
 Elle assure la communication entre la vue et le modèle, une sorte de pont quoi!  
 */
var ViewModelLivre = function (livres) {

    //représente la liste des catégories  
    //La fonction prend la réponse obtenue du serveur en paramètre  
    //Ici nous supposons que vous avez chargé la liste des catégories  
    //ko.utils.arrayMap itère sur la collection et pour chaque objet trouvé, elle crée une instance de categorie   
    self.livres = ko.observableArray(ko.utils.arrayMap(livres, function (livre) {
        return new book(livre);
    }));
};

self.removed = function (categorie) {
    self.categories.remove(categorie);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/" + livre.id(),
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


self.added = function (livre) {
    var id = document.getElementById("id").value;
    var titre = document.getElementById("titre").value;
    var resume = document.getElementById("resume").value;
    var isbn = document.getElementById("isbn").value;
    var categorie = document.getElementById("categorie").value;
    var quantite = document.getElementById("quantite").value;
    var photo = document.getElementById("photo").value;
    var publishedDate = document.getElementById("publishedDate").value;
    var ecrit_par = document.getElementById("ecrit_par").value;
    var JSONObject = {
        "titre": titre,
        "id": id,
        "quantite": quantite,
        "resume": resume,
        "isbn": isbn,
        "photo": photo
       
    };
    
    /*
       "categorie": categorie,
        "publishedDate": publishedDate,
        "ecrit_par": ecrit_par
     */
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(JSONObject),
        dataType: 'JSON'
    })
            .success(function (data) {
                self.livres.update(livre);

            })
            .error(function (jq, status, error) {
                $(".error").text(JSON.stringify(status + " " + error));
            });

};
self.updated = function (livre) {
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/" + livre.id(),
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
self.removed = function (livre) {
    self.livres.remove(livre);
    $.ajax({
        url: "http://localhost:8080/bibliotheque_ntdp/webresources/livre/" + livre.id(),
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
