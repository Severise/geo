
export default function show(event) {
	var x = document.getElementById(event.target.className);
	if (x.style.display === "none") {
		document.getElementById("stud").style.display = "none";
		document.getElementById("class").style.display = "none";
		x.style.display = "block";
	} else {
		x.style.display = "none";
	}
}