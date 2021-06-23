let cart = [];
let modalQtd = 1;
let modalKey = 0

//reduzindo o .querySelector para c
const c = (el) => {
    return document.querySelector(el)
}

//reduzindo o .querySelectorAll para cAll
const cS = (el) => {
    return document.querySelectorAll(el)
}

//mapeando cada item do array e criando um novo item do pizza-item
pizzaJson.map((item, index) => {
    let pizzaItem = c(".models .pizza-item").cloneNode(true);
    //prencher as informações em pizzaitem;

    pizzaItem.setAttribute("data-key", index);
    pizzaItem.querySelector(".pizza-item--img img").src = item.img;
    pizzaItem.querySelector(".pizza-item--price").innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector(".pizza-item--name").innerHTML = item.name;
    pizzaItem.querySelector(".pizza-item--desc").innerHTML = item.description;
    //clicando em cada pizza para aparecer o modal
    pizzaItem.querySelector("a").addEventListener("click", (e) => {
        e.preventDefault();

        //traz o item html que foi clicado em cima procurando o pizza-item mais proximo pegando o key dele que foi atribuido
        let key = e.target.closest(".pizza-item").getAttribute("data-key");
        console.log(pizzaJson[key]);

        modalQtd = 1
        modalKey = key;

        c(".pizzaBig img").src = pizzaJson[key].img;
        c(".pizzaInfo h1").innerHTML = pizzaJson[key].name;
        c(".pizzaInfo--desc").innerHTML = pizzaJson[key].description;
        c(".pizzaInfo--actualPrice").innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c(".pizzaInfo--size.selected").classList.remove("selected");
        cS(".pizzaInfo--size").forEach((size, sizeIndex) => {
            if(sizeIndex == 2 ){
                size.classList.add("selected")
            }
            size.querySelector("span").innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        c(".pizzaInfo--qt").innerHTML = modalQtd;

        c(".pizzaWindowArea").style.opacity = 0;
        c(".pizzaWindowArea").style.display = "flex";
        setTimeout(() => {
            c(".pizzaWindowArea").style.opacity = 1;
        }, 200)

    })

    c(".pizza-area").append(pizzaItem);
});

c(".pizzaInfo--qtmenos").addEventListener("click", () => {
    
    if(modalQtd > 1){
        modalQtd--;
        c(".pizzaInfo--qt").innerHTML = modalQtd;
    }
    
});
c(".pizzaInfo--qtmais").addEventListener("click", () => {
    modalQtd++;
    c(".pizzaInfo--qt").innerHTML = modalQtd;
});


function closeModal() {
    c(".pizzaWindowArea").style.opacity = 0;
    setTimeout(() => {
        c(".pizzaWindowArea").style.display= "none";
    }, 500) 
}

cS(".pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton").forEach((item) => {
    item.addEventListener("click", closeModal)
});

cS(".pizzaInfo--size").forEach((size, sizeIndex) => {
    size.addEventListener("click", (e) => {
        c(".pizzaInfo--size.selected").classList.remove("selected");
        size.classList.add("selected");
    })
});

c(".pizzaInfo--addButton").addEventListener("click", () => {
    //qual a pizza 
    console.log("qual é a pizza " + modalKey )
    // alert("qual é a pizza " + modalKey )

    // qual o tamanho selecionado
    let size = parseInt(c(".pizzaInfo--size.selected").getAttribute("data-key"));
    console.log("tamanho " + size)
    // quantas pizzas vao ser adicionadas
    console.log("quantidade " + modalQtd)
    
    let identifier = pizzaJson[modalKey].id+"@"+size;

    let key = cart.findIndex((item) =>{
        return item.identifier == identifier
    })

    if(key > -1) {
        cart[key].qt += modalQtd;
    }
    else{
        cart.push({
            id: identifier,
            size: size,
            qt: modalQtd
        });
    }

    closeModal();
    updateCart();

});


function updateCart() {
    if(cart.length > 0){
        c("aside").classList.add("show");
        c(".cart").innerHTML = "";

        for(let i in cart){
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);

            let cartItem = c(".models .cart--item").cloneNode(true);
            c(".cart").append(cartItem);
            
            // cartItem.querySelector("img").src = pizzaItem.img;


        }
    }
    else{
        c("aside").classList.remove("show");
    }
}

// pizzaJson.map((item) => item.name);