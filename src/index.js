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
	constructor(props) {
		// Tem que chamar super ao definir o construtor de uma subclasse
		// Todas os componentes de classe React que possuem um método constructor devem iniciá-lo com uma chamada super(props)
		super(props);
		this.state = {
			// null é o valor inicial de cada quadrado
			squares: Array(9).fill(null),
			xIsNext: true, 
		};
	}

	handleClick(i) {
		// O slice retornar uma cópia de parte de um array
		// Essa cópia que será modificada
		const squares = this.state.squares.slice();
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({ 
			squares: squares,
			xIsNext: !this.state.xIsNext, // Sempre que um jogador fizer uma jogada, xIsNext será trocado para determinar o próximo a jogar
		});
	}

  renderSquare(i) {
    return (
			<Square 
				value={ this.state.squares[i] }
				onClick={ () => this.handleClick(i) }
			/>
		);
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{ status }</div>

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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);