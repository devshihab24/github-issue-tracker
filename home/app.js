// variable declaration section 
const allCategoryBtns = document.querySelectorAll(".category-btn")

allCategoryBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        console.log(btn, "clicked");
        removeActiveClass()
        btn.classList.add('btn-primary')
    })
})

function removeActiveClass(){
    allCategoryBtns.forEach(btn=>{
        btn.classList.remove('btn-primary')
    })
}