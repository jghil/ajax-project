var $newPhotoPreview = document.querySelector('#photoUrl');
var $placeholderImage = document.querySelector('#placeholderimage');
var $reviewForm = document.querySelector('#review-form');
var $ul = document.querySelector('ul');

$newPhotoPreview.addEventListener('input', function (e) {
  $placeholderImage.setAttribute('src', e.target.value);
});

function reviewSubmit(review) {
  review.preventDefault();
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
  $placeholderImage.setAttribute('src', '/images/placeholder-image-square.jpg');
  $reviewForm.reset();
}

function renderReview(data) {
  var $li = document.createElement('li');
  $li.setAttribute('class', 'padding li-margin-bottom');

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

  var $mangaTitle = document.createElement('h1');
  $mangaTitle.setAttribute('class', 'margin-top');
  $mangaTitle.textContent = data.title;
  $columnHalfTwo.appendChild($mangaTitle);

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

document.addEventListener('DOMContentLoaded', function (e) {
  for (var review = 0; review < data.reviews.length; review++) {
    var newMangaReviews = renderReview(data.reviews[review]);
    $ul.appendChild(newMangaReviews);
  }
});
$reviewForm.addEventListener('submit', reviewSubmit);
