import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';
import './Deck.css';
import { addTransform } from './helpers';
import cardBack from './card-back.jpg';

const Deck = () => {
	const [ deck, setDeck ] = useState(null);
	const [ cards, setCards ] = useState([]);
	const [ drawing, setDrawing ] = useState(false);
	const intervalId = useRef();

	useEffect(() => {
		async function getDeck() {
			const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
			setDeck(res.data.deck_id);
		}
		getDeck();
	}, []);

	useEffect(
		() => {
			async function getCard() {
				try {
					const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`);
					const newCard = res.data.cards[0];
					if (!newCard) {
						setDrawing(false);
						throw new Error('no cards remaining!');
					}
					newCard['transform'] = addTransform();

					setCards((cards) => [ ...cards, newCard ]);
				} catch (e) {
					if (e.message === 'no cards remaining!') {
						alert(e);
					}
				}
			}
			if (drawing) {
				intervalId.current = setInterval(async () => {
					await getCard();
				}, 1000);
			}
			return () => {
				clearInterval(intervalId.current);
			};
		},
		[ drawing, setDrawing, deck ]
	);

	const toggleDrawing = () => {
		setDrawing(!drawing);
	};

	async function shuffle() {
		setDrawing(false);
		await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/shuffle/`);
		setCards(() => []);
	}

	return (
		<div className="Deck">
			<button onClick={toggleDrawing}>{drawing ? 'Stop Drawing' : 'Start Drawing'}</button>
			<div className="Deck-cards">
				{cards.length === 0 ? (
					<img src={cardBack} />
				) : (
					cards.map((card) => (
						<Card
							key={card.code}
							src={card.image}
							alt={`${card.value} of ${card.suit}`}
							transform={card.transform}
						/>
					))
				)}
			</div>
			<button onClick={shuffle}>Shuffle</button>
		</div>
	);
};

export default Deck;
