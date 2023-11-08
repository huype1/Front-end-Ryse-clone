//thanh navigation
function myFunction() {
  var x = document.getElementById("navigation");
  if (x.className === "nav-bar") {
    x.className += " responsive";
  } else {
    x.className = "nav-bar";
  }
}
function cash() {
  let cart = JSON.parse(localStorage.getItem("productInCart"));
  if (cart) {
    window.alert('Thanh toán thành công');
    xoatatca();
    window.location.replace('index.html');
  }
  else {
    window.alert("Giỏ hàng trống, hãy thêm sản phẩm vào");
  }
  
}
function xoatatca() {
  document.querySelector(".item-in").innerHTML = ``;
  localStorage.removeItem("productInCart");
  localStorage.setItem('total', 0);
  localStorage.setItem('cartNumber', 0);
  displayCart();
  loadCart();
  
}
function checkdiscount() {
  let cost = Number(localStorage.getItem('total'));
  
  document.getElementById("checksale").addEventListener('click', () => {
    let x = document.getElementById("discount").value;
    if(x.toUpperCase() === "DADDY") {
      localStorage.setItem('total', cost - (cost*20/100));
      window.alert("App mã giảm giá thành công: giảm 20%");
      displayCart();
      document.getElementById("discount").style.display = "none";
      document.getElementById("checksale").style.display = "none";
    }
    else if(x.toUpperCase() === "SEGAY") {
      localStorage.setItem('total', cost - (cost*10/100));
      window.alert("App mã giảm giá thành công: giảm 10%");
      displayCart();
      document.getElementById("discount").style.display = "none";
      document.getElementById("checksale").style.display = "none";
    }
    else {
      window.alert("Mã giảm giá không hợp lệ.");
    }
  });

  

}
//tăng số sản phẩm trong giỏ hàng
function increase(name) {
  let cartItems = JSON.parse(localStorage.getItem("productInCart"));
  Object.values(cartItems).forEach(item =>  {
  if(item.name == name) {
      item.inCart += 1;
      total(item);
      cartNumber(item);
  }
  });
  localStorage.setItem("productInCart", JSON.stringify(cartItems));
  displayCart();
}
//giảm số sản phẩm trong giỏ hàng
function decrease(name) {
  let cartItems = JSON.parse(localStorage.getItem("productInCart"));
  let cost = localStorage.getItem('total');
  let productNumbers = localStorage.getItem('cartNumber');
  productNumbers = parseInt(productNumbers);
  Object.values(cartItems).forEach(item =>  {
  if(item.name == name && item.inCart > 0) {
      item.inCart -= 1;
      localStorage.setItem('total', cost - item.price);
      localStorage.setItem('cartNumber', productNumbers - 1);
      document.querySelector('.navitem span').innerHTML = productNumbers - 1;
      
  }
  });
  localStorage.setItem("productInCart", JSON.stringify(cartItems));
  displayCart();
}
//hiển thị giỏ hàng và tổng tiền sau khi thêm sản phẩm
function displayCart() {
  let cartItems = localStorage.getItem("productInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".item-in");
  let cashout = document.querySelector(".cartTotal");
  let cost = localStorage.getItem('total');
  let final = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cost);
  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
        
        productContainer.innerHTML += `
        <div class="item-in">
          
          <div class="product-name" style="padding= 50px 100px;">
              <img src="./photo/${item.img}" class="cart-img">
              <span> ${item.name} </span> 
          </div>
          
          <div class="product-price">${item.price}</div>
          
          <div class="product-quantity">
              <a onclick="increase('${item.name}')"><i class="fa fa-plus-circle" aria-hidden="true"></i></a>
              <span>${item.inCart}</span>
              <a onclick="decrease('${item.name}')"><i class="fa fa-minus-circle" aria-hidden="true"></i></a>
          </div>
          
          <div class="total">
              ${Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.inCart * item.price)}
          </div>
            
        </div>
        `
  });
  } 
  if(cashout) {
    cashout.innerHTML = '';
    cashout.innerHTML += `
      <h2>Tổng hóa đơn</h2>
      <h2>: ${final}</h2>

      `
  }
  
}

//thêm vào giỏ hàng
let carts = document.querySelectorAll('.add-cart');

