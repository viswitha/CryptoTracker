const form=document.querySelector('#searchForm');
const res=document.querySelector('#tableResult');
let chartEl = document.getElementById("chart");

let coinIds ={
	"btc-usd":859,
	"btc-doge":859,
	"eth-usd":145,
	"bnb-usd":1209,
	"doge-usd":280
};

var upd;
form.addEventListener('submit',(e)=>{
	if(upd){
		clearTimeout(upd);
	}
	e.preventDefault();
	const ctype=form.elements.coinType.value;
	let coinId = coinIds[ctype];
	let chartUrl =`https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=${coinId}&pref_coin_id=1505`;
	chartEl.src = chartUrl;
	fetchPrice(ctype);
});
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
const fetchPrice=async(ctype)=>{
	const r=await axios.get(`https://api.cryptonator.com/api/ticker/${ctype}`);
	const price= r.data.ticker.price;
	const base=r.data.ticker.base;
	const volume=r.data.ticker.volume;
	const change=r.data.ticker.change;
	const target=r.data.ticker.target;
	const timestamp=timeConverter(r.data.timestamp);

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
