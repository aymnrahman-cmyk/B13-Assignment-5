const loadAllIssues=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then(res=> res.json())
    .then(json=> displayIssues(json.data));
};

const displayIssues= (issues) => {
    const allIssueContainer= document.getElementById("all-issues-container"); 
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
        issueDiv.innerHTML = `
            <div class="issue-card bg-white p-4 rounded space-y-3 m-1">
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
                ${issue.labels.map((label, index) => `<p class="${index % 2 === 0 ? 'bg-red-300 text-red-600' : 'bg-orange-300 text-orange-600'} rounded-full px-3 outline">${label.trim()}</p>`).join('')}
            </div>
            <hr>
            <p class="text-[16px] text-[#64748B]">#1 by ${issue.author}</p>
            <p class="text-[16px] text-[#64748B]">${issue.createdAt}</p>
        </div>
        `;

        allIssueContainer.append(issueDiv);
    }
};

loadAllIssues();