import React from 'react';
import ReactDOM from 'react-dom';

import { Board } from './Components/Board';
import './index.css';



class Game extends React.Component {
	constructor(props) {
		// Tem que chamar super ao definir o construtor de uma subclasse
		// Todas os componentes de classe React que possuem um método constructor devem iniciá-lo com uma chamada super(props)
		super(props);
		this.state = {
			history: [{
				// null é o valor inicial de cada quadrado
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		// O slice retornar uma cópia de parte de um array
		// Essa cópia que será modificada
		const squares = current.squares.slice();

		if(calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'x' : 'o';
		this.setState({ 
			history: history.concat([{
				squares: squares,
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext, // Sempre que um jogador fizer uma jogada, xIsNext será trocado para determinar o próximo a jogar
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}


  render() {
		//utilizando a entrada mais recente do histórico
		const history = this.state.history;
    const current = history[this.state.stepNumber]; // Renderiza apenas a jogada selecionada atualmente
    const winner = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move :
				'Go to game start';
			
			return (
				// Para cada jogado no histórico é criado um item
				<li key={ move }> 
					<button 
						className={ move === this.state.stepNumber ? "isActive" : ''} 
						onClick={ () => this.jumpTo(move) }
					> 					
						{ desc }
					</button>
				</li>
			);
		});


		let status;

		// Renderiza o status do jogo
		if(!winner) {
			status = 'Próximo jogador: ' + (this.state.xIsNext ? 'x' : 'o');
		} else {
			if(winner === 8){
				status = 'Empate';
			} else {
				status = 'Vencedor: ' + winner;
			}
		}

    return (
      <div className="game">
        <div className="game-board">
          <Board 
						squares={ current.squares }
						onClick={(i) => this.handleClick(i)}
					/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}



ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



// Dado um array de 9 quadrados esta função irá verificar se há um vencedor
function calculateWinner(squares) {
	let count = 0;
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			const aux = squares[a]; 
			if(aux === 'o') {
				squares[a] = 'O';
				squares[b] = 'O';
				squares[c] = 'O';
			} else {
				squares[a] = 'X';
				squares[b] = 'X';
				squares[c] = 'X';
			}
      
			return aux;
    } 

		if (squares[c] != null) {
			count ++;
		}
  }

	if(count === 8) {
		return count;
	}

  return null;
}