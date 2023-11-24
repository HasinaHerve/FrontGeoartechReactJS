import React from 'react'
import map from './map.jpg';

const styles = {
	container: {
	  backgroundImage: `url(${map})`, // Utilisez l'image importée
	  // Autres styles
	},
  };

function Slider() {
  return (
    <section class="slider">
			<div class="hero-slider">
			
				<div class="single-slider" style={styles.container}>
					<div class="container">
						<div class="row">
							<div class="col-lg-7">
								<div class="text">
									<h1>Naviguons ensemble vers la digitalisation <span>géo-innovante</span>!</h1>
									<p>Nous sommes ravis de vous annoncer le lancement officiel de notre entreprise GéoAr'tech</p>
									<div class="button">
										<a href="#" class="btn">Voir plus</a>
										<a href="#" class="btn primary">Nous contacter</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		
				<div class="single-slider" style={styles.container}>
					<div class="container">
						<div class="row">
							<div class="col-lg-7">
								<div class="text">
									<h1>Naviguons ensemble vers la digitalisation <span>géo-innovante</span>!</h1>
									<p>Nous sommes ravis de vous annoncer le lancement officiel de notre entreprise GéoAr'tech</p>
									<div class="button">
										<a href="#" class="btn">Voir plus</a>
										<a href="#" class="btn primary">Nous contacter</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			
				<div class="single-slider" style={styles.container}>
					<div class="container">
						<div class="row">
							<div class="col-lg-7">
								<div class="text">
									<h1>Naviguons ensemble vers la digitalisation <span>géo-innovante</span>!</h1>
									<p>Nous sommes ravis de vous annoncer le lancement officiel de notre entreprise GéoAr'tech</p>
									<div class="button">
										<a href="#" class="btn">Voir plus</a>
										<a href="#" class="btn primary">Nous contacter</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			
			</div>
		</section>
  )
}

export default Slider