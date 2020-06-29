const numDivs = 36;
const maxHits = 10;

let hits = 0;
let hitsMiss = 0;
let firstHitTime = 0;

function round() {
  $(".game-field").removeClass("target");
  $(".game-field").removeClass("miss");
  // FIXME: надо бы убрать "target" прежде чем искать новый
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(".target").text(hits + 1)
  // TODO: помечать target текущим номером
  // FIXME: тут надо определять при первом клике firstHitTime

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.col').addClass("d-none")
  // FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  let totalPoints = hits + hitsMiss;
  $("#total-fails").text(" " + totalPoints);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    $(".target").text("");
    hits = hits + 1;
    round();
  } else {
    $(event.target).addClass("miss");
    hitsMiss = hitsMiss - 1;
  };
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);

  $("#start-button").click(function(){
    firstHitTime = getTimestamp();
    $(".col").removeClass('d-none');
    $("#start-button").hide();

    $("#button-reload").removeClass('d-none');
  });

  $("#button-reload").click(function() {
    location.reload();
  });

}

$(document).ready(init);
