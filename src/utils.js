export  toggleBounce = () => {
	if(this.getAnimation() !== null){
		this.setAnimation(null);
	} else {
		this.setAnimation(window.google.maps.Animation.BOUNCE);
	}
}


