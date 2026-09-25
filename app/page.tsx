"use client";

import { useMemo, useState } from "react";

const slots = [
  ["Neon Fruits","🍒 🍋 🍉"],["Royal 7s","7️⃣ 7️⃣ 7️⃣"],["Blue Moon","🌙 💎 🔷"],["Red Crown","👑 🔥 💎"],
  ["Lucky Stars","⭐ ⭐ 💎"],["Cyber Bar","🍫 ⚡ 7️⃣"],["Ocean Riches","🌊 💎 🐬"],["Dragon Gold","🐉 🪙 🔥"],
  ["Midnight","🌑 🃏 💎"],["Turbo Gems","💠 ⚡ 💠"]
];

export default function Home() {
  const [balance,setBalance]=useState(1000), [bet,setBet]=useState(10), [lang,setLang]=useState<"ru"|"en">("ru");
  const [tab,setTab]=useState("games"), [result,setResult]=useState(""), [bonus,setBonus]=useState(false);

  const labels = useMemo(()=>lang==="ru"
    ? {games:"Игры",slots:"Слоты",bonus:"Бонусы",profile:"Профиль",play:"Играть",balance:"Баланс",welcome:"Добро пожаловать в KarjoMoney",demo:"Только виртуальные монеты",quick:"Быстрые игры",register:"Регистрация / Вход"}
    : {games:"Games",slots:"Slots",bonus:"Bonuses",profile:"Profile",play:"Play",balance:"Balance",welcome:"Welcome to KarjoMoney",demo:"Virtual coins only",quick:"Quick games",register:"Register / Sign in"}, [lang]);

  function spin(name:string){
    if(balance<bet){setResult(lang==="ru"?"Недостаточно монет":"Not enough coins");return;}
    const win = Math.random()<0.36 ? bet * [2,3,5,10,25][Math.floor(Math.random()*5)] : 0;
    setBalance(b=>b-bet+win);
    setResult(win ? `${name}: +${win} 🪙` : `${name}: 0`);
  }
  return <main>
    <header className="top"><div className="brand">K<span>J</span> • KarjoMoney</div>
      <nav>{["games","slots","bonus","profile"].map(k=><button key={k} onClick={()=>setTab(k)} className={tab===k?"active":""}>{labels[k as keyof typeof labels]}</button>)}</nav>
      <div className="right"><button onClick={()=>setLang(lang==="ru"?"en":"ru")} className="lang">{lang.toUpperCase()}</button><div className="balance">🪙 {balance.toLocaleString()}</div></div>
    </header>
    <section className="hero"><div><div className="eyebrow">DEMO CASINO • NO REAL MONEY</div><h1>{labels.welcome}</h1><p>{labels.demo}. Стартовый баланс: <b>1 000</b> coins.</p><button className="primary" onClick={()=>setTab("slots")}>{labels.play} <span>→</span></button></div>
      <div className="hero-card"><span>LIVE</span><strong>{balance.toLocaleString()} 🪙</strong><small>{labels.balance}</small></div>
    </section>
    <section className="grid">
      <div className="panel wide"><div className="panel-head"><div><h2>{labels.slots}</h2><p>10 premium demo slots</p></div><label>Bet <input type="number" min="10" step="10" value={bet} onChange={e=>setBet(Math.max(10,Number(e.target.value)||10))}/></label></div>
        <div className="slots">{slots.map(([name,icons])=><article className="slot" key={name}><div className="slot-art">{icons}</div><h3>{name}</h3><button onClick={()=>spin(name)}>{labels.play}</button></article>)}</div>
        {result && <div className="result">{result}</div>}
      </div>
      <aside className="panel"><h2>{labels.bonus}</h2><div className="bonus-box"><b>+250 🪙</b><span>Daily demo bonus</span><button onClick={()=>{setBalance(b=>b+(bonus?0:250));setBonus(true)}} disabled={bonus}>{bonus?"Claimed":"Claim bonus"}</button></div><hr/><h3>{labels.quick}</h3><div className="quick"><button onClick={()=>setResult("Crash 🚀 — demo round ready")}>🚀 Crash</button><button onClick={()=>setResult("Mines 💣 — choose a tile")}>💣 Mines</button></div><div className="profile-box">👤 {labels.register}<small>Demo account • verification-ready UI</small></div></aside>
    </section>
    <footer>KarjoMoney © 2026 · Virtual currency only · No deposits · No withdrawals</footer>
  </main>
}
