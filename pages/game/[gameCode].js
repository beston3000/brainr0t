import { useEffect, useState } from 'react';
import { socket } from '../../utils/socket';
import { useRouter } from 'next/router';


export default function GamePage(){
const r = useRouter();
const { gameCode } = r.query;
const [question, setQuestion] = useState(null);
const [scores, setScores] = useState([]);


useEffect(()=>{
socket.on('new_question', ({ question })=> setQuestion(question));
socket.on('score_update', (s)=> setScores(s));
socket.on('game_finished', (final)=> {
alert('Game finished');
setScores(final);
});


return ()=>{
socket.off('new_question');
socket.off('score_update');
socket.off('game_finished');
}
},[]);


function answer(i){
socket.emit('answer', { code: gameCode, answerIndex: i });
}


return (
<div className='p-6'>
<h2 className='text-2xl'>Game {gameCode}</h2>
{question ? (
<div>
<h3>{question.question}</h3>
{question.options.map((opt, idx)=> (
<button key={idx} onClick={()=>answer(idx)} className='block my-2 border p-2'>{opt}</button>
))}
</div>
) : <p>Waiting for question...</p>}


<div className='mt-6'>
<h4>Leaderboard</h4>
<ul>
{scores.map((s, i)=> <li key={i}>{s.username} — {s.score}</li>)}
</ul>
</div>
</div>
)
}
