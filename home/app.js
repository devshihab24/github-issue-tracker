// variable declaration section
const allCategoryBtns = document.querySelectorAll(".category-btn");
const cardsContainer = document.getElementById("cards-container");
const loader = document.getElementById("loader")
let issueCount = document.getElementById("issue-count");
const issueDetailsModal = document.getElementById('issueDetailsModal')
const modalDetail = document.getElementById('detail')
let badgeKind = null;

// active button functionality
allCategoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn, "clicked");
    removeActiveClass();
    btn.classList.add("btn-primary");
  });
});

function removeActiveClass() {
  allCategoryBtns.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
}

// fetch or load data from api

async function loadIssues() {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayIssuesData(data.data);
}

// load category wise data
async function loadCategoryIssues(status) {

  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  let categoryData = data.data;
  if (status !== "all") {
    categoryData = data.data.filter((item) => item.status === status);
  }
  displayIssuesData(categoryData);
}
// load data based on id and show data on modal
async function loadDetails(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await res.json()
    // console.log(data.data);
    badgeKind = badgeType(data.data)
    modalDetail.innerHTML = `
              <h2 class="text-xl md:text-2xl heading-color font-bold">
                ${data.data.title}
              </h2>
              <div class="flex justify-start items-center gap-5">
                <div class="badge badge-success uppercase text-white">
                  ${data.data.status}
                </div>
                <p class="bullet capitalize">Opened by ${data.data.author.split('_').join(" ")}</p>
                <p class="bullet">${data.data.createdAt.split("T")[0]}</p>
              </div>
              <div class="flex gap-5">
                ${labelBadge(data.data.labels)}
              </div>
              <p class="p-color text-lg">
                ${data.data.description}
              </p>
              <div class="flex items-center bg-[#F8FAFC] rounded-md">
                <div class="w-1/2 p-5">
                  <p class="p-color">Assignee:</p>
                  <h5 class="text-lg font-semibold heading-color capitalize">
                    ${data.data.author.split('_').join(" ")}
                  </h5>
                </div>
                <div class="w-1/2 p-5">
                  <p class="p-color">Priority:</p>
                  <div class="badge ${badgeKind} uppercase text-white">
                    ${data.data.priority}
                  </div>
                </div>
              </div>
    
    `

    issueDetailsModal.showModal()
}

// display loaded data on ui
const displayIssuesData = (issues) => {
  cardsContainer.innerHTML = "";
  issueCount.innerText = `${issues.length} Issues`;
  issues.forEach((issue) => {
    // console.log(issue);
    const div = document.createElement("div");
    // display modal functionality
    div.addEventListener('click', ()=>{
        loadDetails(issue.id)
    })
    div.className = `issue-card hover:shadow-2xl bg-white cursor-pointer shadow-md ${issue.status == "open" ? "border-[#00A96E] border-t-4 border-t-[#00A96E]" : "border-[#A855F7] border-t-4 border-t-[#A855F7]"} p-4 rounded-md space-y-3`;
    badgeKind = badgeType(issue)
    div.innerHTML = `
            <div class="flex justify-between items-center">
              <img src="../assets/Open-Status.png" alt="" />
              <div class="badge badge-soft ${badgeKind}">${issue.priority.toUpperCase()}</div>
            </div>
            <div class=" space-y-2">
              <h3 class="text-xl font-semibold heading-color line-clamp-1">
                ${issue.title}
              </h3>
              <p class="p-color line-clamp-2">
                ${issue.description}
              </p>
              <div class="flex gap-2">
                ${labelBadge(issue.labels)}
              </div>
              <div class="divider"></div>
              <div class="p-color">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt.split("T")[0]}</p>
              </div>
            </div>
    `;

    cardsContainer.append(div);
  });
};
function badgeType(issue){
    
    if (issue.priority.toLowerCase() == "low") return "badge-primary";
    else if (issue.priority.toLowerCase() == "medium")
      return "badge-warning";
    else return "badge-error";
}

function labelBadge(labels) {
  const badge = labels.map(
    (label) =>
      `<div class="badge badge-soft badge-error uppercase line-clamp-1">${label}</div>`,
  );
  return badge.join(" ");
}

// loader functionality

loadIssues();
