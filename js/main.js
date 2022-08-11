var $newPhotoPreview = document.querySelector('#photoUrl');
var $placeholderImage = document.querySelector('#placeholderimage');
var $reviewForm = document.querySelector('#review-form');
var $hiddenReviewForm = document.querySelector('#review-form', 'hidden');
var $ul = document.querySelector('ul');
var $reviews = document.querySelector('#reviews');
var $hiddenReviews = document.querySelector('#reviews', '.hidden');
var $hiddenEmptyReviews = document.querySelector('.empty-reviews', '.font-weight-400', '.hidden');
var $emptyReviews = document.querySelector('.empty-reviews', '.font-weight-400');
var $reviewsButton = document.querySelector('#reviews-button');
var $newButton = document.querySelector('#new-button');
var $mangaAnime = document.querySelector('#mangaAnime');
var $reviewFormTitle = document.querySelector('#review-form-title');
var $mangaSearchForm = document.querySelector('#search-form');
var $mangaResultsList = document.querySelector('#manga-results-list');
var $searchButton = document.querySelector('#search-button');
var $searchResultsView = document.querySelector('#search-results-view');

$newPhotoPreview.addEventListener('input', function (e) {
  $placeholderImage.setAttribute('src', e.target.value);
});

function reviewSubmit(review) {
  review.preventDefault();
  if (data.editing === null) {
    var newReview = {
      entryId: data.nextEntryId++,
      title: $reviewForm.elements.title.value,
      date: $reviewForm.elements.date.value,
      enjoyment: $reviewForm.elements.slider.value,
      notes: $reviewForm.elements.notes.value,
      photoUrl: $reviewForm.elements.photoUrl.value
    };
    data.reviews.unshift(newReview);
    var newMangaReview = renderReview(newReview);
    $ul.prepend(newMangaReview);
  } else {
    var editReview = {
      entryId: data.editing.entryId,
      title: $reviewForm.elements.title.value,
      date: $reviewForm.elements.date.value,
      enjoyment: $reviewForm.elements.slider.value,
      notes: $reviewForm.elements.notes.value,
      photoUrl: $reviewForm.elements.photoUrl.value
    };
    for (var entry = 0; entry < data.reviews.length; entry++) {
      if (data.editing.entryId === data.reviews[entry].entryId) {
        data.reviews[entry] = editReview;
      }
    }
    var $liList = document.querySelectorAll('li');
    for (var liIndex = 0; liIndex < $liList.length; liIndex++) {
      if (data.editing.entryId === parseInt($liList[liIndex].getAttribute('data-entry-id'))) {
        var updatedReview = renderReview(editReview);
        $liList[liIndex].replaceWith(updatedReview);
      }
    }
    data.editing = null;
  }
  $reviewFormTitle.textContent = 'New Manga Reviews';
  $placeholderImage.setAttribute('src', '/images/placeholder-image-square.jpg');
  $reviewForm.reset();
  viewSwap('reviews');
}

$reviewForm.addEventListener('submit', reviewSubmit);

