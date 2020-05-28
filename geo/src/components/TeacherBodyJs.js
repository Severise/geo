
export default function show(event) {


	document.getElementById("createStud").style.display = "none";
	document.getElementById("createClass").style.display = "none";
	if (!event) {
		return;
	}
	var x = document.getElementById(event.target.className);
	if (x.style.display === "none" || x.style.display === "") {
		x.style.display = "block";
	}
}