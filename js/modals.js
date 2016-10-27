var modalContainer;

function openModal(person) {
  var username = (person.firstName + "_" + person.lastName).toLowerCase()
  var roleAndLocation = person.role + ", " + person.location;

  modalContainer.find(".person-name").text("Hi, I’m " + person.firstName + "!");
  modalContainer.find(".person-role-and-location").text(roleAndLocation);
  modalContainer.find(".person-fun-fact").text(person.funFact);
  modalContainer.find(".person-favorite-costume").text(person.favoriteCostume);
  modalContainer.find(".person-image").attr("src", person.image);
  modalContainer.find(".person-one-airbnb").attr("href", person.oneAirbnb);

  modalContainer.removeClass("hide");
  setTimeout(function() { modalContainer.addClass("modal-open") }, 10)
}

function closeModal() {
  modalContainer.removeClass("modal-open");
  setTimeout(function() { modalContainer.addClass("hide") }, 500)
}

function initModals() {
  modalContainer = $(".modal-container");

  modalContainer.on("click", function(event) {
    if ($(event.target).is(modalContainer)) closeModal();
  });

  $(".modal-close-control").on("click", closeModal);

  $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
      closeModal();
    }
});
}

$(initModals);
