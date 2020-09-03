const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let miss = 0;
let result = 10;

function round() {
  // сделано FIXME: надо бы убрать "target" прежде чем искать новый
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // сделано TODO: помечать target текущим номером
  $(".target").text(hits + 1);

  // сделано FIXME: тут надо определять при первом клике firstHitTime
  // сдело согласно пункту 2 ТЗ.
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // сделано FIXME: спрятать игровое поле сначала
  $(".game-field").removeClass("game-field");
  $(".target").removeClass("target");
  $(".align-text-bottom").text("");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  if (miss == 0) {
    $("#miss").text("Вы совершили " + miss + " промахов.");
  } else if (miss == 1) {
    $("#miss").text("Вы совершили " + miss + " промах.");
  } else if (miss <= 4) {
    $("#miss").text("Вы совершили " + miss + " промаха.");
  } else if (miss >= 5) {
    $("#miss").text("Вы совершили " + miss + " промахов.");
  }

  if (result < 0) {
    $("#effectiveness").text(
      "Результат неудовлетворительный, пройди тест еще раз."
    );
  } else if (result == 0) {
    $("#effectiveness").text("Результативность " + result + " баллов.");
  } else if (result == 1) {
    $("#effectiveness").text("Результативность " + result + " балл.");
  } else if (result <= 4) {
    $("#effectiveness").text("Результативность " + result + " балла.");
  } else if (result >= 5) {
    $("#effectiveness").text("Результативность " + result + " баллов.");
  }

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // сделано FIXME: убирать текст со старых таргетов. Кажется есть .text?
  $(".align-text-bottom").text("");
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    round();
  } else if ($(event.target).not(".target")) {
    $(".target").text(hits + 1);
    $(event.target).addClass("miss");
    miss = miss + 1;
    result = result - 1;
    console.log(result);
    console.log(miss);
  }
  // сделано TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // cделано TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#start").click(function () {
    round();
    $(".game-field").click(handleClick);
    firstHitTime = new Date();
    return firstHitTime;
  });

  $("#button-reload").click(function () {
    location.reload();
  });
}

$(document).ready(init);
