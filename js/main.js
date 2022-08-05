var $newPhotoPreview = document.querySelector('#photoUrl');
var $placeholderImage = document.querySelector('#placeholderimage');
var $reviewForm = document.querySelector('#review-form');

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
  $placeholderImage.setAttribute('src', '/images/placeholder-image-square.jpg');
  $reviewForm.reset();
  data.reviews.unshift(newReview);
}

// function renderReview(data) {
//   var $li = document.createElement('li');

//   var $divRow = document.createElement('div');
//   $divRow.setAttribute('class', 'row');
//   $li.appendChild($divRow);

//   var $columnHalf = document.createElement('div');
//   $columnHalf.setAttribute('class', 'column-half');
//   $divRow.appendChild($columnHalf);

//   var $photoUrl = document.createElement('img');
//   $photoUrl.setAttribute('src', data.photoUrl);
// }

$reviewForm.addEventListener('submit', reviewSubmit);