function renderReview(data) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'padding li-margin-bottom');
  $li.setAttribute('data-entry-id', data.entryId);

  var $divRow = document.createElement('div');
  $divRow.setAttribute('class', 'row white-background-color');
  $li.appendChild($divRow);

  var $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half-reviews align-items-flex-start');
  $divRow.appendChild($columnHalf);

  var $photoUrl = document.createElement('img');
  $photoUrl.setAttribute('src', data.photoUrl);
  $photoUrl.setAttribute('class', 'images');
  $columnHalf.appendChild($photoUrl);

  var $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.setAttribute('class', 'column-half padding-reviews');
  $divRow.appendChild($columnHalfTwo);

  var $editDivRow = document.createElement('div');
  $editDivRow.setAttribute('class', 'row space-between');
  $columnHalfTwo.appendChild($editDivRow);

  var $mangaTitle = document.createElement('h1');
  $mangaTitle.setAttribute('class', 'margin-top font-weight-400');
  $mangaTitle.textContent = data.title;
  $editDivRow.appendChild($mangaTitle);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fa-solid fa-pen color-green margin-top');
  $editIcon.setAttribute('data-entry-id', data.entryId);
  $editDivRow.appendChild($editIcon);

  var $divRowMeterTitle = document.createElement('div');
  $divRowMeterTitle.setAttribute('class', 'row space-between');
  $columnHalfTwo.appendChild($divRowMeterTitle);

  var $enjoymentMeter = document.createElement('p');
  $enjoymentMeter.textContent = 'Manga Enjoyment Meter';
  $divRowMeterTitle.appendChild($enjoymentMeter);

  var $enjoymentMeterHeart = document.createElement('img');
  $enjoymentMeterHeart.setAttribute('src', '/images/heart2.png');
  $enjoymentMeterHeart.setAttribute('class', 'heart');
  $divRowMeterTitle.appendChild($enjoymentMeterHeart);

  var $enjoymentMeterSlider = document.createElement('input');
  $enjoymentMeterSlider.setAttribute('type', 'range');
  $enjoymentMeterSlider.setAttribute('value', data.enjoyment);
  $enjoymentMeterSlider.setAttribute('disabled', 'true');
  $enjoymentMeterSlider.setAttribute('class', 'no-margin slider');
  $columnHalfTwo.appendChild($enjoymentMeterSlider);

  var $dateDivRow = document.createElement('div');
  $dateDivRow.setAttribute('class', 'row align-items-baseline');
  $columnHalfTwo.appendChild($dateDivRow);

  var $date = document.createElement('p');
  $date.textContent = 'Date';
  $date.setAttribute('class', 'margin-right');
  $dateDivRow.appendChild($date);

  var $dateData = document.createElement('span');
  $dateData.setAttribute('class', 'color-blue');
  $dateData.textContent = data.date;
  $dateDivRow.appendChild($dateData);

  var $bestParts = document.createElement('p');
  $bestParts.setAttribute('class', 'roboto padding-bottom line-height');
  $bestParts.textContent = data.notes;
  $columnHalfTwo.appendChild($bestParts);

  return $li;
}

