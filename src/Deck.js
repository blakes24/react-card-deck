import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';

const Deck = () => {
	const [ deck, setDeck ] = useState(null);
	const [ cards, setCards ] = useState([]);

	useEffect(() => {
		async function getDeck() {
			const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`);
			setDeck(res.data.deck_id);
		}
		getDeck();
	}, []);

	async function getCard() {
		const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck}/draw/`);
		const newCard = res.data.cards[0];
		if (!newCard) {
			return alert('Error: no cards remaining!');
		}
		setCards((cards) => [ ...cards, newCard ]);
	}

	return (
		<div>
			<button onClick={getCard}>Draw a card</button>
			{cards.map((card) => <Card key={card.code} src={card.image} alt={`${card.value} of ${card.suit}`} />)}
		</div>
	);
};

export default Deck;
