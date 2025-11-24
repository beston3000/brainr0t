// server/index.js
if (!game) {
socket.emit('error', { message: 'Game not found' });
return;
}
game.players[socket.id] = { username, score: 0 };
socket.join(code);
io.to(code).emit('player_list', Object.values(game.players));
});


socket.on('start_game', ({ code }) => {
const game = games[code];
if (!game) return;
io.to(code).emit('game_started');
sendQuestion(code);
});


socket.on('answer', ({ code, answerIndex }) => {
const game = games[code];
if (!game) return;
const q = game.questions[game.current];
const player = game.players[socket.id];
if (!player) return;
if (answerIndex === q.correctIndex) {
player.score += 10; // basic scoring
socket.emit('answer_result', { correct: true });
} else {
socket.emit('answer_result', { correct: false });
}
io.to(code).emit('score_update', Object.values(game.players));


// advance
game.current++;
if (game.current < game.questions.length) {
setTimeout(() => sendQuestion(code), 800);
} else {
io.to(code).emit('game_finished', Object.values(game.players));
// cleanup after short delay
setTimeout(() => delete games[code], 20000);
}
});


socket.on('disconnect', () => {
// remove player from any games
for (const code of Object.keys(games)) {
const g = games[code];
if (g.players[socket.id]) {
delete g.players[socket.id];
io.to(code).emit('player_list', Object.values(g.players));
}
if (g.host === socket.id) {
// host left - end game
io.to(code).emit('host_left');
delete games[code];
}
}
});


function sendQuestion(code) {
const g = games[code];
const q = g.questions[g.current];
io.to(code).emit('new_question', { question: q, index: g.current });
}
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log('listening', PORT));
