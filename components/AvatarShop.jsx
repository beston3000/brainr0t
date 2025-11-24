export default function AvatarShop({ avatars, onBuy }){
return (
<div className='grid grid-cols-3 gap-4'>
{avatars.map(a=> (
<div key={a.id} className='p-3 border rounded'>
<img src={a.image} alt={a.name} className='w-24 h-24 object-cover' />
<h4>{a.name}</h4>
<p>{a.rarity}</p>
<button onClick={()=>onBuy(a)} className='mt-2 bg-yellow-500 px-3 py-1 rounded'>Buy</button>
</div>
))}
</div>
)
}
