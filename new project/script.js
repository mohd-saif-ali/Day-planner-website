const planner = document.getElementById('planner');
const hours = [
  '9 AM', '10 AM', '11 AM', '12 PM', 
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
];

function getHourIndex(hourStr) {
  const now = new Date();
  let hour = parseInt(hourStr);
  if (hourStr.includes('PM') && hour !== 12) hour += 12;
  if (hourStr.includes('AM') && hour === 12) hour = 0;
  return hour;
}

function getTimeClass(hourStr) {
  const now = new Date();
  const currentHour = now.getHours();
  const blockHour = getHourIndex(hourStr);
  if (blockHour < currentHour) return 'past';
  if (blockHour === currentHour) return 'present';
  return 'future';
}

function loadPlanner() {
  hours.forEach((hour, index) => {
    const savedText = localStorage.getItem(`hour-${index}`) || '';
    const timeClass = getTimeClass(hour);

    const timeBlock = document.createElement('div');
    timeBlock.className = 'time-block';

    timeBlock.innerHTML = `
      <div class="hour">${hour}</div>
      <textarea class="${timeClass}" id="text-${index}">${savedText}</textarea>
      <button class="saveBtn" onclick="saveTask(${index})">Save</button>
    `;

    planner.appendChild(timeBlock);
  });
}

function saveTask(index) {
  const text = document.getElementById(`text-${index}`).value;
  localStorage.setItem(`hour-${index}`, text);
}

loadPlanner();
