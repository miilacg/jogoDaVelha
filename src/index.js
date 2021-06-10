import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';



// o square é um componente controlado (controlled component) 
// o Board tem controle total sobre ele
function Square(props) {
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



class Board extends React.Component {
  renderSquare(i) {
    return (
			<Square 
				value={ this.props.squares[i] }
				onClick={ () => this.props.onClick(i) }
			/>
		);
  }

  render() {
		return (
      <div>
        <div className="board-row">
          { this.renderSquare(0) }
          { this.renderSquare(1) }
          { this.renderSquare(2) }
        </div>
        <div className="board-row">
          { this.renderSquare(3) }
          { this.renderSquare(4) }
          { this.renderSquare(5) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
          { this.renderSquare(7) }
          { this.renderSquare(8) }
        </div>
      </div>
    );
  }
}



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

		squares[i] = this.state.xIsNext ? 'X' : 'O';
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
				<li key ={ move }> 
					<button onClick={ () => this.jumpTo(move) }> { desc }</button>
				</li>
			);
		});


		let status;

		// Renderiza o status do jogo
		if(winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
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
      return squares[a];
    }
  }
  return null;
}