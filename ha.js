
var list = []
var sum  = 0
function fetchProduct() {
    return fetch(`https://dummyjson.com/products`)
    .then((res) => res.json());
  }
  
  
  function updateProduct() {
    const parent = $("#parent")
    for(var i=0; i <= list.products.length; i++ ){
        var current = list.products[i]
        current.anzahl = 1
        parent.append(`
            <div class="col" style="padding:5px 10px 5px 0px">
                <div class="card h-100">
                    <img src="${current.images[0]}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <p id="p${i}${i}" class="card-title">${current.title}</p>
                        <span >${current.price}€</span>
                        <p class="card-text" style="border:solid 1px;width:max-content;display:flex;justify-content:space-between;align-items:start">
                            <div>
                                <span onclick="anzahl(false,${current.id})" style="background-color:cyan;cursor:pointer;padding:5px;">-</span>
                                <span id="anzahl${current.id}" style="padding:5px 0px 5px 0px">${current.anzahl}</span>
                                <span onclick="anzahl(true,${current.id})" style="background-color:cyan;padding:5px;cursor:pointer;">+</span>
                                <p class="desc" data-bs-toggle="modal" data-bs-target="#exampleModal${current.id}">
                                    ${current.description.substring(0,35)}...
                                </p>
                            </div>
                            <button onclick="addprod(${current.id})" style="float:left;background-color:cyan;border-radius:8px;padding:5px;border:none">Zum Warenkorb hinzufügen</button>

                        </p>
                    </div>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="exampleModal${current.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Talal war hier!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img style="object-fit:contain;height:200px;width:200px" src="${current.images[0]}" class="card-img-top" alt="..."><br><br>
                            Rabatt: ${current.discountPercentage}%<br>
                            Bewertung: ${current.rating}%<br>
                            Anzahl: ${current.stock}<br>
                            Marke: ${current.brand}
                            <br><br>
                            ${current.description}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        `)
    } 
  }

  function createnewcart(){
    $("#cartcontent").empty();
    for(var i=0; i< mycart.length;i++){
        var current = mycart[i]
        $("#cartcontent").append(`
            <div class="card" style="text-align:start;width:max-content">
                <div class="card-body">
                <img style="width:100px;height:100px" src="${current.images[0]}">
                <br>
                Titel: ${current.title}
                <br>
                Preis: ${current.price * current.anzahl}€
                <br><br>
                <span onclick="anzahl(false,${current.id})" style="background-color:cyan;cursor:pointer;padding:5px;">-</span>
                <span id="anzahl${current.id}" style="padding:5px 0px 5px 0px">${current.anzahl}</span>
                <span onclick="anzahl(true,${current.id})" style="background-color:cyan;padding:5px;cursor:pointer;">+</span>
                <br><br>
                <button onclick="removeprod(${current.id});">Löschen</button>
                </div>
            </div>
        `)
    }
    cal();
  }

  function anzahl(bool,id){
    for(var i=0; i< list.products.length;i++){
        var current = list.products[i]
        if(current.id == id){
            if(!bool && current.anzahl > 1) {
                current.anzahl--
                $("#anzahl"+id).html(current.anzahl)
            }
            if(bool) {
                current.anzahl++
                $("#anzahl"+id).html(current.anzahl)
            }
        }
    }
    createnewcart();
    
  }

fetchProduct()
.then((product) => {
    list = product
    updateProduct();
})

var mycart = []

function addprod(id){
    if(mycart.length >= 1){
        for(var x=0; x < mycart.length;x++){
            var currentcart = mycart[x]
            if(currentcart.id == id){
                currentcart.anzahl++
                createnewcart();
                return;
            }
        }
    }

    for(var i=0; i< list.products.length;i++){
        var current = list.products[i]
        if(current.id == id){
            mycart.push(current)
        }
    }

    createnewcart();

}

function removeprod(id){
    for(var i=0; i< mycart.length;i++){
        var current = mycart[i]
        if(current.id == id){
            mycart.splice( i , 1 );
        }
    }
    createnewcart();
}

function cal(){
    var sum2 = 0
    for(var i=0; i< mycart.length;i++){
        var current = mycart[i]
        sum2 += current.price * current.anzahl;
    }
    sum = sum2
    $("#sum").html("Summe: "+sum+"€")
}

  
    
  