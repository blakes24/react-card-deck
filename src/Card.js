import './Card.css';

const Card = ({ src, alt, transform }) => {
	return (
		<div className="Card">
			<img src={src} alt={alt} style={{ transform }} />
		</div>
	);
};

export default Card;
