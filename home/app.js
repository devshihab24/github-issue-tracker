// variable declaration section 
const allCategoryBtns = document.querySelectorAll(".category-btn")
const cardsContainer = document.getElementById("cards-container")
let issueCount = document.getElementById("issue-count")

// active button functionality
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

// fetch or load data from api

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayIssuesData(data.data)
}
// display loaded data on ui
const displayIssuesData = (issues)=>{
    console.log(issueCount, issues.length);
    issueCount.innerText = `${issues.length} Issues`
   issues.forEach(issue =>{
    console.log(issue);
     const div = document.createElement('div')
    div.className = `issue-card shadow-md ${issue.status == 'open'? 'border-[#00A96E] border-t-4 border-t-[#00A96E]': 'border-[#A855F7] border-t-4 border-t-[#A855F7]'} p-4 rounded-md space-y-3`
    let badgeKind = null;
    if(issue.priority.toLowerCase() == 'low') badgeKind = "badge-primary";
    else if(issue.priority.toLowerCase() == 'medium') badgeKind = "badge-warning";
    else badgeKind = "badge-error";

    div.innerHTML = `
            <div class="flex justify-between items-center">
              <img src="../assets/Open-Status.png" alt="" />
              <div class="badge badge-soft ${badgeKind}">${issue.priority.toUpperCase()}</div>
            </div>
            <div class=" space-y-2">
              <h3 class="text-xl font-semibold heading-color">
                ${issue.title}
              </h3>
              <p class="p-color line-clamp-2">
                The navigation menu doesn't collapse properly on mobile devices
              </p>
              <div class="flex gap-2">
                <div class="badge badge-soft badge-error"><i class="fa-solid fa-bug"></i>BUG</div>
                <div class="badge badge-soft badge-warning"><i class="fa-solid fa-life-ring"></i>HELP WANTED</div>
              </div>
              <div class="divider"></div>
              <div class="p-color">
                <p>#1by john_doe</p>
                <p>1/15/2024</p>
              </div>
            </div>
    `

    cardsContainer.append(div)
   })
}

loadIssues()