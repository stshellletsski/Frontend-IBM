$("h1").addClass("dark");
$("h1").html("<em>Think!</em>");
$("h1").text("Think! Harder!");
console.log($("h1").attr("class"));
$("h1").click(() => {$("h1").off("click");});
$("h1").click(function () {this.style.color = "red";});
$("button").on("click", () => {$("h1").on("click", () => {$("h1").click(() => {$("h1").off("click");});})});
$(document).keypress((event) => {console.log(event.key);});
$("input").keypress((event) => {$("h1").text(event.key);});

$("h1").before("<span>HH</span>");
$("h1").after("<span>HH</span>");
$("h1").prepend("<span>HH</span>");
$("h1").append("<span>HH</span>");
//.hide
//.show
//.fadeout
//.fadein
//.toggle
//.slideup
//.slidedown
//.slidetoggle