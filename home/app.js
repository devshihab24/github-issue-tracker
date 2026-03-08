// variable declaration section
const allCategoryBtns = document.querySelectorAll(".category-btn");
const cardsContainer = document.getElementById("cards-container");
let issueCount = document.getElementById("issue-count");

// active button functionality
allCategoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // console.log(btn, "clicked");
    removeActiveClass();
    btn.classList.add("btn-primary");
  });
  loadIssues();
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
  let categoryData = data.data
  if(status !== "all"){
    categoryData = data.data.filter(item=>item.status === status)
  }
  displayIssuesData(categoryData);
}

// display loaded data on ui
const displayIssuesData = (issues) => {
    cardsContainer.innerHTML = ''
  issueCount.innerText = `${issues.length} Issues`;
  issues.forEach((issue) => {
    // console.log(issue);
    const div = document.createElement("div");
    div.className = `issue-card shadow-md ${issue.status == "open" ? "border-[#00A96E] border-t-4 border-t-[#00A96E]" : "border-[#A855F7] border-t-4 border-t-[#A855F7]"} p-4 rounded-md space-y-3`;
    let badgeKind = null;
    if (issue.priority.toLowerCase() == "low") badgeKind = "badge-primary";
    else if (issue.priority.toLowerCase() == "medium")
      badgeKind = "badge-warning";
    else badgeKind = "badge-error";

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

function labelBadge(labels) {
  const badge = labels.map(
    (label) =>
      `<div class="badge badge-soft badge-error uppercase line-clamp-1">${label}</div>`,
  );
  return badge.join(" ");
}

loadIssues();
