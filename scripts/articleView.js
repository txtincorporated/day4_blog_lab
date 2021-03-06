// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  var authorTemplate=$("#authorTemplate").html();
  var compAuthTempl=Handlebars.compile(authorTemplate);
  for (var i = 0; i < articles.length; i++) {
    // console.log(articles[i]['author']);
    $('#author-filter').append(compAuthTempl(articles[i]));
  }

  var categoryTemplate=$("#categoryTemplate").html();
  var compCatTempl=Handlebars.compile(categoryTemplate);
  for (var i = 0; i < articles.length; i++) {
    // console.log(articles[i]['category']);
    if ($('#category-filter option[value="' + articles[i]['category'] + '"]').length === 0) {
      $('#category-filter').append(compCatTempl(articles[i]));
    };
  };

//Populate Authors
  // articles.forEach( function() {
  //   templateScript(
  //     function() {
  //       return this.author;
  //     });
  // });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

$(document).ready(function() {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
