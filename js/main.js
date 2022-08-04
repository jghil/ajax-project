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
  data.reviews.unshift(newReview);
  $placeholderImage.setAttribute('src', '/images/placeholder-image-square.jpg');
  $reviewForm.reset();
}

$reviewForm.addEventListener('submit', reviewSubmit);
