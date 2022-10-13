// Client facing scripts here
//functionality on nav event---------------------------------
const filterShow = (event) => {
  $(".slideFilter").slideDown({
    start: function() {
      $(this).css({
        display: "grid",
      });
    },
  });
}

const filterHide = () => {
  $(".slideFilter").css({ display: 'none' })
};
// -------------------------------------------

const favoriteClicked = function() {
  const userId = Number(document.cookie.split("user_id=").pop());
  const isFavorite = $(this).children('i').css("color") === 'rgb(255, 0, 0)';
  const productId = Number($(this).attr("id").split("heart-").pop());
  const data = { users_id: userId, products_id: productId };

  const addFavorite = function(heartIcon) {
    $.ajax("/acclaim/favorites", { method: "POST", data })
      .then((res) => {
        heartIcon.children('i').css({
          color: 'red'
        })
          .catch(err => console.log('AJAX POST to acclaim/favorites FAIL: ', err))
      });
  }

  const deleteFavorite = function(heartIcon) {
    $.ajax("/acclaim/favorites", { method: "DELETE", data })
      .then((res) => {
        heartIcon.children('i').css({
          color: 'grey'
        });
        $(`#favorite-card-${productId}`).css({ display: "none" })
      });
  }
  if (isFavorite) {
    deleteFavorite($(this))
  } else {
    addFavorite($(this))
  }

}

$(document).ready(() => {
  $(".filter").on("mouseover", filterShow)
  $(".filter").on("mouseleave", filterHide)
  $(".ai-card__favorite").on("click", favoriteClicked)

});





