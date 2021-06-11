import React from 'react';

import { Square } from './Square';
import './../index.css';



export class Board extends React.Component {
  /**
   * 
   * renderSquare(i) {
    const board = <Square
                    style={ `square${i}` } 
                    value={ this.props.squares[i] }
                    onClick={ () => this.props.onClick(i) }
                  />  
    return (
			board
		);
  } 
   
  */
 
  renderSquare(j) {
    let board = [];

    for(let i = j; i < (j + 3); i++){
      board[i] = <Square
                  style={ `square${i}` } 
                  value={ this.props.squares[i] }
                  onClick={ () => this.props.onClick(i) }
                />
    }
    
    return board;
  } 


  render() {
		return (
      <div>
        <div className="board-row">
          { this.renderSquare(0) }
        </div> 
        <div className="board-row">
          { this.renderSquare(3) }
        </div>
        <div className="board-row">
          { this.renderSquare(6) }
        </div>    
      </div>
    );
  }
}