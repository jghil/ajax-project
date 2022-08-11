/* exported data */

var data = {
  view: 'review-form',
  reviews: [],
  search: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('blah');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('blah', dataJSON);
});
