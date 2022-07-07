$('#poderIngresar').click(()=>{
    let c = 123456;
    let m = "romiibettiol@gmail.com";
    if (usuarioMail.value == m && contraseñaUsuario.value == c){
        window.location.href = '../index.html'
        let JSONusuario = JSON.stringify(m);
        let JSONpassword = JSON.stringify(c);
        localStorage.setItem(JSONusuario);
        localStorage.setItem(JSONpassword);
    } else{
        alert("Por favor ingresar bien los datos");
    }
});

//CARRITO

const addToShoppingCartButtons = document.querySelectorAll('.addToCart');
addToShoppingCartButtons.forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', addToCartClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);

const shoppingCartItemsContainer = document.querySelector(
  '.shoppingCartItemsContainer'
);

function addToCartClicked(event) {
  const button = event.target;
  const item = button.closest('.item');

  const itemTitle = item.querySelector('.item-title').textContent;
  const itemPrice = item.querySelector('.item-price').textContent;

  addItemToShoppingCart(itemTitle, itemPrice);
}

function addItemToShoppingCart(itemTitle, itemPrice) {
  const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
    'shoppingCartItemTitle'
  );
  for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      let elementQuantity = elementsTitle[
        i
      ].parentElement.parentElement.parentElement.querySelector(
        '.shoppingCartItemQuantity'
      );
      elementQuantity.value++;
      $('.toast').toast('show');
      updateShoppingCartTotal();
      return;
    }
  }

  const shoppingCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  shoppingCartRow.innerHTML = shoppingCartContent;
  shoppingCartItemsContainer.append(shoppingCartRow);

  shoppingCartRow
    .querySelector('.buttonDelete')
    .addEventListener('click', removeShoppingCartItem);

  shoppingCartRow
    .querySelector('.shoppingCartItemQuantity')
    .addEventListener('change', quantityChanged);

  updateShoppingCartTotal();
}

function updateShoppingCartTotal() {
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

  shoppingCartItems.forEach((shoppingCartItem) => {
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(
      '.shoppingCartItemPrice'
    );
    const shoppingCartItemPrice = Number(
      shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(
      '.shoppingCartItemQuantity'
    );
    const shoppingCartItemQuantity = Number(
      shoppingCartItemQuantityElement.value
    );
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
  });
  shoppingCartTotal.innerHTML = `$${total.toFixed(2)}`;
}

function removeShoppingCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  updateShoppingCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  updateShoppingCartTotal();
}

function comprarButtonClicked() {
  shoppingCartItemsContainer.innerHTML = '';
  updateShoppingCartTotal();
}

//MOSTRAR DATOS Y PRODUCTOS
let miFormulario = document.getElementById("formDatos");
let dat = [];
miFormulario.addEventListener("submit", validarFormulario);

let nombreC = ""
let dniC = ""
let direccionC = ""
let montoCom = ""
let cantidadCuo = ""
let montoFinal = 0
let contenedor;

function mostrarInfo(){
    contenedor = document.createElement("div")
    document.body.appendChild(contenedor);

    let parrafo0 = document.createElement("p");
    // Insertar HTML interno
    nombreC = document.getElementById("nombreCliente")
    parrafo0.innerHTML = ("Nombre:  "+ (nombreC.value) )
    // Añadir el nodo Element como hijo de body
    contenedor.appendChild(parrafo0)

    let parrafo1 = document.createElement("p");
    // Insertar HTML interno
    dniC = document.getElementById("dni")
    parrafo1.innerHTML = ("DNI:  "+ (dniC.value) )
    // Añadir el nodo Element como hijo de body
    contenedor.appendChild(parrafo1)

    let parrafo2 = document.createElement("p");
    // Insertar HTML interno
    direccionC = document.getElementById("direccion")
    parrafo2.innerHTML = ("Direccion:  "+ (direccionC.value) )
    // Añadir el nodo Element como hijo de body
    contenedor.appendChild(parrafo2)

    let parrafo3 = document.createElement("p");
    // Insertar HTML interno
    montoCom = document.getElementById("montoTotal")
    let monto =parseInt(montoCom.value);
    parrafo3.innerHTML = ("Monto Compra:  "+ (montoCom.value) )
    // Añadir el nodo Element como hijo de body
    contenedor.appendChild(parrafo3)

    let parrafo4 = document.createElement("p");
    // Insertar HTML interno
    cantidadCuo = document.getElementById("cuotas")
    let cantidadCuotas = parseInt(cantidadCuo.value);
    parrafo4.innerHTML = ("Cuotas:  "+ (cantidadCuo.value) )
    // Añadir el nodo Element como hijo de body
    contenedor.appendChild(parrafo4)

    console.log(cantidadCuotas);
    console.log(monto);
    calcularCuotas(cantidadCuotas, monto);
}
function calcularCuotas(cantidadCuotas, montoCom){
    let montoTotalCuo = 0;
    let montoFinal = 0;
    if (cantidadCuotas === 1){
        montoTotalCuo = montoCom;
        montoFinal = montoTotalCuo;
    } else if (cantidadCuotas === 3 ){
        montoTotalCuo= (montoCom*1.05) /3;
        montoFinal = montoTotalCuo *3;
    } else if (cantidadCuotas === 6){
        montoTotalCuo = (montoCom*1.10) /6
        montoFinal = montoTotalCuo*6;
    }

    let calculoCuotas = document.getElementById("calculoCuotas")   
    calculoCuotas.innerHTML = `
    El costo de cada cuota es: ${montoTotalCuo.toFixed(2)}
    <br>
    <br>
    El costo final es ${montoFinal.toFixed(2)}
    `
    contenedor.appendChild(calculoCuotas)
}

function validarFormulario(e){
    e.preventDefault();
    let formDatos = e.target
    nombreC = formDatos.children[0].value;
    direccionC = formDatos.children[1].value
    montoCom = formDatos.children[2].value;
    cantidadCuo = formDatos.children[3].value;

    dat = dat.concat(listo);
    mostrarArray(listo);
    return listo
}