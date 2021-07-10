const form=document.querySelector('#searchForm');
const res=document.querySelector('#tableResult');

var upd;
form.addEventListener('submit',(e)=>{
	if(upd){
		clearTimeout(upd);
	}
	e.preventDefault();
	const ctype=form.elements.coinType.value;
	fetchPrice(ctype);
});

const fetchPrice=async(ctype)=>{
	const r=await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
	const price= r.data.ticker.price;
	const base=r.data.ticker.base;
	const volume=r.data.ticker.volume;
	const change=r.data.ticker.change;
	const target=r.data.ticker.target;
	const timestamp=r.data.timestamp;

	res.innerHTML=`
	<tr style="background-color: #0000FF; font-weight: bold;">
		<td>Property</td>
		<td>Value</td>
	</tr>
	<tr>
		<td>${base}</td>
		<td>${price} ${target}</td>
	</tr>
	<tr>
		<td>Volume(24 hours)</td>
		<td>${volume}</td>
	</tr>
	<tr>
		<td>Change(24 hours)</td>
		<td>${change}</td>
	</tr>
	<tr>
		<td>Last Update</td>
		<td>${timestamp}</td>
	</tr>
	`
	upd=setTimeout(()=>fetchPrice(ctype),10000);
}