function viewSwap(dataView) {
  data.view = dataView;
  if (dataView === 'review-form') {
    $reviews.className = 'hidden';
    $mangaSearchForm.className = 'hidden';
    $emptyReviews.className = 'empty-entries font-weight-400 hidden';
    $searchResultsView.className = 'hidden';
    $hiddenReviewForm.classList.remove('hidden');
    document.getElementById('review-form').reset();
    $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (dataView === 'reviews') {
    if (data.reviews.length === 0) {
      $reviewForm.className = 'hidden';
      $hiddenEmptyReviews.className = 'empty-reviews font-weight-400';
      $hiddenReviews.classList.remove('hidden');
      $mangaSearchForm.className = 'hidden';
      $searchResultsView.className = 'hidden';
    } else if (data.reviews.length > 0) {
      $reviewForm.className = 'hidden';
      $emptyReviews.className = 'empty-entries font-weight-400 hidden';
      $hiddenReviews.classList.remove('hidden');
      $mangaSearchForm.className = 'hidden';
      $searchResultsView.className = 'hidden';
    }
  } else if (dataView === 'search-form') {
    $reviewForm.className = 'hidden';
    $reviews.className = 'hidden';
    $searchResultsView.className = 'hidden';
    $mangaSearchForm.classList.remove('hidden');
  } else if (dataView === 'search-results-view') {
    $reviewForm.className = 'hidden';
    $reviews.className = 'hidden';
    $mangaSearchForm.className = 'hidden';
    $searchResultsView.classList.remove('hidden');
  }
}

function searchManga(manga) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.jikan.moe/v4/manga?q=' + manga + '&type=manga');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var newResult = {
      image: xhr.response.data[0].images.jpg.image_url,
      title: xhr.response.data[0].title,
      author: xhr.response.data[0].authors[0].name,
      chapters: xhr.response.data[0].chapters,
      genres: xhr.response.data[0].genres[0].name,
      synopsis: xhr.response.data[0].synopsis
    };
    var $liManga = document.createElement('li');
    $liManga.setAttribute('class', 'padding margin-top-bottom');
    $mangaResultsList.appendChild($liManga);

    var $divMangaRow = document.createElement('div');
    $divMangaRow.setAttribute('class', 'row white-background-color');
    $liManga.appendChild($divMangaRow);

    var $columnHalfManga = document.createElement('div');
    $columnHalfManga.setAttribute('class', 'column-half-reviews align-items-flex-start');
    $divMangaRow.appendChild($columnHalfManga);

    var $imgManga = document.createElement('img');
    $imgManga.setAttribute('src', newResult.image);
    $imgManga.setAttribute('class', 'images');
    $columnHalfManga.appendChild($imgManga);

    var $columnHalfMangaTwo = document.createElement('div');
    $columnHalfMangaTwo.setAttribute('class', 'column-half padding-reviews');
    $divMangaRow.appendChild($columnHalfMangaTwo);

    var $searchTitle = document.createElement('h1');
    $searchTitle.setAttribute('class', 'font-weight-400 righteous margin-top half-margin-bottom');
    $searchTitle.textContent = newResult.title;
    $columnHalfMangaTwo.appendChild($searchTitle);

    var $hr1 = document.createElement('hr');
    $hr1.setAttribute('class', 'color-gray');
    $columnHalfMangaTwo.appendChild($hr1);

    var $divRowSearchAuthor = document.createElement('div');
    $divRowSearchAuthor.setAttribute('class', 'row align-items-baseline');
    $columnHalfMangaTwo.appendChild($divRowSearchAuthor);

    var $searchAuthor = document.createElement('h3');
    $searchAuthor.setAttribute('class', 'color-green font-weight-400 margin-right no-margin');
    $searchAuthor.textContent = 'Author:';
    $divRowSearchAuthor.appendChild($searchAuthor);

    var $searchAuthorValue = document.createElement('h3');
    $searchAuthorValue.setAttribute('class', 'font-weight-400 roboto no-margin');
    $searchAuthorValue.textContent = newResult.author;
    $divRowSearchAuthor.appendChild($searchAuthorValue);

    var $hr2 = document.createElement('hr');
    $hr2.setAttribute('class', 'color-gray');
    $columnHalfMangaTwo.appendChild($hr2);

    var $divRowSearchChapters = document.createElement('div');
    $divRowSearchChapters.setAttribute('class', 'row align-items-baseline');
    $columnHalfMangaTwo.appendChild($divRowSearchChapters);

    var $searchChapters = document.createElement('h3');
    $searchChapters.setAttribute('class', 'color-green font-weight-400 margin-right no-margin');
    $searchChapters.textContent = 'Chapters:';
    $divRowSearchChapters.appendChild($searchChapters);

    var $searchChaptersValue = document.createElement('h3');
    $searchChaptersValue.setAttribute('class', 'font-weight-400 roboto no-margin');
    $searchChaptersValue.textContent = newResult.chapters;
    $divRowSearchChapters.appendChild($searchChaptersValue);

    var $hr3 = document.createElement('hr');
    $hr3.setAttribute('class', 'color-gray');
    $columnHalfMangaTwo.appendChild($hr3);

    var $divRowSearchGenre = document.createElement('div');
    $divRowSearchGenre.setAttribute('class', 'row align-items-baseline');
    $columnHalfMangaTwo.appendChild($divRowSearchGenre);

    var $searchGenre = document.createElement('h3');
    $searchGenre.setAttribute('class', 'color-green font-weight-400 margin-right no-margin');
    $searchGenre.textContent = 'Genre:';
    $divRowSearchGenre.appendChild($searchGenre);

    var $searchGenreValue = document.createElement('h3');
    $searchGenreValue.setAttribute('class', 'font-weight-400 roboto no-margin');
    $searchGenreValue.textContent = newResult.genres;
    $divRowSearchGenre.appendChild($searchGenreValue);

    var $hr4 = document.createElement('hr');
    $hr4.setAttribute('class', 'color-gray');
    $columnHalfMangaTwo.appendChild($hr4);

    var $searchSynopsis = document.createElement('h3');
    $searchSynopsis.setAttribute('class', 'color-green font-weight-400 margin-right no-margin half-margin-bottom');
    $searchSynopsis.textContent = 'Synopsis:';
    $columnHalfMangaTwo.appendChild($searchSynopsis);

    var $hr5 = document.createElement('hr');
    $hr5.setAttribute('class', 'color-gray');
    $columnHalfMangaTwo.appendChild($hr5);

    var $searchSynopsisValue = document.createElement('p');
    $searchSynopsisValue.setAttribute('class', 'font-weight-400 roboto no-margin line-height');
    $searchSynopsisValue.textContent = newResult.synopsis;
    $columnHalfMangaTwo.appendChild($searchSynopsisValue);

    var $hr6 = document.createElement('hr');
    $hr6.setAttribute('class', 'color-gray padding-bottom');
    $columnHalfMangaTwo.appendChild($hr6);
  });
  xhr.send();
}

