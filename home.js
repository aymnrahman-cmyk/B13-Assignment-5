const loadAllIssues=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=> res.json())
    .then(json=> {
            allIssues = json.data; 
            displayIssues(allIssues);
        });
};

let allIssues = [];

const displayIssues= (issues) => {
    const allIssueContainer= document.getElementById("all-issues-container"); 
    allIssueContainer.innerHTML = "";
    document.getElementById("issues-numbers").textContent = issues.length;
// // "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
    //   "updatedAt": "2024-01-15T10:30:00Z"

    for (let issue of issues) {
        const issueDiv = document.createElement("div");
        issueDiv.className = "h-full";
        issueDiv.innerHTML = `
            <div class="issue-card bg-white p-4 rounded space-y-3 m-1 h-full ${issue.status === 'open' ? 'border-t-4 border-green-500' : 'border-t-4 border-purple-500'}">
            <div class="flex justify-between">
                <div class="flex">
                <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="">
                </div>
                <p class="bg-red-300 text-red-600 rounded-full px-3 outline">${issue.priority}</p>
            </div>
            <div class="space-y-3">
                <p class="font-semibold">${issue.title}</p>
                <p class="text-[16px] text-[#64748B]">${issue.description}</p>
            </div>
            <div class="flex space-x-2">
                ${issue.labels.map((label, index) => `<p class="${index % 2 === 0 ? 'bg-red-300 text-red-600' : 'bg-orange-300 text-orange-600'} rounded-full px-3 text-sm w-fit outline">${label.trim()}</p>`).join('')}            
            </div>
            <hr>
            <p class="text-[16px] text-[#64748B]">#1 by ${issue.author}</p>
            <p class="text-[16px] text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
        </div>
        `;

        allIssueContainer.append(issueDiv);

        issueDiv.addEventListener("click", () => openIssueModal(issue.id));
        issueDiv.className = "h-full cursor-pointer";
    }
};

const setActiveButton = (activeId) => {
    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("!bg-indigo-700", "!text-white");
        btn.classList.add("!bg-white", "!text-[#64748B]");
    });
    document.getElementById(activeId).classList.remove("!bg-white", "!text-[#64748B]");
    document.getElementById(activeId).classList.add("!bg-indigo-700", "!text-white");
};

document.getElementById("btn-all").addEventListener("click", () => {
    setActiveButton("btn-all");
    displayIssues(allIssues);
});

document.getElementById("btn-open").addEventListener("click", () => {
    setActiveButton("btn-open");
    displayIssues(allIssues.filter(issue => issue.status === "open"));
});

document.getElementById("btn-closed").addEventListener("click", () => {
    setActiveButton("btn-closed");
    displayIssues(allIssues.filter(issue => issue.status === "closed"));
});

loadAllIssues();

const openIssueModal = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(json => {
            const issue = json.data;
            document.getElementById("modal-content").innerHTML = `
                <div class="space-y-4">
                    <div class="flex justify-between items-center">
                        <img src="${issue.status === 'open' ? './assets/Open-Status.png' : './assets/Closed-Status.png'}" alt="">
                        <p class="bg-red-300 text-red-600 rounded-full px-3 text-sm">${issue.priority}</p>
                    </div>
                    <h3 class="font-bold text-xl">${issue.title}</h3>
                    <p class="text-[#64748B]">${issue.description}</p>
                    <div class="flex space-x-2">
                        ${issue.labels.map((label, index) => `<p class="${index % 2 === 0 ? 'bg-red-300 text-red-600' : 'bg-orange-300 text-orange-600'} rounded-full px-3 py-1 text-sm whitespace-nowrap">${label.trim()}</p>`).join('')}
                    </div>
                    <hr>
                    <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
                    <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                    <p class="text-[#64748B]">Assignee: ${issue.assignee}</p>
                </div>
            `;
            document.getElementById("issue-modal").showModal();
        });
};

document.getElementById("search-input").addEventListener("input", (e) => {
    const searchText = e.target.value.trim();
    
    if (searchText === "") {
        displayIssues(allIssues); 
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`)
        .then(res => res.json())
        .then(json => displayIssues(json.data));
});

