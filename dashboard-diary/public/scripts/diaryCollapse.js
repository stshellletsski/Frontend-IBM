let allEntries = document.getElementsByClassName("entryTitleWrapper");

for (let i = 0; i < allEntries.length; i++) {
  allEntries[i].addEventListener("click", function() {
    this.classList.toggle("activeEntry");
    let content = this.nextElementSibling;
    content.classList.toggle("collapse");
  });
};