// $mangaSearchForm.addEventListener('submit', function (e) {
//   e.preventDefault();
//   $mangaResultsList.textContent = '';
//   var mangaSearchResults = $mangaSearchForm.elements;
//   for (var i = 0; i < mangaSearchResults.length; i++) {
//     if (mangaSearchResults[i].nodeName === 'INPUT' && mangaSearchResults[i].type === 'text') {
//       var searchString = mangaSearchResults[i].value;
//       console.log(typeof searchString);
//       searchManga(searchString);
//     }
//   }
//   viewSwap('search-results-view');
//   document.getElementById('search-form').reset();
// });

$mangaSearchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  $mangaResultsList.textContent = '';
  var mangaSearchResults = $mangaSearchForm.elements;
  for (var i = 0; i < mangaSearchResults.length; i++) {
    if (mangaSearchResults[i].nodeName === 'INPUT' && mangaSearchResults[i].type === 'text') {
      var searchString = mangaSearchResults[i].value;
      searchManga(searchString);
    }
  }
  viewSwap('search-results-view');
  document.getElementById('search-form').reset();
});

$reviewsButton.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('reviews');
});

$newButton.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('review-form');
});

$mangaAnime.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('review-form');
});

$searchButton.addEventListener('click', function (e) {
  e.preventDefault();
  viewSwap('search-form');
  document.getElementById('search-form').reset();
});

document.addEventListener('DOMContentLoaded', function (e) {
  for (var review = 0; review < data.reviews.length; review++) {
    var newMangaReviews = renderReview(data.reviews[review]);
    $ul.appendChild(newMangaReviews);
  }
  viewSwap(data.view);
});

document.getElementById('reviews').addEventListener('click', function (e) {
  if (e.target.tagName === 'I') {
    viewSwap('review-form');
    for (var i = 0; i < data.reviews.length; i++) {
      var $closestLi = e.target.closest('li');
      var $closestLiId = $closestLi.getAttribute('data-entry-id');
      var parsedId = parseInt($closestLiId);
      if (parsedId === data.reviews[i].entryId) {
        data.editing = data.reviews[i];
        $reviewForm.elements.title.value = data.reviews[i].title;
        $reviewForm.elements.photoUrl.value = data.reviews[i].photoUrl;
        $placeholderImage.setAttribute('src', $reviewForm.elements.photoUrl.value);
        $reviewForm.elements.notes.value = data.reviews[i].notes;
        $reviewForm.elements.slider.value = data.reviews[i].enjoyment;
        $reviewForm.elements.date.value = data.reviews[i].date;
      }
    }
    $reviewFormTitle.textContent = 'Edit Review';
  }
});
