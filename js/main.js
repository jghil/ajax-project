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
// var $mangaResultsList = document.querySelector('#manga-results-list');

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
    $emptyReviews.className = 'empty-entries font-weight-400 hidden';
    $hiddenReviewForm.classList.remove('hidden');
    document.getElementById('review-form').reset();
    $placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else if (dataView === 'reviews') {
    if (data.reviews.length === 0) {
      $reviewForm.className = 'hidden';
      $hiddenEmptyReviews.className = 'empty-reviews font-weight-400';
      $hiddenReviews.classList.remove('hidden');
    } else if (data.reviews.length > 0) {
      $reviewForm.className = 'hidden';
      $emptyReviews.className = 'empty-entries font-weight-400 hidden';
      $hiddenReviews.classList.remove('hidden');
    }
  }
}

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
$reviewForm.addEventListener('submit', reviewSubmit);
