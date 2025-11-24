import { useState } from 'react';
import { socket } from '../../utils/socket';


export default function Create() {
const [title, setTitle] = useState('');
const [questionsJson, setQuestionsJson] = useState('[{ "question": "Q?", "options": ["a","b"], "correctIndex": 0 }]');


function create() {
const questions = JSON.parse(questionsJson);
socket.emit('create_game', { questionSet: questions });
socket.on('game_created', ({ code }) => {
window.location.href = '/host/lobby?code=' + code;
});
}


return (
<div className='p-6'>
<h2 className='text-2xl'>Create Game</h2>
<textarea className='w-full h-40 border' value={questionsJson} onChange={e=>setQuestionsJson(e.target.value)} />
<button onClick={create} className='mt-4 bg-green-600 text-white px-4 py-2 rounded'>Create</button>
</div>
)
}
