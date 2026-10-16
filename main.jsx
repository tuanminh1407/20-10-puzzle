import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Heart, Flower2, Sparkles, LockKeyhole, Gift, ArrowRight, RotateCcw, Stars } from "lucide-react";
import "./style.css";

const journeys = {
  mom: {
    label: "Dành tặng mẹ", name: "Mẹ yêu", emoji: "🌷", theme: "mom",
    intro: "Một món quà nhỏ, gửi đến người luôn dành cho gia đình những điều lớn lao nhất.",
    questions: [
      { q: "Nếu được chọn một ngày nghỉ thật trọn vẹn, mẹ sẽ thích điều gì nhất?", opts: ["Được cả nhà quây quần bên nhau", "Đi chơi và khám phá nơi mới", "Ở nhà nghỉ ngơi, làm điều mình thích"], answer: 0, note: "Điều quý giá nhất đôi khi chỉ là được ở cạnh nhau. 💗" },
      { q: "Đâu là món quà mà mẹ xứng đáng nhận được mỗi ngày?", opts: ["Một bó hoa thật to", "Sự quan tâm và những lời yêu thương", "Một chiếc bánh thật ngon"], answer: 1, note: "Mẹ xứng đáng được yêu thương không chỉ riêng ngày hôm nay." },
      { q: "Hôm nay, con muốn nói với mẹ điều gì nhất?", opts: ["Con cảm ơn mẹ vì tất cả", "Mẹ nhớ nghỉ ngơi nhiều hơn nhé", "Con thương mẹ rất nhiều"], answer: null, note: "Dù con chọn cách nào, mong mẹ luôn cảm nhận được tình yêu của con." },
      { q: "Nếu gửi mẹ một điều ước, con sẽ chọn điều gì?", opts: ["Mẹ luôn khỏe mạnh và vui vẻ", "Cả nhà có thật nhiều chuyến đi", "Mỗi ngày đều có chuyện vui"], answer: null, note: "Mong những ngày của mẹ luôn có thật nhiều niềm vui." },
      { q: "Mẹ đoán xem, món quà cuối cùng là gì nào?", opts: ["Một điều bất ngờ nho nhỏ", "Một tấm thiệp đặc biệt", "Tất cả tình yêu của con"], answer: null, note: "Mẹ đã mở khóa mảnh ghép cuối cùng rồi! 🌸" }
    ],
    title: "Gửi mẹ yêu thương",
    message: "Nhân ngày Phụ nữ Việt Nam 20/10, con chúc mẹ luôn mạnh khỏe, bình an và thật nhiều niềm vui. Cảm ơn mẹ vì những yêu thương, hy sinh và chăm sóc dành cho gia đình. Mong mẹ luôn nhớ rằng mẹ cũng xứng đáng được nâng niu, nghỉ ngơi và hạnh phúc. Con yêu mẹ thật nhiều! 💗"
  },
  sister: {
    label: "Dành tặng em gái", name: "Em gái", emoji: "🌼", theme: "sister",
    intro: "Một nhiệm vụ bí mật dành cho cô em gái đáng yêu (và đôi khi hơi đáng ghét) nhất nhà.",
    questions: [
      { q: "Một ngày hoàn hảo của em sẽ có gì?", opts: ["Đồ ăn ngon và được ngủ nướng", "Đi chơi cùng hội bạn", "Có quà bất ngờ"], answer: null, note: "Nghe cái nào cũng hợp lý hết á! 😆" },
      { q: "Nếu được nhận một siêu năng lực, em chọn gì?", opts: ["Đọc suy nghĩ người khác", "Dịch chuyển tức thời", "Ăn bao nhiêu cũng không tăng cân"], answer: null, note: "Lựa chọn này cần được nghiên cứu khoa học nghiêm túc. 😂" },
      { q: "Ai là người thỉnh thoảng trêu em nhưng vẫn thương em?", opts: ["Anh/chị của em chứ ai", "Hàng xóm", "Một người bí ẩn"], answer: 0, note: "Chính xác! Trêu là phụ, thương em là chính. 💗" },
      { q: "Ngày 20/10 này, em muốn nhận điều gì?", opts: ["Một lời chúc thật dễ thương", "Một món quà xịn xò", "Cả hai thì càng tốt"], answer: null, note: "Biết ngay mà, ai lại từ chối quà chứ! 🎁" },
      { q: "Câu hỏi cuối: em có biết mình rất đáng yêu không?", opts: ["Biết chứ, khỏi nói", "Cũng hơi hơi", "Cho em thêm một món quà rồi em trả lời"], answer: null, note: "Câu trả lời nào cũng được duyệt nhé! 🌼" }
    ],
    title: "Gửi cô em gái",
    message: "Chúc em gái có một ngày 20/10 thật vui vẻ, luôn tự tin, xinh xắn theo cách riêng và làm được những điều mình yêu thích. Mong em gặp nhiều người tốt, có thật nhiều trải nghiệm đáng nhớ và dù lớn đến đâu cũng luôn giữ được sự hồn nhiên của mình. P/S: Anh/chị có thể trêu em hơi nhiều, nhưng vẫn luôn đứng về phía em đó nha! 💖"
  }
};

