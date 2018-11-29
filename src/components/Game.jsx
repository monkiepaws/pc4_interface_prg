import React, {Component} from 'react';
import Board from "./Board";
import firebase from "../firebase";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: null,
            board: [],
            turns: [],
            player1: {
                id: '1',
                name: 'Richard',
                icon: 'fas fa-times-circle',
                color: 'red'
            },
            player2: {
                id: '2',
                name: 'Harry',
                icon: 'fas fa-circle',
                color: 'yellow'
            },
            status: null,
            result: null,
            chatId: null,
            playerTurn: null
        };
        this.handleBoardChange = this.handleBoardChange.bind(this);
        this.handleTurn = this.handleTurn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBoardCreate = this.handleBoardCreate.bind(this);
    }

    componentDidMount() {
        if (this.state.gameId) {
        }
    }

    handleChange(propType, change) {
        this.setState({
            [propType]: change
        });
    }

    handleBoardChange(board, turns, playerTurn) {
        this.setState({
            board: board,
            turns: turns,
            playerTurn: playerTurn
        });
    }

    handleTurn(turn, playerTurn) {
        const gamesRef = firebase.database().ref(`games/${this.state.gameId}/turns`);
        gamesRef.push(turn)
            .then(() => {
                console.log('sent turns');
            })
            .catch(error => console.log(error));
        const playerTurnRef = firebase.database().ref(`games/${this.state.gameId}`);
        playerTurnRef.update({
            playerTurn: playerTurn
        }).then( () => {
            this.setState({
                playerTurn: playerTurn
            });
        });
    }

    handleBoardCreate(board) {
        const gamesRef = firebase.database().ref('games');
        const game = {
            player1: this.state.player1,
            player2: this.state.player2,
            playerTurn: this.state.player1,
            status: 'in progress',
        };
        gamesRef.push(game)
            .then(response => {
                this.setState({
                    gameId: response.path.pieces_[1],
                    board: board,
                    turns: [],
                    playerTurn: this.state.player1
                });
                const gamesRef = firebase.database().ref(`games/${this.state.gameId}`);
                gamesRef.on('value', snapshot => {
                    const game = snapshot.val();
                    console.log(game);
                    if (game.turns)
                    {
                        const newTurns = [];
                        for (let turn in game.turns) {
                            console.log(game.turns[turn]);
                            const newTurn = {
                                id: turn,
                                column: game.turns[turn].column,
                                row: game.turns[turn].row,
                                player: game.turns[turn].player
                            };
                            newTurns.push(newTurn);
                        }
                        const newBoard = this.state.board.concat();
                        newTurns.forEach(turn => {
                            console.log(`turn: ${turn}`);
                            console.log(`row: ${newBoard[turn.row]}`);
                            console.log(newBoard);
                            newBoard[turn.row][turn.column] = turn;
                        });
                        this.setState({
                            board: newBoard,
                            turns: newTurns
                        });
                    }
                });
            })
            .catch(error => console.log(error));

    }

    render() {
        return (
            <div>
                <Board
                    gameId={this.state.gameId}
                    board={this.state.board}
                    turns={this.state.turns}
                    player1={this.state.player1}
                    player2={this.state.player2}
                    status={this.state.status}
                    result={this.state.result}
                    chatId={this.state.chatId}
                    playerTurn={this.state.playerTurn}
                    onChange={(propType, change) => this.handleChange(propType, change)}
                    onTurn={(turn, playerTurn) => this.handleTurn(turn, playerTurn)}
                    onBoardChange={(board, turns, playerTurn) => this.handleBoardChange(board, turns, playerTurn)}
                    onBoardCreate={board => this.handleBoardCreate(board)}
                />
            </div>
        );
    }
}

export default Game;