//chuyển data để gán dữ liệu khi thêm giỏ hàng
let products = [
  {
    name: "BCAA + EAA",
    tag: "bcaa-eaa",
    price: 860000,
    inCart: 0,
    img: "bcaaeaa.webp",
  },
  {
    name: "Blackout: PreWorkout",
    tag: "Blackout",
    price: 1230000,
    inCart: 0,
    img: "blackout.webp",
  },
  {
    name: "Loaded Creatine",
    tag: "Creatine",
    price: 990000,
    inCart: 0,
    img: "loaded_creatine.webp",
  },
  {
    name: "Fat burner",
    tag: "Fat-burner",
    price: 1480000,
    inCart: 0,
    img: "fatburner.webp",
  },
  {
    name: "Godzilla PreWorkout",
    tag: "Godzilla",
    price: 1400000,
    inCart: 0,
    img: "godzilla_pre.webp",
  },
  {
    name: "Loaded Pre-Workout",
    tag: "Loaded-Pre",
    price: 990000,
    inCart: 0,
    img: "loaded_pre.webp",
  },
  {
    name: "Loaded Protein",
    tag: "Protein",
    price: 1300000,
    inCart: 0,
    img: "loaded_protein.webp",
  },
  {
    name: "PUMP Powder",
    tag: "PUMP",
    price: 1100000,
    inCart: 0,
    img: "pump_powder.webp",
  },
]
//addEventListener cho từng nút thêm
carts.forEach(item => {
  item.addEventListener("click", () => {
    const id = item.id;

    cartNumber(products[id]);  //thêm vào giỏ hàng
    total(products[id]);  //tính tổng tiền
  });
});


function loadCart() { //dung khi reset trang de khong mat so san pham da them
  let productNumbers = localStorage.getItem('cartNumber');
  if (productNumbers) {
    document.querySelector('.navitem span').innerHTML = productNumbers;
  }
}
function cartNumber(product) {

  let productNumbers = localStorage.getItem('cartNumber');
  productNumbers = parseInt(productNumbers); //tu object thanh int
  if (productNumbers) {
    localStorage.setItem('cartNumber', productNumbers + 1);
    document.querySelector('.navitem span').innerHTML = productNumbers + 1;
  }
  else {
    localStorage.setItem('cartNumber', 1);
    document.querySelector('.navitem span').innerHTML = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem('productInCart');
  cartItems = JSON.parse(cartItems);  //JS to JSON
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems, //luu lai nhung du lieu cu
        [product.tag]: product //tao item js moi
      }
    }
    cartItems[product.tag].inCart += 1; 
  }
  else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }


  localStorage.setItem("productInCart", JSON.stringify(cartItems)); //JSON to JS
}

function total(product) {
  //tinh hoa don va luu vao local storage
  let cost = localStorage.getItem('total');
  

  if (cost != null) {
    cost = parseInt(cost);
    localStorage.setItem('total', cost + product.price);
  }
  else {
  
  localStorage.setItem('total', product.price);
  }
}


loadCart();
displayCart();



//nút lọc sản phẩm
var buttonpre = document.getElementById('fpre');
var divspre = document.querySelectorAll('.pre');
var buttonpro = document.getElementById('fpro');
var divspro = document.querySelectorAll('.pro');
var buttonsupp = document.getElementById('fsupp');
var divssupp = document.querySelectorAll('.supp');


buttonpre.addEventListener('click', function () {
  if (divspre[0].style.display === 'none') {
    divspre.forEach(function (div) {
      div.style.display = 'block';
      buttonpre.style.backgroundColor = 'grey';
    });
  }
  else
    divspre.forEach(function (div) {
      div.style.display = 'none';
      buttonpre.style.backgroundColor = 'white';
    });
});

buttonpro.addEventListener('click', function () {
  if (divspro[0].style.display === 'none') {
    divspro.forEach(function (div) {
      div.style.display = 'block';
      buttonpro.style.backgroundColor = 'grey';
    });
  }
  else
    divspro.forEach(function (div) {
      div.style.display = 'none';
      buttonpro.style.backgroundColor = 'white';
    });
});

buttonsupp.addEventListener('click', function () {
  if (divssupp[0].style.display === 'none') {
    divssupp.forEach(function (div) {
      div.style.display = 'block';
      buttonsupp.style.backgroundColor = 'grey';
    });
  }
  else
    divssupp.forEach(function (div) {
      div.style.display = 'none';
      buttonsupp.style.backgroundColor = 'white';
    });
});