function App() {
  const [screen, setScreen] = useState("home");
  const [person, setPerson] = useState("mom");
  const [step, setStep] = useState(0);
  const [unlocked, setUnlocked] = useState([]);
  const [choice, setChoice] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState({ mom: false, sister: false });
  const data = journeys[person];
  const question = data.questions[step];

  useEffect(() => {
    document.title = screen === "card" ? `${data.title} 💗` : "Món quà nhỏ ngày 20/10 💗";
  }, [screen, data.title]);

  function startJourney(key) {
    setPerson(key); setStep(0); setUnlocked([]); setChoice(null); setShowHint(false); setScreen("quiz");
  }
  function submitAnswer() {
    if (choice === null) return;
    if (question.answer !== null && choice !== question.answer) {
      setShowHint(true); return;
    }
    setUnlocked(prev => prev.includes(step) ? prev : [...prev, step]);
    setShowHint(false);
    setScreen("piece");
  }
  function nextQuestion() {
    if (step + 1 >= data.questions.length) {
      setCompleted(prev => ({ ...prev, [person]: true }));
      setScreen("card");
    } else {
      setStep(step + 1); setChoice(null); setShowHint(false); setScreen("quiz");
    }
  }
  function goHome() { setScreen("home"); }
  const progress = unlocked.length / data.questions.length * 100;

  return <main className={`app ${data.theme}`}>
    <div className="ambient ambient-one"></div><div className="ambient ambient-two"></div>
    <header className="topbar"><div className="brand"><span className="brand-icon"><Flower2 size={19}/></span> little love studio</div><span className="date-pill">20 · 10 · 2026</span></header>

    {screen === "home" && <section className="hero page">
      <div className="eyebrow"><Sparkles size={15}/> MỘT MÓN QUÀ NHỎ, MỘT TÌNH YÊU TO</div>
      <div className="hero-art" aria-hidden="true"><span className="spark s1">✦</span><span className="spark s2">✧</span><span className="flower flower-a">🌸</span><span className="flower flower-b">🌷</span><span className="flower flower-c">🌼</span><div className="envelope"><Heart size={38} fill="currentColor"/><span>for you</span></div></div>
      <h1>Một chút yêu thương<br/><em>gửi người đặc biệt.</em></h1>
      <p className="hero-copy">Có hai món quà nhỏ đang chờ được khám phá. Trả lời vài câu hỏi, mở khóa những mảnh ghép và tìm tấm thiệp bí mật nhé!</p>
      <div className="recipient-grid">
        <button className="recipient-card mom-card" onClick={() => startJourney("mom")}><span className="recipient-emoji">🌷</span><span className="recipient-label">Món quà số 01</span><strong>Dành tặng mẹ</strong><span className="card-desc">Một chút biết ơn, thật nhiều yêu thương.</span><span className="card-action">Bắt đầu khám phá <ArrowRight size={16}/></span></button>
        <button className="recipient-card sister-card" onClick={() => startJourney("sister")}><span className="recipient-emoji">🌼</span><span className="recipient-label">Món quà số 02</span><strong>Dành tặng em gái</strong><span className="card-desc">Nhiệm vụ bí mật cho cô em đáng yêu.</span><span className="card-action">Bắt đầu khám phá <ArrowRight size={16}/></span></button>
      </div>
      <div className="tiny-note"><Heart size={13} fill="currentColor"/> Làm bằng tất cả sự yêu thương, dành riêng cho gia đình mình.</div>
    </section>}

    {screen === "quiz" && <section className="game-layout page">
      <button className="back-link" onClick={goHome}>← Về trang đầu</button>
      <div className="game-heading"><div className="eyebrow"><Sparkles size={14}/> MÓN QUÀ CỦA {data.name.toUpperCase()}</div><h1>Mở khóa mảnh ghép <em>#{step + 1}</em></h1><p>{data.intro}</p></div>
      <div className="progress-row"><span>TIẾN ĐỘ KHÁM PHÁ</span><strong>{unlocked.length}/{data.questions.length} mảnh</strong></div><div className="progress-track"><div style={{width:`${progress}%`}}/></div>
      <div className="game-columns">
        <div className="question-card"><div className="question-count">CÂU HỎI {String(step+1).padStart(2,"0")} <span>·</span> {data.questions.length}</div><h2>{question.q}</h2><div className="options">{question.opts.map((opt,i)=><button key={opt} className={`option ${choice===i?"selected":""}`} onClick={()=>{setChoice(i);setShowHint(false)}}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{opt}</span><span className="option-check">{choice===i?"✓":"+"}</span></button>)}</div>
          {showHint && <p className="hint">Chưa phải lựa chọn đó, thử lại nhé! 💗</p>}
          <button className="primary-btn full" disabled={choice===null} onClick={submitAnswer}>Mở mảnh ghép <Heart size={16} fill="currentColor"/></button>
          <p className="gentle-note">Đây không phải bài kiểm tra đâu — cứ chọn điều bạn nghĩ nhé.</p>
        </div>
        <div className="puzzle-card"><div className="puzzle-title"><span>HỘP MẢNH GHÉP</span><span>{unlocked.length} / {data.questions.length}</span></div><div className="mini-puzzle">{data.questions.map((q,i)=><div key={i} className={`mini-piece ${unlocked.includes(i)?"is-open":""}`}>{unlocked.includes(i)?<span>{["🌷","💗","🌼","✨","💌"][i%5]}</span>:<LockKeyhole size={19}/>}</div>)}</div><p>{unlocked.length===0?"Mỗi câu trả lời sẽ hé lộ một phần món quà.":`Bạn đã tìm được ${unlocked.length} mảnh yêu thương.`}</p><div className="puzzle-flower">🌸</div></div>
      </div>
    </section>}

    {screen === "piece" && <section className="reveal page"><div className="eyebrow"><Sparkles size={15}/> MỘT MẢNH YÊU THƯƠNG ĐÃ ĐƯỢC MỞ</div><div className="reveal-icon">{["🌷","💗","🌼","✨","💌"][step%5]}</div><h1>Ting ting! <em>Mở khóa thành công!</em></h1><p className="reveal-note">{question.note}</p><div className="reveal-progress">{unlocked.length} / {data.questions.length} mảnh ghép đã tìm thấy</div><div className="progress-track"><div style={{width:`${progress}%`}}/></div><div className="mini-puzzle reveal-puzzle">{data.questions.map((q,i)=><div key={i} className={`mini-piece ${unlocked.includes(i)?"is-open":""}`}>{unlocked.includes(i)?<span>{["🌷","💗","🌼","✨","💌"][i%5]}</span>:<LockKeyhole size={19}/>}</div>)}</div><button className="primary-btn" onClick={nextQuestion}>{step+1===data.questions.length?"Xem tấm thiệp của mình":"Tiếp tục khám phá"} <ArrowRight size={17}/></button><button className="text-btn" onClick={goHome}>Để sau khám phá tiếp</button></section>}

    {screen === "card" && <section className="final page"><div className="eyebrow"><Stars size={15}/> BẠN ĐÃ MỞ KHÓA TẤT CẢ MẢNH GHÉP</div><div className="final-art"><div className="final-flower f1">🌷</div><div className="final-flower f2">🌸</div><div className="final-flower f3">🌼</div><div className="final-heart"><Heart size={35} fill="currentColor"/></div><span className="final-ribbon">20 · 10</span></div><div className="card-paper"><div className="paper-top">✦ MỘT TẤM THIỆP DÀNH RIÊNG ✦</div><h1>{data.title},<br/><em>chúc mừng 20/10!</em></h1><p>{data.message}</p><div className="paper-sign">Thương thật nhiều, <span>♡</span><br/><strong>Gia đình mình</strong></div><div className="paper-flower">❀</div></div><p className="final-caption">Món quà nhỏ đã hoàn thành. Mong hôm nay và những ngày sau nữa đều có thật nhiều yêu thương. 💗</p><div className="final-actions"><button className="primary-btn" onClick={goHome}>Về trang đầu <Heart size={16} fill="currentColor"/></button><button className="secondary-btn" onClick={()=>startJourney(person)}><RotateCcw size={16}/> Chơi lại hành trình này</button></div>{completed.mom&&completed.sister&&<p className="both-done">🎉 Cả hai món quà đều đã được mở khóa!</p>}</section>}

    <footer className="footer"><span>made with ♡ for 20/10</span><span>một chút dịu dàng cho những người mình thương</span></footer>
  </main>
}

createRoot(document.getElementById("root")).render(<App />);