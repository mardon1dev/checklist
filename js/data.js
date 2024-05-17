const foodData = [
    {
        "id": 1,
        src: "./../images/pizza.png",
        name: "Pizza",
        ingredients: ["cheese", "toping"],
        price: 681,
    },
    {
        "id": 2,
        src:"../images/combo.png",
        name:"Pasta",
        ingredients: ["cheese", "toping"],
        price:325
    },
    {
        "id": 3,
        src:"../images/pasta.png",
        name:"Rice",
        ingredients: ["garlic", "toping"],
        price:400
    }
]


function addFood(item) {
    if (!localStorage.getItem('foods')) {
        localStorage.setItem('foods', JSON.stringify(item));
    }
    // let foods = JSON.parse(localStorage.getItem('foods'));
    // if (!foods) {
    //     foods.push(item);
    //     localStorage.setItem('foods', JSON.stringify(foods));
    // }
}

function getAllFood() {
    let foods = JSON.parse(localStorage.getItem('foods'));  

    const foodNumber = document.querySelector(".shopping--subtitle");
    foodNumber.innerHTML = `You have ${foods.length} items in your cart.` 

    const allFoodContainer = document.querySelector(".items");
    foods.forEach(item => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add('item');
        foodDiv.style.display = "flex";
        foodDiv.style.alignItems = "center";
        foodDiv.style.justifyContent = "start";

        foodDiv.innerHTML = `
        <img class="item--img" src="${item.src}" alt="Pizza">
        <div class="d-flex align-items-center justify-content-center w-100 flex-column flex-sm-row justify-content-sm-between">
        <div class="item--info">
            <h4 class="item--info--title">${item.name}</h4>
            <p class="item--info--subtitle">Extra ${item.ingredients[0]} and ${item.ingredients[1]}</p>
        </div>
        <div class="d-flex align-items-center gap-sm-1 gap-md-2 gap-2">
            <div class="item--number">
                <input type="number" value="0" min="0" max="99" class="item--count" name="number" data-id=${item.id} data-selected="true    ">
                <div class="item--counter">
                    <img src="./images/top.svg" alt="Top" class="item--count--top">
                    <img src="./images/bottom.svg" alt="Bottom" class="item--count--bottom">
                </div>
            </div>
            <span class="item--price">$${item.price}</span>
            <img class="item--delete" src="./images/delete.svg" alt="Delete" data-id=${item.id}>
        </div>
    </div>
        `;
        allFoodContainer.appendChild(foodDiv);
    });
}
function deleteFood(id) {

    try {
        let foods = JSON.parse(localStorage.getItem('foods'));
        const index = foods.findIndex(item => item.id == id);
        if (index !== -1) {
            foods.splice(index, 1);
            localStorage.setItem('foods', JSON.stringify(foods));
            console.log(foods);
            // getAllFood();
            alert(`Your food is removed from cart.`)
            const foodNumber = document.querySelector(".shopping--subtitle");
            foodNumber.innerHTML = `You have ${foods.length} items in your cart.` 
        } else {
            console.log('Food item not found with ID:', id);
        }
    } catch (error) {
        console.error('An error occurred while deleting food item:', error);
    }
}


document.addEventListener('DOMContentLoaded', function() {


    const inputValue = document.querySelectorAll(".item--count");
    const subtotal = document.querySelector(".subtotal-all");
    const total = document.querySelector(".total--all");
    const checkout = document.querySelector(".checkout--all");
    let subTotal = 0;
    let totalSum = 0;

    inputValue.forEach(input=>{
        input.addEventListener("change",function (e) {
            e.preventDefault()
            let foods = JSON.parse(localStorage.getItem('foods'));
            subTotal = Array.from(inputValue).reduce((acc, input) => {
                let itemId = input.dataset.id;
                let itemIndex = foods.findIndex(item => item.id == itemId);
                if (itemIndex == -1) itemIndex = itemId
                console.log(itemIndex);
                let itemCount = parseInt(input.value) || 0;
                return acc + (itemCount * foods[itemIndex].price);
            }, 0);

            if (subTotal == 0) totalSum = 0
            else totalSum = subTotal + 4;
        
            subtotal.innerText = `$${subTotal}`;
            total.innerText = `$${totalSum}`;
            checkout.innerText = `$${totalSum}`;
        })
    })

    const deleteButtons = document.querySelectorAll('.item--delete');
    deleteButtons.forEach(button => {
        let foods = JSON.parse(localStorage.getItem('foods'));
        button.addEventListener('click', function(event) {
            console.log(foods);
            const foodContent = event.target.closest(".item");
            const input = foodContent.children[1].children[1].children[0].children[0];
            const id = event.target.dataset.id;
            let itemIndex = foods.findIndex(item => item.id == id);
            console.log(foods[itemIndex]);
            let itemCount = parseInt(input.value) || 0;
            let sum = itemCount * foods[itemIndex].price;
            console.log(subTotal);
            console.log(sum);
            // subTotal -= sum;
            let newTotal = subTotal - sum;
            // sum = 0
            if (newTotal == 0) totalSum = 0
            else totalSum = newTotal + 4;

            
            subtotal.innerText =  `$${newTotal}`;
            total.innerText = `$${totalSum}`;
            checkout.innerText = `$${totalSum}`;
            deleteFood(id);
            foodContent.remove();
        });
    });
});

addFood(foodData);
getAllFood();


function all() {
    const allFoodContainer = document.querySelector(".items");
    const button = document.querySelector(".checkout");
    const userName = document.querySelector("#name");
    const cardNumber = document.querySelector("#number");
    const expDate = document.querySelector("#date");
    const cvv = document.querySelector("#cvv");

const validateInputs = () => {
    return userName.value && cardNumber.value && expDate.value && cvv.value;
};

button.addEventListener("click", ()=>{
    if (!validateInputs()) {
        alert('Please fill out all fields');
    }
    else if (!allFoodContainer.innerText){
        alert('Please add items to the cart');
    } else { 
        userName.value="";
        cardNumber.value= "";
        expDate.value ="MM / YY";
        cvv.value= "";
        window.location.href="./payment.html";
        alert("Thank you. Your order will be placed in a few minutes")
    }
})
}
all();