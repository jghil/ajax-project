/* exported data */

var data = {
  view: 'review-form',
  reviews: [],
  search: [],
  random: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('almost2');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('almost2', dataJSON);
});
