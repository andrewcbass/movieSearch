'use strict';
var page = 1;
var totPage = 1;
$(function()  {
  $('#searchButton').on('click', searchNow);
  $('#prevPage').on('click', pageDown);
  $('#nextPage').on('click', pageUp);
});

function findMovies() {

  var movie = $('#titleSearch').val();
  var year = $('#year').val();
  var type = $('#type').val();

  $.ajax({
    method:'GET',
    url:`http://www.omdbapi.com/?s=${movie}&y=${year}&type=${type}&r=json&page=${page}`,
    success: function(data) {
      if(data.Response === 'False') {
        $('.oldResults').remove();
        $('#noResults').css('display', 'inline-block');
      }
      else {
        totPage = Math.ceil(data.totalResults / 10);
        $('#noResults').css('display', 'none');
        var arr = data.Search.map(function(item) {
          return makeMovieCard(item)
        });
        $('.oldResults').remove();
        $('#results').append(arr);
      }
    },
    error: function(err) {
      console.log('ERR', err);
    }
  });
}

function makeMovieCard(data) {
  var $card = $('#template').clone();
  $card.removeAttr('id').addClass('oldResults');
  $card.find('.title').text(data.Title);
  $card.find('.url').attr('href', `http://www.imdb.com/title/${data.imdbID}/`);
  $card.find('.poster').attr('src', data.Poster);
  return $card;
}

function searchNow() {
  page = 1;
  findMovies();

}

function pageUp() {

  if(page < totPage){
    page++;
    findMovies();
  }
}

function pageDown() {
  if(page !== 1) {
    page = page - 1;
    findMovies();
  }
}



















//honlder
