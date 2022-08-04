/* exported data */

var data = {
  view: 'review-form',
  reviews: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('review-forms');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('review-forms', dataJSON);
});
