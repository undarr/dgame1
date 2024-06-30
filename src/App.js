import { useState, useEffect, useRef } from "react";
import FadeInOut from "./FadeInOut";

function App() {

  function getlocalstorage(tag,d) {
    return(localStorage.getItem(tag)!==null ? JSON.parse(localStorage.getItem(tag)) : d)
  }

  const [frame, sframe]=useState(-2);
  const vframe=useRef(-2);
  useEffect(() => {
    vframe.current=frame;
  },[frame])
  const [checkbag, scheckbag]=useState(false);
  const [startingframe, sstartingframe] = useState(1);
  const [ongoinggame, songoinggame] = useState(getlocalstorage('ongoinggame',false));
  const [speaking, sspeaking] = useState(getlocalstorage('speaking',""));
  const [disctext, sdisctext] = useState(getlocalstorage('disctext',""));
  const vdisctext=useRef(getlocalstorage('disctext',""));
  const vtodisctext = useRef(getlocalstorage('todisctext',""));
  const vshowspeed = useRef(getlocalstorage('showspeed',50));
  useEffect(() => {
    vdisctext.current=disctext;
  },[disctext])

  const [showprogbut, sshowprogbut] = useState(getlocalstorage('showprogbut',false));
  const [visited, svisited] = useState(getlocalstorage('visited',[false,false,false,false,false]));
  const vcpath = useRef(getlocalstorage('cpath',0));
  const [cprog, scprog] = useState(getlocalstorage('cprog',-1));

  function startnewgame() {
    songoinggame(true);
    sframe(getlocalstorage('frame',-1));
    vcpath.current=0;
    scprog(-1);
    scheckbag(false);
    sspeaking("");
    sdisctext("");
    vtodisctext.current="";
    sshowprogbut(false);
    svisited([false,false,false,false,false]);
  }
  
  function startingmenu(n) {
    if (n===1) {
      return(<>
      <div id="starttitle">《U記》</div>
      <div id="startdes">Phase 1.0 之迷</div>
      <button className="startbutton" onClick={() => {sstartingframe(11);}}>開始遊戲</button>
      <button className="startbutton">關於 UCM</button>
      <button className="startbutton">關於 Stack Undarflow</button>
      <br></br>
      <div id="startdes">真人真事Dgame.</div>
      </>)
    }
    if (n===11) {
      return(<>
      <div id="starttitle">《U記》</div>
      <div id="startdes">Phase 1.0 之迷</div>
      {ongoinggame ? <button className="startbutton" onClick={() => {sframe(getlocalstorage('frame',-1));}}><div>繼續遊戲</div></button>
      : <button className="startbutton disabled">繼續遊戲</button>
      }
      {ongoinggame ? <button className="startbutton" onClick={() => {sstartingframe(111);}}><div style={{"fontSize":"5vh"}}>開始新遊戲</div>
      <div style={{"fontSize":"2vh"}}>⚠ 警告，開始新遊戲將會清除目前遊戲的進度 ⚠</div></button>
      : <button className="startbutton" onClick={() => {sstartingframe(111);}}>開始新遊戲</button>}
      <button className="startbutton" onClick={() => {sstartingframe(1);}}>返回</button>
      <br></br>
      <div id="startdes">真人真事Dgame.</div>
      </>)
    }
    if (n===111) {
      return(<>
      <div id="starttitle">《U記》</div>
      <div id="startdes">Phase 1.0 之迷</div>
      <div id="bgnote">
        <div className="fullop">背景:<br></br>
        多年嚟, Stack Undarflow 內部運作模式十分複雜, 亦不幸地喺其中牽涉到<span className="boldy">多單致命意外🥶</span>。 Stack Undarflow嘅内部團隊一直嘗試隱藏真相, 卻因此背後不斷深受壓力, 最終亦無奈令Stack Undarflow喺2024年2月短暫停辦😔😔. 
        為保障Stack Undarflow Phase 2嘅持續運行, Stack Undarflow嘅內部團隊認為有責任向公眾釐清真相, 並聚集咗5位知情人士, 今晚同大家敍述佢哋對事情嘅認知...</div></div>
      <button className="startbutton2" style={{"width":"25%","height":"8vh"}} onClick={() => {startnewgame();}}>開始 DGame!</button>
      </>)
    }
  }
  //{checkbag ? "bagoverlay" : "hide"}

  const chat=useRef([[],[["咦, 你過嚟搵我做咩呀?", "唉, Stack Undarflow嘅真相… 講起又諗起返組媽,", "而一諗起就唔開心...",
    "開始講之前, 我哋先一齊悼念組媽啦, 佢2021年尾起呢度沉船走咗…", "*攞起白花", "組媽, 我哋多謝妳...", "多謝妳對組爸嘅愛...", "多謝妳幫咗我哋...", "我哋會永遠記住妳...",
    "*放低白花", "點解Mandy會唔鍾意我㗎... 點解呀...", ""],

  ["咦, 你過嚟搵我做咩呀?", "u11", "u12", "u13", ""]],

  [["咦, 你過嚟搵我做咩呀?", "唉, Stack Undarflow嘅真相...", "其實Stack Undarflow嘅故事一開始都好單純, 但係後來真係複雜好多...", "可能我畀啲背景大家先...",
    "我Year 1嘅時候, 我喺團契識咗呀U同一個女仔, 當時我哋三個係好close好firm嘅frd,", "但係後來呀U同嗰個女仔拍咗拖冇幾耐就出咗事, 仲唔小心連累埋我...",
    "個女仔就起意外死咗, 而我同呀U都再返唔返去以前嘅生活...", "一開始, 我同呀U都想活返以前嘅生活... 就好努力咁嘗試整啲嘢返轉頭.",
    "但係後來出咗件事, 搞到我覺得自己返轉頭有啲唔負責任...", "不過件事都有啲恐怖, 我都唔係幾想再提, 你哋自己睇啦...", "*呀P畀咗一張日記紙你, 請查看背包...",
    "所以我一直都唔清楚應唔應該返轉頭, 但係我知呀U一直都想翻返轉頭,  所以我一開始都係聽佢指示幫佢...", "但係慢慢我習慣咗而家嘅生活, 我都慢慢開始move on...",
    "之後我就識咗你哋組爸, 佢當時創立Stack Undarflow真係好單純教啲Year 1做數.", "嗰時我好欣賞組爸, 啲event我都成日幫佢手, 我就寧願留低幫手, 就冇咁想翻去, 你哋望吓...",
    "*呀P畀咗幾幅相你, 請查看背包...", "直到有日我喺度開始拍拖, 我就決定咗留低, 唔再翻去...", "但係之後我同組爸上CSA莊就出咗件事, 呀U先開始接任Stack Undarflow...",
    "而嗰時呀U又好似因為我唔想返翻去, 就同我反咗面, 所以我之後都冇乜點再搵佢...", "其實我都有諗過自己有冇做錯嘢...",
    "我淨係知道出咗事之後, Stack Undarflow 唔再係以前咁單純...", "但係Stack Undarflow而家係點我都唔知, 可能你哋都要問下其他人研究吓... 加油啦...", ""
  ],

  ["咦, 你過嚟搵我做咩呀?", "呀呢份minutes係呀, 當時CSA踢人出莊呢壇嘢...", "p12", "p13", ""]],

  [["咦, 你過嚟搵我做咩呀?", "唉Stack Undarflow 嘅真相... 真係講到悶...", "大家都知㗎啦... 咪你哋嘅組爸Undar當年追呀組媽追唔到...", "追唔到就走咗去沉船, 就起咗個Stack Undarflow 出嚟啦...",
    "佢話咩想透過教啲Year 1學生, 搵返當年教組媽嘅感覺喎...", "呢個故事真係聽到悶, 不過可能你都未知組媽係邊個...", "我都唔好意思咁直接啦, 我畀啲線索你哋, 你哋就估吓組媽嘅IG, 估完就同我講啦~",
    "@ 13 1 14 4 25 6 21 14 7 _ 0 H A H", "係啦, Stack Undarflow嘅組媽就係@mandyfung_0818嘅Mandy啦...", "咁我又可以講多少少嘅...", "2021年9月嘅時候, 我就係一場Year 2 CS lecture識咗Undar,",
    "當年佢Year 1上Year 2嘅Lecture, 我已經知佢讀書好痴線...", "後來佢介紹咗佢個Omate, Pilot畀我識... 當時我哋三個係好close好firm嘅frd,",
    "咁呀Undar起OCamp隔離組識咗Mandy, 就想追佢... 然後就不斷教佢讀書, 咁我同呀Pilot一直都幫緊佢做軍師...", "但係佢最後喺12月表白失敗... 失敗咗之後佢就搵我同Pilot嚟呢度隊酒去呻...",
    "不過咁啱前一日呀Pilot踢波拗柴要留院, 就得返我一個陪佢...", "佢嗰日喺度真係喊到痴線㗎, 我畀條片你睇喇...", "*Shows video about Undar cry (Undar: 哎呀Zepa我真係好唔開心呀, 點解Mandy會唔鍾意我㗎... 點解呀...)",
    "嗰晚佢己經隊酒隊到冧冧哋, 第二日仲要考試, 然後佢仲要話搭船返屋企散心...", "我都知道佢會出事, 然後果然啦, 佢呢架船上面嘔... 佢真係好彩有我陪佢...",
    "我真係唔知點解佢咁鍾意Mandy, 佢後來仲寫埋份追女日記... 我都唔講笑, 佢真係好癲... 你自己睇下喇...", "*呀Z畀咗份劇本你, 請查看背包...",
    "係囉, 然後佢2022年9月就開始搞Stack Undarflow紀念組媽啦...", "不過2022年其實好怪...", "年頭呀Pilot第五波中咗肺炎, 然後就去咗竹篙灣隔離, 隔離完出返嚟之後就開始唔理我同Undar,",
    "姐係以前佢每個禮拜都會主動搵我踢波, 但係後來就連我搵返佢... 佢都唔肯出嚟...", "唔知佢係拗柴驚咗定咩, 但係後來係我約佢咩, 佢都唔覆機... 真係唔知咩事...",
    "當時佢都搞到我同Undar好唔開心, 但係之後去到2023年6月, 呀Undar又開始好似變到佢咁...", "唔知佢同Pilot忙緊咩變到機都唔覆咁... 聽返嚟呀Pilot就拍緊拖, 呀Undar就好似識咗個叫Christine嘅女仔, 但係又唔知真定假...",
    "我唔希望佢哋重色輕友啦, 但係我就覺得好似突然間冇咗兩個best friend咁... 就算今日, 都係呀Arthur叫我嚟, 而唔係Undar搵我...", "呀Arthur係我2021年尾起一場數碼港Hackathon嘅, 嗰日我仲識埋佢個中同Glisson...",
    "2023年尾, 我哋又去同一個數碼港Hackathon, 我先知原來佢哋兩個都係Stack Undarflow嘅組仔...", "然後嗰日我問起呀Undar嘅事, 呀Glisson就透露咗Undar喺Stack Undarflow研究緊啲嘢...",
    "佢影低咗Undar咗啲文件send畀我, 我嗰下真係呆咗, 你哋望吓...", "*呀Z畀咗啲文件截圖你, 請查看背包", "即係我知道Undar讀書勁嘅, 但係我冇諗過佢會數學CS勁到寫到呢啲嘢出嚟嘅level...",
    "我淨係知咁多咋, Stack Undarflow而家搞緊咩我都唔太清楚, 可能你哋要加油再研究下啦...", ""
  ],

  ["咦, 你過嚟搵我做咩呀?", "咦, 呢份新聞我認得喎...", "因為我同Undar搭船然後佢無啦啦嘔嗰晚呢, 突然聽到起海底有爆炸", "雖然好細聲, 但係海底爆海面都聽到真係有啲誇張...",
    "爆嗰吓仲見到啲海水發緊啲紫色光出嚟... 我真係唔知道點解機件過舊係可以爆到啲紫色光出嚟...", "或者可能嗰晚我掛住睇住呀Undar, 同埋自己都醉醉哋, 自己冇睇得咁清楚,",
    "但係爆咗之後, 我好似見到三條影緣住啲紫色光游上嚟,", "但係游游吓就淨返兩條影...", "之後個紫色光就褪咗...", "我都唔知自己望到啲咩, 因為之後好似都冇新聞講相關嘅事. 淨係得機件過舊嘅新聞...",
    "可能自己嗰晚真係醉醉哋, 唔知啦...", ""
  ]],

  [["咦, 你過嚟搵我做咩呀?", ""],

  ["咦, 你過嚟搵我做咩呀?", ""]],

  [["咦, 你過嚟搵我做咩呀?", ""],

  ["咦, 你過嚟搵我做咩呀?", ""]]])

  function matchdistext() {
    if (vtodisctext.current!==vdisctext.current) {
      if (vtodisctext.current.slice(0,vdisctext.current.length)!==vdisctext.current) {
        setTimeout(()=>{
          sdisctext("");
          matchdistext();
        },1)
      }
      else {
        setTimeout(()=>{
          if (vtodisctext.current[vdisctext.current.length]!==undefined) {
            sdisctext(vdisctext.current+vtodisctext.current[vdisctext.current.length]);
            matchdistext();
          }
        },vshowspeed.current)
      }
    }
  }

  function progchat() {
    console.log(vframe.current,vcpath.current,cprog+1);
    sshowprogbut(false);
    scprog(cprog+1);
    vtodisctext.current=chat.current[vframe.current][vcpath.current][cprog+1];
    const time=Math.max(1000,70*vtodisctext.current.length);
    vshowspeed.current=Math.floor(time/chat.current[vframe.current][vcpath.current][cprog+1].length);
    if (vtodisctext.current==="") {
      sdisctext("");
      sspeaking("");
      const temp=[...visited]
      temp[frame-1]=true;
      svisited(temp);
    }
    else {
      matchdistext();
      setTimeout(() => {sshowprogbut(true);},time+500);
    }
  }

  function startingchat() {
    setTimeout(() => {scprog(-1); progchat(); sspeaking(["","呀U: ","呀P: ","呀Z: ","呀A: ","呀L: "][vframe.current])},1250)
    setTimeout(() => {sshowprogbut(true);},2500)
  }

  return (
    <div className="App">
      <div className="bgfull" style={{"backgroundImage":"url(./img/bg.png)"}}></div>
      <div className="header">
      <h1 className="header-left">U記 - Phase 1.0 之迷</h1>
      <div className="header-right"><h1>⠀UCM</h1></div>
      <button className="mutebutton" onClick={() => {}} style={{"backgroundImage" : ""}}></button>
      <div style={{clear: "both"}}></div>
      </div>
      <FadeInOut show={frame===-2} duration={1000}>
        <div className="startframe frame">
          {startingmenu(startingframe)}
        </div>
      </FadeInOut>
      <FadeInOut show={frame>=-1} duration={1000}>
        <button className="backbutton" style={{"zIndex":(checkbag ? 3 : 11)}} onClick={() => {sstartingframe(1); sframe(-2);}}></button>
        <div className="bagoverlay" style={{"width":(checkbag ? "100%" : "0%")}}>
          <div className={checkbag ? "bagoverlayin" : "hide"}>
            <button className="backbuttonoverlayed" onClick={() => {sstartingframe(1); sframe(-2); scheckbag(false);}}></button>
            <div id="startdes">背包</div>
            <button className="startbutton" onClick={() => {scheckbag(false);}}>返回</button>
          </div>
        </div>
      </FadeInOut>
      <FadeInOut show={frame===-1} duration={1000}>
      <div className="frame">
        <button id="map" style={{"backgroundImage":"url(./img/map.png)"}}></button>
        <button className="genbutton" style={{"top":"70vh", "right":"5vh"}} onClick={() => {scheckbag(true);}}>查看背包</button>
        <button className="ppbut" style={{"top":"6vh", "right":"75vh", "backgroundImage":"url(./img/u.png)"}} onClick={() => {sframe(1); startingchat();}}></button>
        <button className="ppbut" style={{"top":"60vh", "right":"119vh", "backgroundImage":"url(./img/p.png)"}} onClick={() => {sframe(2); startingchat();}}></button>
        <button className="ppbut" style={{"top":"46vh", "right":"146vh", "backgroundImage":"url(./img/z.png)"}} onClick={() => {sframe(3); startingchat();}}></button>
        <button className="ppbut" style={{"top":"62vh", "right":"51vh", "backgroundImage":"url(./img/a.png)"}} onClick={() => {sframe(4); startingchat();}}></button>
        <button className="ppbut" style={{"top":"15vh", "right":"45vh", "backgroundImage":"url(./img/l.png)"}} onClick={() => {sframe(5); startingchat();}}></button>
      </div>
      </FadeInOut>
      <FadeInOut show={frame>=1} duration={1000}>
      <div className="frame">
        <button className="genbutton" style={{"top":"55vh", "right":"22vh"}} onClick={() => {sframe(-1); scprog(-1); sdisctext(""); sshowprogbut(false);}}>{"<"}返回地圖</button>
        <button className="genbutton" style={{"top":"55vh", "right":"0vh"}} onClick={() => {scheckbag(true);}}>查看背包</button>
        <div className="circle" style={{"bottom":"3vh", "left":"5vh", "width":"30vh", "height":"30vh", "backgroundImage":"url(./img/"+["blankppl","u","p","z","a","l"][Math.max(0,frame)]+".png)"}}></div>
        <div className="tbub">
          {frame>0 && cprog!==-1 ? speaking+disctext : ""}
          {!showprogbut ? <></> :
           cprog!==0 ? <button className="genbutton" style={{"bottom":"1.5vh", "right":"3vh", "width":"5vh"}} onClick={() => {progchat();}}> {">"} </button>
          : visited[frame-1] ? 
          <><button className="genbutton" style={{"bottom":"1.5vh", "right":"45vh", "width":"50vh"}} onClick={() => {vcpath.current=0; progchat();}}>我想探問Stack Undarflow嘅真相!</button>
          <button className="genbutton" style={{"bottom":"1.5vh", "right":"3vh", "width":"40vh"}} onClick={() => {vcpath.current=1; progchat();}}>關於呢樣嘢, 我想問多少少...</button></>
          : <button className="genbutton" style={{"bottom":"1.5vh", "right":"3vh", "width":"50vh"}} onClick={() => {vcpath.current=0; progchat();}}>我想探問Stack Undarflow嘅真相!</button>}
        </div>
      </div>
      </FadeInOut>
    <footer><div className="footer1">an Undarfly Project since 10th June 2024, by Ulfred Chan</div></footer>
    </div>
  );
}

export default App;