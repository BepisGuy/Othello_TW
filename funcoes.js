function toggleDisplay(id) {
	var content = document.getElementById(id);
	
    if (!content.style.display ||content.style.display == "none") {
       content.style.display = "block";
    }
    else {
       content.style.display = "none";
    }
}