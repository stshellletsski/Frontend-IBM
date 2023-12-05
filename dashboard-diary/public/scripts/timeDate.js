timeAndDate();

function timeAndDate () {
    let dayH3 = document.getElementById("day");
    let dateH3 = document.getElementById("date");
    let timeH3 = document.getElementById("time");
    let currentDate = timeDate();
    dayH3.innerHTML = currentDate.day; 
    dateH3.innerHTML = currentDate.date 
    timeH3.innerHTML = currentDate.time; 
    setTimeout(timeAndDate, 60e3);
}

function timeDate () {
	const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	const d = new Date();
	const day = daysOfWeek[d.getDay()];
	const date = `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
	const time = `${d.getHours()} : ${d.getMinutes()}`;
/* 	console.log(day);
	console.log(date);
	console.log(time); */
	return {day : day, date : date, time : time};
}