const daysContainer = document.getElementById("days");
const monthYear = document.getElementById("monthYear");
let date = new Date();
const reminders = new Map();

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const isThisMonth =
    today.getMonth() === month && today.getFullYear() === year;

  monthYear.textContent = date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  daysContainer.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    daysContainer.innerHTML += `<div></div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    const isToday = isThisMonth && i === today.getDate();
    const dayKey = `${year}-${month + 1}-${i}`;
    const reminderText = reminders.get(dayKey) || "";

    const dayDiv = document.createElement("div");
    if (isToday) dayDiv.classList.add("today");

    dayDiv.innerHTML = `${i}`;
    if (reminderText) {
      const note = document.createElement("span");
      note.classList.add("reminder");
      note.textContent = reminderText;
      dayDiv.appendChild(note);
    }

    dayDiv.addEventListener("click", () => {
      const reminder = prompt(
        `Add reminder for ${i} ${monthYear.textContent}:`
      );
      if (reminder) {
        reminders.set(dayKey, reminder);
        renderCalendar(); // re-render to show the note
      }
    });

    daysContainer.appendChild(dayDiv);
  }
}

function changeMonth(offset) {
  date.setMonth(date.getMonth() + offset);
  renderCalendar();
}

renderCalendar();
