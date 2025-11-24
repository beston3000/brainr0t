import { useState, useEffect } from 'react';
import { socket } from '../utils/socket';
import Link from 'next/link';


export default function Home() {
const [code, setCode] = useState('');
const [username, setUsername] = useState('');
const [players, setPlayers] = useState([]);


useEffect(() => {
socket.on('player_list', (pl) => setPlayers(pl));
socket.on('game_created', ({ code }) => alert('Game created: ' + code));
return () => socket.off('player_list');
}, []);


function join() {
if (!code || !username) return alert('enter both');
socket.emit('join_game', { code, username });
// redirect to lobby
window.location.href = '/host/lobby?code=' + code;
}


return (
<div className='p-8'>
<h1 className='text-3xl font-bold'>Brainrot — Join Game</h1>
<input placeholder='Game Code' value={code} onChange={e=>setCode(e.target.value)} className='border p-2 mr-2' />
<input placeholder='Username' value={username} onChange={e=>setUsername(e.target.value)} className='border p-2 mr-2' />
<button onClick={join} className='bg-blue-600 text-white px-4 py-2 rounded'>Join</button>
<div className='mt-6'>
<Link href='/host/create'><a className='underline'>Host a game</a></Link>
</div>
</div>
)
}
