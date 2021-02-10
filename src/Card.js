import './Card.css';

const Card = ({ src, alt }) => (
	<div className="Card">
		<img src={src} alt={alt} width="200" />
	</div>
);

export default Card;
