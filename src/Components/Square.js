import React from 'react';



// o square é um componente controlado (controlled component) 
// o Board tem controle total sobre ele
export function Square(props) {
	return (
		// Quando chama setState em um componente, o React atualiza automaticamente os componentes filho dele
		<button 
			className="square" 
			onClick={ props.onClick } // Quando o quadrado for clicado será chamada a função onClick do tabuleiro
		>
			{ props.value }
		</button>
	);
}