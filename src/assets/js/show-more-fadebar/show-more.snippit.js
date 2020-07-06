
try {
	var classList = (document.querySelector('.j-fader__button'));
	if(classList) {
		classList.addEventListener('click', function(ev) {
			ev.target.closest('.j-showmore').classList.toggle('is-visible'); 
			ev.target.closest('.j-fader').classList.toggle('is-visible'); 
			ev.target.classList.toggle('is-visible')
		}, false);
	}
}
catch(error) {
	console.error(error)
}
