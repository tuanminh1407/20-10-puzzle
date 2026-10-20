import React,{useState} from "react";
import{createRoot}from"react-dom/client";
import{Heart,Flower2,Sparkles,ArrowRight,ArrowLeft,LockKeyhole,RotateCcw,Gift}from"lucide-react";
import"./style.css";
const journeys={
mom:{label:"Dành tặng mẹ",name:"Mẹ yêu",theme:"mom",intro:"Một vài câu hỏi nhỏ để hiểu mẹ hơn và gửi mẹ một món quà dịu dàng.",questions:[
["Dạo gần đây, điều gì khiến mẹ vui nhất?",["Được cả nhà quây quần","Có thời gian nghỉ ngơi","Làm điều mình yêu thích","Một điều khác"]],
["Có điều gì mẹ muốn làm từ lâu nhưng chưa có thời gian thực hiện không?",["Đi du lịch","Học hoặc thử điều mới","Chăm sóc bản thân","Mẹ muốn tự kể"]],
["Nếu dành trọn một ngày cho riêng mình, mẹ muốn ngày ấy thế nào?",["Thư giãn ở nhà","Ra ngoài đi chơi","Gặp người thân, bạn bè","Theo ý thích của mẹ"]],
["Có món ăn hay địa điểm nào mẹ muốn cả nhà cùng thử không?",["Một quán ăn mới","Một chuyến đi ngắn","Bữa cơm gia đình tại nhà","Mẹ sẽ chọn sau"]],
["Có việc gì con có thể làm thường xuyên hơn để mẹ đỡ vất vả?",["Chủ động phụ việc nhà","Dành thời gian trò chuyện","Quan tâm hỏi han nhiều hơn","Điều khác mẹ muốn nhắn"]],
["Nếu cả nhà có một ngày không bận rộn, mẹ muốn mọi người cùng làm gì?",["Đi chơi cùng nhau","Nấu ăn và ăn cùng nhau","Xem phim, trò chuyện ở nhà","Cùng mẹ lên kế hoạch"]]
],title:"Gửi mẹ yêu thương",message:"Nhân ngày Phụ nữ Việt Nam 20/10, con chúc mẹ luôn mạnh khỏe, bình an và gặt hái nhiều thành công trong công việc. Cảm ơn mẹ vì những yêu thương và chăm sóc mẹ dành cho gia đình. Mong mẹ cũng luôn có thời gian cho bản thân, làm những điều mẹ thích và được yêu thương thật nhiều. Con cảm ơn mẹ nhiều! 💗"},
sister:{label:"Dành tặng em gái",name:"Em gái",theme:"sister",intro:"Một nhiệm vụ nhỏ dành cho em gái — không có đúng sai, cứ là chính mình nhé!",questions:[
["Gần đây có chuyện gì khiến em vui nhất?",["Một chuyện ở trường/công việc","Đi chơi với bạn","Một điều nhỏ xíu","Em muốn tự kể"]],
["Nếu cả nhà cùng chọn hoạt động cuối tuần này, em muốn làm gì?",["Đi ăn món ngon","Đi xem phim","Đi chơi đâu đó","Em có ý tưởng riêng"]],
["Có món ăn, món đồ hay nơi nào em muốn thử mà chưa có dịp không?",["Một món ăn mới","Một nơi muốn đến","Một món đồ đang thích","Điều khác"]],
["Dạo này em đang quan tâm hoặc muốn học thêm điều gì?",["Một kỹ năng mới","Sở thích sáng tạo","Thể thao hoặc sức khỏe","Em muốn tự kể"]],
["Nếu có một ngày hoàn toàn rảnh rỗi, em muốn dành ngày đó thế nào?",["Ngủ và nghỉ ngơi","Đi chơi với bạn","Ở nhà xem phim/chơi game","Làm điều mình thích"]],
["Có điều gì em muốn anh/chị hiểu hơn về mình không?",["Điều em đang cố gắng","Điều làm em vui/buồn","Cách anh/chị có thể giúp em","Em muốn nói bằng lời riêng"]]
],title:"Gửi em gái",message:"Chúc em có một ngày 20/10 thật vui, luôn tự tin và làm được những điều mình yêu thích. Mong em cố gắng trong học tập và có thể đỗ được vào ngôi trường mình mơ ước. Nếu có lúc thấy khó khăn, nhớ rằng em không cần tự giải quyết mọi thứ một mình nhé. Anh hai luôn yêu quý em! 💖"}};
const art="/gift-art.svg";
const SHEETS_ENDPOINT = import.meta.env.VITE_GOOGLE_SCRIPT_URL || "";
function Tile({id}){return <div className="tile" style={{backgroundImage:`url(${art})`,backgroundSize:"300% 200%",backgroundPosition:`${id%3*50}% ${Math.floor(id/3)*100}%`}}/>}
function App(){
const [screen,S]=useState("home"),[person,P]=useState("mom"),[step,T]=useState(0),[answers,A]=useState({}),[unlocked,U]=useState([]),[pieces,B]=useState([]),[selected,D]=useState(null),[placed,L]=useState([]),[saveState,SS]=useState("idle");
const d=journeys[person],q=d.questions[step],key=person+"-"+step,ans=answers[key]||{},progress=unlocked.length/6*100;
function start(p){P(p);T(0);A({});U([]);B([]);L([]);D(null);SS("idle");S("quiz")}
async function saveAnswers(){
  if(!SHEETS_ENDPOINT || saveState==="saving" || saveState==="saved") return;
  SS("saving");
  const payload={
    submissionId: `${person}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    personKey: person,
    personLabel: d.label,
    answers: d.questions.map((question,i)=>({
      questionNumber:i+1,
      question:question[0],
      choice:(answers[person+"-"+i]||{}).choice||"",
      note:(answers[person+"-"+i]||{}).note||""
    }))
  };
  try {
    await fetch(SHEETS_ENDPOINT,{
      method:"POST",
      mode:"no-cors",
      headers:{"Content-Type":"text/plain;charset=utf-8"},
      body:JSON.stringify(payload)
    });
    SS("sent");
  } catch (err) {
    SS("error");
  }
}
function answer(patch){A(old=>({...old,[key]:{...ans,...patch}}))}
function reveal(){
  if(!unlocked.includes(step)){U(old=>[...old,step]);B(old=>[...old,step].sort(()=>Math.random()-.5))}
  if(step===5) void saveAnswers();
  S("piece")
}
function next(){if(step<5){T(step+1);S("quiz")}else{B(old=>[...old].sort(()=>Math.random()-.5));L([]);D(null);S("puzzle")}}
function put(id,target){if(id===target){L(old=>old.includes(target)?old:[...old,target]);B(old=>old.filter(x=>x!==id))}D(null)}
return <main className="app"><header className="top"><button className="brand" onClick={()=>S("home")}><Flower2/> tm studio</button><span>20 · 10 · 2026</span></header>
{screen==="home"&&<section className="page hero"><div className="eyebrow"><Sparkles size={15}/> MỘT MÓN QUÀ NHỎ, MỘT TÌNH YÊU TO</div><div className="hero-art"><i>🌸</i><div className="envelope"><Heart size={38} fill="currentColor"/><small>for you</small></div><i>🌷</i></div><h1>Món quà nhỏ<br/><em>gửi mẹ và em gái!</em></h1><p className="lead">Không phải là những món quà vật chất, mà là những lời yêu thương, kỷ niệm và điều đặc biệt nhất từ trái tim.</p><div className="people">{["mom","sister"].map(p=><button className="person" key={p} onClick={()=>start(p)}><b>{p==="mom"?"🌷":"🌼"}</b><small>HÀNH TRÌNH {p==="mom"?"01":"02"}</small><strong>{journeys[p].label}</strong><span>{p==="mom"?"Một chút biết ơn, thật nhiều yêu thương.":"Câu hỏi gần gũi và món quà bất ngờ."}</span><em>Bắt đầu khám phá <ArrowRight size={15}/></em></button>)}</div><p className="tiny">♡ Làm bằng yêu thương, dành riêng cho gia đình mình.</p></section>}
{screen==="quiz"&&<section className="page game"><button className="back" onClick={()=>S("home")}><ArrowLeft size={14}/> Về trang đầu</button><div className="center"><div className="eyebrow"><Sparkles size={14}/> {d.label.toUpperCase()}</div><h1>Một câu hỏi nhỏ,<br/><em>một mảnh yêu thương.</em></h1><p>{d.intro}</p></div><div className="progress-label"><span>HÀNH TRÌNH CỦA {d.name.toUpperCase()}</span><b>{unlocked.length}/6 mảnh</b></div><div className="progress"><i style={{width:progress+"%"}}/></div><div className="columns"><div className="panel"><small className="count">CÂU HỎI {String(step+1).padStart(2,"0")} · 06</small><h2>{q[0]}</h2><div className="options">{q[1].map(opt=><button key={opt} className={ans.choice===opt?"option chosen":"option"} onClick={()=>answer({choice:opt})}><span>{ans.choice===opt?"✓":""}</span>{opt}</button>)}</div><label htmlFor="note">Hoặc viết câu trả lời của riêng mình <small>(không bắt buộc)</small></label><textarea id="note" rows="3" value={ans.note||""} onChange={e=>answer({note:e.target.value})} placeholder="Viết vài dòng nếu muốn chia sẻ..."/><p className="privacy">💗 Không có đáp án đúng hay sai. Bạn có thể chọn, viết hoặc để trống. Câu trả lời sẽ được gửi riêng vào bảng lưu của người tạo website.</p><button className="primary full" onClick={reveal}>Hoàn thành câu hỏi, nhận mảnh ghép <Heart size={15} fill="currentColor"/></button></div><aside className="panel preview"><div className="progress-label"><b>BỨC TRANH CỦA {d.name.toUpperCase()}</b><b>{unlocked.length}/6</b></div><div className="preview-image"><img src={art}/><div>{[0,1,2,3,4,5].map(i=><span key={i} className={unlocked.includes(i)?"shown":""}>{unlocked.includes(i)?"✿":<LockKeyhole size={15}/>}</span>)}</div></div><p>Mỗi câu hỏi hoàn thành mở một mảnh tranh. Cuối cùng, bạn sẽ tự tay ghép tất cả lại với nhau.</p></aside></div></section>}
{screen==="piece"&&<section className="page reveal"><div className="eyebrow"><Sparkles size={15}/> MẢNH GHÉP MỚI ĐÃ ĐƯỢC MỞ KHÓA</div><div className="big-piece">🧩</div><h1>Một mảnh yêu thương<br/><em>đã thuộc về bạn!</em></h1><p className="lead">Không cần trả lời đúng. Cảm ơn bạn đã dành một chút thời gian cho câu hỏi này.</p><div className="piece-sample"><Tile id={step}/></div><p className="subtle">{unlocked.length}/6 mảnh ghép đã tìm thấy</p><div className="progress"><i style={{width:progress+"%"}}/></div><button className="primary" onClick={next}>{step===5?"Đến bàn ghép tranh":"Tiếp tục khám phá"} <ArrowRight size={16}/></button><button className="back" onClick={()=>S("home")}>Về trang đầu</button></section>}
{screen==="puzzle"&&<section className="page game"><button className="back" onClick={()=>S("piece")}><ArrowLeft size={14}/> Quay lại</button><div className="center"><div className="eyebrow"><Gift size={14}/> ĐÃ ĐỦ TẤT CẢ MẢNH GHÉP</div><h1>Giờ đến lượt bạn <em>ghép tranh!</em></h1><p>Kéo từng mảnh vào đúng ô. Trên điện thoại, chạm vào mảnh rồi chạm vào ô muốn đặt.</p></div><div className="assembly"><div className="panel"><div className="progress-label"><b>BỨC TRANH YÊU THƯƠNG</b><b>{placed.length}/6</b></div><div className="board">{[0,1,2,3,4,5].map(id=><div className="cell" key={id} onDragOver={e=>e.preventDefault()} onDrop={()=>selected!==null&&put(selected,id)} onClick={()=>selected!==null&&put(selected,id)}>{placed.includes(id)?<Tile id={id}/>:<span>{id+1}</span>}</div>)}</div><div className="progress"><i style={{width:placed.length/6*100+"%"}}/></div></div><div className="panel bank"><h2>Mảnh ghép của bạn</h2><p>Hãy tìm số ở góc mảnh ghép và đặt vào ô cùng số.</p><div className="bank-grid">{pieces.map(id=><button key={id} draggable onDragStart={()=>D(id)} onDragEnd={()=>D(null)} onClick={()=>D(id)} className={selected===id?"bank-piece selected":"bank-piece"}><Tile id={id}/><span>{id+1}</span></button>)}</div>{selected!==null&&<p className="hint">Đã chọn mảnh {selected+1}. Chạm ô số {selected+1} để đặt.</p>}<button className="primary full" disabled={placed.length!==6} onClick={()=>S("card")}>{placed.length===6?"Mở tấm thiệp chúc mừng":"Ghép đủ 6 mảnh để mở thiệp"} <Heart size={15} fill="currentColor"/></button><button className="back" onClick={()=>{B(old=>[...old].sort(()=>Math.random()-.5));L([]);D(null)}}><RotateCcw size={14}/> Xáo trộn và thử lại</button></div></div></section>}
{screen==="card"&&<section className="page final"><div className="eyebrow"><Sparkles size={15}/> BẠN ĐÃ GHÉP HOÀN CHỈNH BỨC TRANH</div><img className="final-art" src={art} alt="Bức tranh mẹ và con gái trong khu vườn hoa"/><article className="letter"><small>✦ MỘT TẤM THIỆP DÀNH RIÊNG ✦</small><h1>{d.title},<br/><em>chúc mừng 20/10!</em></h1><p>{d.message}</p><div className="sign">Xin cảm ơn, ♡<br/><b>Minh</b></div></article><p className="subtle">Cảm ơn vì đã cùng hoàn thành món quà nhỏ này. Mong mỗi ngày đều có thêm một lý do để mỉm cười. 💗</p>{SHEETS_ENDPOINT&&<p className="save-status">{saveState==="saving"?"Đang gửi câu trả lời…":saveState==="sent"?"💗 Đã gửi yêu cầu lưu câu trả lời.":saveState==="error"?"Chưa gửi được câu trả lời. Hãy báo người tạo website kiểm tra kết nối.":"Câu trả lời sẽ được gửi khi hoàn thành câu hỏi cuối."}</p>}<button className="primary" onClick={()=>S("home")}>Về trang đầu <Heart size={15} fill="currentColor"/></button><button className="back" onClick={()=>start(person)}><RotateCcw size={14}/> Chơi lại hành trình này</button></section>}
<footer className="footer"><span>made with ♡ for 20/10</span><span>Một chút dịu dàng cho những người mình thương</span></footer></main>}
createRoot(document.getElementById("root")).render(<App/>);