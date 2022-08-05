/* exported data */

var data = {
  view: 'review-form',
  reviews: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('manga-reviews');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('manga-reviews', dataJSON);
});
