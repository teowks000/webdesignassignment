$(".nav-pills .nav-item").on("click", function () {
  if ($(this).children("a").hasClass("active")) return;
  let target = $(this).children("a").data("target");
  $("section.fruit-tab").not($(target)).removeClass("active");
  $(target).addClass("active");
  $(".nav-pills .nav-item").children("a").toggleClass("active");
});
