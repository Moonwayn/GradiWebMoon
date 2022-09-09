
const formatPrice = { style: 'currency', currency: 'USD' }
const PriceFormatResult = new Intl.NumberFormat('en-US', formatPrice);

const url = "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js"

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

fetch(url)
  .then(res => res.json())
  .then(data => {
    //list data

    const aplication = document.querySelector(".product-title")
    const linkName = document.createElement('a')
    linkName.innerHTML = data.title
    aplication.appendChild(linkName)

    function SetImages(search, img) {

      const query = document.querySelectorAll(search);

      const arrResult = Array.from(query);

      arrResult.forEach(element => element.src = img)

    }
    SetImages(".position-1", data.images[0])
    SetImages(".position-2", data.images[1])
    SetImages(".position-3", data.images[2])
    SetImages(".position-4", data.images[3])

    localStorage.setItem("price", data.price);
    localStorage.setItem("name", data.title)

    const vendor = document.querySelector(".vendor")
    vendor.textContent = "By " + data.vendor

    const productName = document.querySelector(".productName")
    productName.textContent = data.title

    const currentPrice = document.querySelector(".currentPrice")
    currentPrice.textContent = PriceFormatResult.format(data.price)

    const maxPrice = document.querySelector(".maxPrice")
    maxPrice.textContent = PriceFormatResult.format(data.compare_at_price)


    const sizesList = document.querySelector(".sizesList")

    data.variants.reduce((arr, option) => {
      if (!Array.isArray(arr)) return [arr, option]
      if (!arr.find(search => search.option2 == option.option2)) {
        arr.push(option)
      }
      return arr
    }).forEach(size => {
      const sizeItem = document.createElement('li')
      //sizeItem.textContent = size.option2

      sizeItem.innerHTML = '<input type="radio" name="size-demo" id="size' + size.option2 + '" value="' + size.option2 + '" checked /> <label class="itemSize" for="size' + size.option2 + '">' + size.option2 + '</label>'
      sizesList.appendChild(sizeItem)

    })

    const totalprice = document.querySelector(".total-price")
    totalprice.innerHTML = '<p>Total price: <span>' + localStorage.getItem("price") + '</span></p>'

    const quiantities = document.querySelectorAll("[data-quantity]")
    const arrQuantities = Array.from(quiantities)
    arrQuantities.forEach(element => {
      element.addEventListener("click", (e) => {
        const price = localStorage.getItem("price")
        const quantity = document.querySelector("input[name=quantity]")
        const totalPrice = parseInt(price || 0) * parseInt(quantity.value)
        document.querySelector(".total-price p span").innerHTML = PriceFormatResult.format(totalPrice)
        const totalQuantity = quantity.value
        localStorage.setItem("totalPrice", totalPrice)
        console.log(totalQuantity)
        
      })
    })   

    const descriptionText = document.querySelector(".description-text")
    const descriptName = document.createElement('p')
    descriptName.innerHTML = data.description
    descriptionText.appendChild(descriptName)

    document.getElementById("goCart").addEventListener("click", (e) =>{
      const size = document.querySelector("[name=size-demo]:checked").value
      const color = document.querySelector("[name=swatch_demo]:checked").value
      localStorage.setItem("color", color)
      localStorage.setItem("size", size)
      
      modal.style.display = "block";
    })


    const informationTax = document.querySelector(".informationTax")
    informationTax.innerHTML = '<ul><li> Product: '+ localStorage.getItem("name")+'</li><li> Color: '+ localStorage.getItem("color")+'</li><li>Size: '+ localStorage.getItem("size")+'</li><li>Quantity: '+ localStorage.getItem("quantity")+'</li><li>Total price: '+ localStorage.getItem("price")+'</li></ul>'


  })
  .catch(err => console.log(err))

