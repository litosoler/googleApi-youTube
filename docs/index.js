var YOUTUBE_SEARCH_URL= "https://www.googleapis.com/youtube/v3/search";

var RESULT_HTML_TEMPLATE = "";

var state= {nextPage:"",searchTerm: ""};
//render funciones
function renderResult(result) {
  template = $(RESULT_HTML_TEMPLATE);
  template.find('.img').attr('src', result.snippet.thumbnails.medium.url);
  return template;
}

//action funciones

//nextPage
function nextPage(callback){
  $('#next').click(function(){
    var settings= {
      url: YOUTUBE_SEARCH_URL,
      data: {
        part: "snippet",
        pageToken: state.nextPage,
        q: state.searchTerm,
        maxResults: 6,
        key: "AIzaSyDkEzsw6g8q_cl17kaggwkyWBAnkAmQu-E",
    },      
      dataType: 'json',
      type: 'GET',
      success: callback,
      };
  $.ajax(settings);
  });
}

function getDataFromApi(searchTerm, callback) {
  state.searchTerm = searchTerm;
  var settings = {
    url: YOUTUBE_SEARCH_URL,
    data: {
    	part: "snippet",
      	q: searchTerm,
      	maxResults: 6,
      	key: "AIzaSyDkEzsw6g8q_cl17kaggwkyWBAnkAmQu-E",
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}

//display YouTube SearchData
function callback(data) {
  state.nextPage =  data.nextPageToken;
   var results = data.items.map(function(item, index) {
     return "<a target='new' href='https://www.youtube.com/watch?v="+item.id.videoId+"'><img class='img' src='"+item.snippet.thumbnails.medium.url+"'></a>";
   });
  $('.js-search-results').html(results);
}


//cuando el usuario de click al buscar
function watchSubmit() {
  $('button[id="submit"]').click(function() {
    var queryTarget = $('form').find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, callback);
  });
}

//cuando la pagina este lista
$(function(){
  watchSubmit();
  nextPage(callback);
});