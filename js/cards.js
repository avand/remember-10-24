var cardOne;
var cardTwo;

var main;
var cardTemplate;

var matches = [];

function flipCard(event) {
  var cardSelected = $(this);

  if (cardSelected.hasClass("card-flipped")) return;

  if (cardOne && cardTwo) {
    cardOne.removeClass("card-flipped");
    cardTwo.removeClass("card-flipped");
    cardOne = cardSelected;
    cardTwo = null;
  } else if (cardOne) {
    cardTwo = cardSelected;

    if (cardOne.data("person").image == cardTwo.data("person").image) {
      matches.push(cardOne.data("person"));
      openModal(cardOne.data("person"));
      cardOne = null;
      cardTwo = null;

      if (matches.length == window.people.length) {
        $("#confetti").removeClass("hide");
        setTimeout(function() { $("#confetti").removeClass("transparent") }, 10)

        ga("send", "event", "game", "won");
      }
    } else {
      ids = ["#" + cardOne.attr("id")];
      ids.push("#" + cardTwo.attr("id"));

      setTimeout(function() {
        $(ids.join(", ")).removeClass("card-flipped");
      }, 600);
    }
  } else {
    cardOne = cardSelected;
  }

  cardSelected.addClass("card-flipped");
}

function initCards() {
  main = $("main");
  cardTemplate = $("#card-template");
  var people = window.people.concat(window.people);
  people = _.shuffle(people);

  $.each(people, function(i, person) {
    var card = cardTemplate.clone();

    card.find(".card-person-name").html(person.firstName + "<br>" + person.lastName);
    card.find(".card-person-image").attr("src", person.image);
    card.find(".card-number").text(i + 1);
    card.attr("id", "card-" + i).data("person", person).removeClass("hide")
    card.appendTo(main)
  });

  $(".card").addClass("card-flipped");

  $("#im-ready .button").click(function() {
    ga("send", "event", "game", "started");

    $("#im-ready").addClass("fly-down");
    setTimeout(function() { $("im-ready").addClass("hide") }, 200);

    $(".card").each(function(i, card) {
      setTimeout(function() {
        $(card).on("click", flipCard).removeClass("card-flipped");
      }, i * 20)
    })
  })
}

$(initCards);
