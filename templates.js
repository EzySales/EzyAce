// ==============================
// COPY TEMPLATE
// ==============================

function copyTemplate(button){

    const card = button.closest(".card");

    const text = card.querySelector("textarea").value;

    navigator.clipboard.writeText(text);

    showToast("✅ Template copied successfully!");

}


// ==============================
// TOAST
// ==============================

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}



// ==============================
// SEARCH
// ==============================

const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup",function(){

    const keyword = this.value.toLowerCase();

    document.querySelectorAll(".card").forEach(card=>{

        const text = card.innerText.toLowerCase();

        if(text.includes(keyword))

            card.style.display="block";

        else

            card.style.display="none";

    });

});



// ==============================
// CATEGORY FILTER
// ==============================

function filterCards(category){

    document.querySelectorAll(".category").forEach(btn=>{

        btn.classList.remove("active");

    });

    event.target.classList.add("active");

    document.querySelectorAll(".card").forEach(card=>{

        if(category==="all"){

            card.style.display="block";

            return;

        }

        const types=card.dataset.category;

        if(types.includes(category))

            card.style.display="block";

        else

            card.style.display="none";

    });

}
