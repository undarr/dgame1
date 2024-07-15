import bgm from "./bgm.mp3"
import { React, useState, useEffect, useRef } from "react";
import FadeInOut from "./FadeInOut";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function App() {

  function getlocalstorage(tag,d) {
    return(localStorage.getItem(tag)!==null ? JSON.parse(localStorage.getItem(tag)) : d)
  }

  const [frame, sframe]=useState(-2);
  const vframe=useRef(-2);
  useEffect(() => {
    if (frame!==-2) {localStorage.setItem('frame',JSON.stringify(frame));}
    vframe.current=frame;
  },[frame])
  const [checkbag, scheckbag]=useState(getlocalstorage('checkbag',-1));
  const [checkbag2, scheckbag2]=useState(getlocalstorage('checkbag2',1));
  const [startingframe, sstartingframe] = useState(1);
  const [ongoinggame, songoinggame] = useState(getlocalstorage('ongoinggame',false));
  const [speaking, sspeaking] = useState(getlocalstorage('speaking',""));
  const [disctext, sdisctext] = useState(getlocalstorage('todisctext',""));
  const vdisctext=useRef(getlocalstorage('todisctext',""));
  const vtodisctext = useRef(getlocalstorage('todisctext',""));
  const vshowspeed = useRef(getlocalstorage('showspeed',50));
  useEffect(() => {
    vdisctext.current=disctext;
  },[disctext])

  const [showprogbut, sshowprogbut] = useState(true);
  const [visited, svisited] = useState(getlocalstorage('visited',[[false,false,false,false,false],[false,false,false,false,false]]));
  const [bagitem, sbagitem] = useState(getlocalstorage('bagitem',["0","1","遊戲說明卡","劇本","2021年U報","2023年U報","P的日記","EGM會議紀錄","相片","文件截圖"]));
  const vcpath = useRef(getlocalstorage('cpath',0));
  const [cprog, scprog] = useState(getlocalstorage('cprog',-1));
  const vcprog = useRef(getlocalstorage('cprog',0));
  const [noclick, snoclick] = useState(false);
  const [qnpc, sqnpc] = useState(getlocalstorage('qnpc',false));
  const [muted, smuted] = useState(true);
  const [mapinfoppl, smapinfoppl] = useState("")

  useEffect(() => {
    localStorage.setItem('checkbag',JSON.stringify(checkbag));
  },[checkbag])

  useEffect(() => {
    localStorage.setItem('checkbag2',JSON.stringify(checkbag2));
  },[checkbag2])

  useEffect(() => {
    localStorage.setItem('ongoinggame',JSON.stringify(ongoinggame));
  },[ongoinggame])

  useEffect(() => {
    localStorage.setItem('speaking',JSON.stringify(speaking));
  },[speaking])

  useEffect(() => {
    localStorage.setItem('todisctext',JSON.stringify(vtodisctext.current));
  },[disctext])

  useEffect(() => {
    localStorage.setItem('showspeed',JSON.stringify(vshowspeed));
  },[vshowspeed])

  useEffect(() => {
    localStorage.setItem('qnpc',JSON.stringify(qnpc));
  },[qnpc])

  function startnewgame() {
    songoinggame(true);
    sbagitem(["0","1","遊戲說明卡","","","","","","",""])
    sframe(-1);
    vcpath.current=0;
    scprog(0);
    vcprog.current=0;
    scheckbag(2);
    scheckbag2(1);
    sspeaking("");
    sdisctext("");
    vtodisctext.current="";
    sshowprogbut(false);
    svisited([[false,false,false,false,false],[false,false,false,false,false]]);
    localStorage.setItem('visited',JSON.stringify([[false,false,false,false,false],[false,false,false,false,false]]));
    localStorage.setItem('bagitem',JSON.stringify(["0","1","遊戲說明卡","","","","","","",""]));
    localStorage.setItem('cprog',JSON.stringify(-1));
    localStorage.setItem('cpath',JSON.stringify(vcpath.current));
  }
  
  function startingmenu(n) {
    if (n===1) {
      return(<>
      <div id="starttitle">《U記》</div>
      <div id="startdes">Phase 1.0 之迷</div>
      <button className="startbutton" onClick={() => {sstartingframe(11);}}>開始遊戲</button>
      <a href="https://fly.undarr.com/ucm/" target="_blank" rel="noreferrer"><button className="startbutton">關於 UCM系列</button></a>
      <a href="https://flow.undarr.com/" target="_blank" rel="noreferrer"><button className="startbutton">關於 Stack Undarflow</button></a>
      <br></br>
      <div id="startdes">真人真事Dgame, 網上版.</div>
      </>)
    }
    if (n===11) {
      return(<>
      <div id="starttitle">《U記》</div>
      <div id="startdes">Phase 1.0 之迷</div>
      {ongoinggame ? <button className="startbutton" onClick={() => {sframe(getlocalstorage('frame',-1));}}><div>繼續遊戲</div></button>
      : <button className="startbutton disabled">繼續遊戲</button>
      }
      {ongoinggame ? <button className="startbutton" onClick={() => {startnewgame();}}><div style={{"fontSize":"min(2.5vw,5vh)"}}>開始新遊戲</div>
      <div style={{"fontSize":"min(1vw,2vh)"}}>⚠ 警告，開始新遊戲將會清除目前遊戲的進度 ⚠</div></button>
      : <button className="startbutton" onClick={() => {startnewgame();}}>開始新遊戲</button>}
      <button className="startbutton" onClick={() => {sstartingframe(1);}}>返回</button>
      <br></br>
      <div id="startdes">真人真事Dgame, 網上版.</div>
      </>)
    }
  }

  const chat=useRef([[],[["咦, 你過嚟搵我做咩呀?", "唉, Stack Undarflow嘅真相... 其實一開始都真係唔關我事...", "但係一講起, 又諗起返組媽,", "而一諗起就唔開心...",
    "開始講之前, 我哋先一齊悼念組媽啦, 佢2021年尾起呢度沉船走咗...", "*攞起白花", "組媽, 我哋多謝妳...", "多謝妳對組爸嘅愛...", "多謝妳幫咗我哋...", "我哋會永遠記住妳...",
    "*放低白花", "... 唉, 我覺得都要同你哋講組媽係邊個...", "今日Stack Undarflow 嘅組媽就係 @epsithafung_0818嘅Epsitha.", "嗰時我同佢一齊咗, 我就諗住帶佢嚟呢度玩... 點知就有意外出咗事...",
    "我好掛住組媽, 而我真係好想返返轉頭...", "意外之後, 我同呀P都努力緊起港大一間實險房嘗試整啲嘢返轉頭...", "一路我遇上好多好多挫折, 我覺得世界好唔公平, 自己好辛苦...",
    "去到有次我就嚟成功... 我只係行開咗幾日去咗科大研究啲嘢...", "你哋Stack Undarflow嘅組爸就入咗個實驗房整爛咗我部機... 我嗰陣真係好崩潰...", "你哋組爸嗰時應該忙住搞CSA個Superpass, 都唔知佢無啦啦嚟搞我做咩...",
    "嗰時呀P又成日拍拖又唔幫我...", "不過就係咁, 我識咗呀A, 佢叫我繼續努力, 唔好放棄...", "佢又同我講Stack Undarflow嘅嘢, 我先發覺原來Stack Undarflow 好勁, 可以好快識到好多港大學生,",
    "而間實驗房係要上CSA莊先入到嘅, 呀A幫我底下, 我先開始搞 Stack Undarflow嘅...", "嗰時都搞咗好多event, 又開sem飯, 又Ultrapass, 係好容易好快識到好多人...",
    "而我都好快同呀A成咗支侯選內閣, 諗住上CSA.", "但係去到十二月就出咗事... 仲上埋報紙, 你哋望吓...", "*呀U畀咗份報章你, 請查看背包...", "嗰陣有日我嚟返呢度悼念組媽死咗兩年, 無啦啦有個組仔stalk我...",
    "Stalk咗陣就無啦啦撲埋嚟跳咗落海... 之後有人報警但係救唔返佢...", "個組仔係Year 1, 佢嗰時有嚟過我一場Support Session... 我覺得佢都正正常常...", "嗰陣同佢傾過計佢話佢鍾意跳水, 但係佢跳海嗰吓真係嚇親我...",
    "佢跳咗海之後我都唔知點算, 但係後來有警察拉我去調查...", "咁啱嗰陣我就prep緊上莊啲嘢, 而我一畀人拉去扣留就支莊散曬... 呀A又無啦啦揼低我... 仲改埋支莊名...",
    "嗰時我真係好唔開心... 但係呀A話會之後拉返我上莊... 我先夾硬頂多陣...", "但係最後佢哋話間實驗房啲嘢攞唔返, 上莊又好kick, 我就覺得Stack Undarflow Phase 1.0 都無謂再堅持...",
    "都幾sad story... 不過都要接受, 呢個就係現實...", "⠀"],

  ["咦, 你過嚟搵我做咩呀?", "嘩, 呢份秘密文件, 你哋點解會有嘅...", "唉, 我一直都唔想講, 但係既然你都睇咗, 咁就大家都知我嘅秘密, 我都唔使再收收埋埋...",
    "我其實唔係Undar, 我其實係Ulfred... 我係嚟自另一個宇宙...", "當年我同組媽喺我哋宇宙學量子瞬間傳送Quantum Teleportation, 都好鍾意呢科,", "我成日都向組媽請教啲讀書嘢, 亦都係咁慢慢鍾意咗佢...",
    "後來我同呀P, 喺ENGG1300研發咗粒子定形Particle Stabilization嘅技術,", "我就嘗試結合量子瞬間傳送同粒子定形嘅技術, 就整咗部穿梭機...",
    "第一次我係成功用部穿梭機連咗個穿梭門嚟到呢個宇宙嘅香港,", "我覺得香港好靚, 就諗住帶組媽嚟香港拍拖...",
    "我仲特登用粒子定型技術搞到個穿梭門會唔會移位, 之後嗰幾次個穿梭門都係好成功同一個位開返, 去到我出pool嗰日個穿梭門仲好好哋...",
    "嗰日我表白送咗條ENGG1330編程能量手鍊畀組媽, 我真係好期待可以同佢嚟香港拍拖㗎…", "不過真係唔知咩事, 兩日之後我同組媽開返個穿梭門嘅時候個穿梭門竟然移咗位...",
    "就係咁我同組媽就出咗事, 仲唔小心連累埋呀P... 搞到佢同我而家kick咗喺度...", "唉, 諗返都唔開心, 我真係覺得自己好黑仔...","⠀"],
    ["咦, 你過嚟搵我做咩呀?", "吓... 呢個我唔知咩嚟㗎喎...", "⠀"]],

  [["咦, 你過嚟搵我做咩呀?", "唉, Stack Undarflow嘅真相...", "其實Stack Undarflow嘅故事一開始都好單純, 但係後來真係複雜好多...", "可能我畀啲背景大家先...",
    "我Year 1嘅時候, 我喺團契識咗呀U同一個女仔, 當時我哋三個係好close好firm嘅frd,", "但係後來呀U同嗰個女仔拍咗拖冇幾耐就出咗事, 仲唔小心連累埋我...",
    "個女仔就起意外死咗, 而我同呀U都再返唔返去以前嘅生活...", "一開始, 我同呀U都想活返以前嘅生活... 就好努力咁嘗試整啲嘢返轉頭.",
    "但係後來出咗件事, 搞到我覺得自己返轉頭有啲唔負責任...", "不過件事都有啲恐怖, 我都唔係幾想再提, 你哋自己睇啦...", "*呀P畀咗一張日記紙你, 請查看背包...",
    "所以我一直都唔清楚應唔應該返轉頭, 但係我知呀U一直都想翻返轉頭,  所以我一開始都係聽佢指示幫佢...", "但係慢慢我習慣咗而家嘅生活, 我都慢慢開始move on...",
    "之後我就識咗你哋組爸, 佢當時創立Stack Undarflow真係好單純教啲Year 1做數.", "嗰時我好欣賞組爸, 啲event我都成日幫佢手, 我就寧願留低幫手, 都冇咁想翻去, 你哋望吓...",
    "*呀P show咗幾幅相畀你睇...", "直到2023年4月我喺度開始拍拖, 我就決定咗留低, 唔再翻去...", "但係之後組爸上CSA莊就出咗件事, 呀U先開始接任Stack Undarflow...",
    "而嗰時呀U又好似因為我唔想返翻去, 就同我反咗面, 所以我之後都冇乜點再搵佢...", "其實我都有諗過自己有冇做錯嘢...",
    "我淨係知道出咗事之後, Stack Undarflow 唔再係以前咁單純...", "但係Stack Undarflow而家係點我都唔知, 可能你哋都要問下其他人研究吓... 加油啦...", "⠀"
  ],

  ["咦, 你過嚟搵我做咩呀?", "呀呢份minutes... 當時CSA踢人出莊呢壇嘢...", "其實我知道呢件事對呀U好重要, 因為佢好需要用CSA嘅實驗房.",
    "2021年尾我哋出咗事之後, 我哋就借咗CSA喺InnoWing嘅一間實驗房想整啲嘢返轉頭,", "後來CSA起InnoWing註冊咗之後攞返間房, 我哋攞唔翻間房入邊啲嘢, 呀U就叫我上莊.",
    "不過我上咗莊先發現, 得3C先可以入去間實驗房, 不過呀U就因為組爸係IV, 就用到間房...", "所以當時踢人落莊呢壇嘢, 搞到呀U再入唔翻CSA嘅實驗房, 佢就好嬲好嬲...",
    "嗰時佢有鬧我點解搞到踢人落莊咁大鑊, 但係我當時係Sports Sec都冇咩話事權...", "同埋當時Superpass佢唔見人, 之後開會佢又去咗科大唔知研究咩, 睇唔到我訊息...",
    "我都冇咩合理理由說服CSA唔踢人.", "其實我一直都有啲內疚, 我當初係應承咗呀U一齊返去...", "但係後來我適應咗呢度嘅生活, 後來仲拍埋拖... 我先決定move on, 接受現況...",
    "我見呀U一直想返去咁辛苦, 都勸過佢試吓move on...", "但係佢性格好頑強, 佢失敗完係唔會屈服, 你哋望吓Stack Undarflow 爆到咁就知...",
    "我以為Phase 1.0完咗佢就真係會move on, 但係佢竟然仲搞Phase 2.0...", "所以Stack Undarflow嘅結局係點而家冇人知, 大家再睇吓點啦...","⠀"],
     ["咦, 你過嚟搵我做咩呀?", "吓... 呢個我唔知咩嚟㗎喎...", "⠀"]],

  [["咦, 你過嚟搵我做咩呀?", "唉Stack Undarflow 嘅真相... 真係講到悶...", "大家都知㗎啦... 咪你哋嘅組爸Undar當年追呀組媽追唔到...", "追唔到就走咗去沉船, 就起咗個Stack Undarflow 出嚟啦...",
    "佢話咩想透過教啲Year 1學生, 搵返當年教組媽嘅感覺喎...", "呢個故事真係聽到悶, 不過可能你都未知組媽係邊個...", "咁Stack Undarflow嘅組媽就係@mandyfung_0818嘅Mandy啦...", "咁我又可以講多少少嘅...", "2021年9月嘅時候, 我就喺一場Year 2 CS lecture識咗Undar,",
    "當年佢Year 1上Year 2嘅Lecture, 我已經知佢讀書好痴線...", "後來佢介紹咗佢個Omate, Pilot畀我識... 當時我哋三個係好close好firm嘅frd,",
    "咁呀Undar起OCamp隔離組識咗Mandy, 就想追佢... 然後就不斷教佢讀書, 咁我同呀Pilot一直都幫緊佢做軍師...", "但係佢最後喺12月表白失敗... 失敗咗之後佢就搵我同Pilot嚟呢度隊酒去呻...",
    "不過咁啱前一日呀Pilot踢波拗柴要留院, 就得返我一個陪佢...", "佢嗰日喺度真係喊到痴線㗎, 我畀條片你睇喇...", "*Shows video about Undar cry (Undar: 哎呀Zepa我真係好唔開心呀, 點解Mandy會唔鍾意我㗎... 點解呀...)",
    "嗰晚佢已經隊酒隊到冧冧哋, 第二日仲要考試, 然後佢仲要話搭船返屋企散心...", "我都知道佢會出事, 然後果然啦, 佢呢架船上面嘔... 佢真係好彩有我陪佢...",
    "我真係唔知點解佢咁鍾意Mandy, 佢後來仲寫埋份追女劇本... 我都唔講笑, 佢真係好癲... 你自己睇下喇...", "*呀Z畀咗份劇本你, 請查看背包...",
    "係囉, 然後佢2022年9月就開始搞Stack Undarflow紀念組媽啦...", "不過2022年其實好怪...", "年頭呀Pilot第五波中咗肺炎, 然後就去咗竹篙灣隔離, 隔離完出返嚟之後就開始唔理我同Undar,",
    "姐係以前佢每個禮拜都會主動搵我踢波, 但係後來就連我搵返佢... 佢都唔肯出嚟...", "唔知佢係拗柴驚咗定咩, 但係後來係我約佢咩, 佢都唔覆機... 真係唔知咩事...",
    "當時佢都搞到我同Undar好唔開心, 但係之後去到2023年6月, 呀Undar又開始好似變到佢咁...", "唔知佢同Pilot忙緊咩變到機都唔覆咁... 聽返嚟呀Pilot就拍緊拖, 呀Undar就好似識咗個叫Christine嘅女仔, 但係又唔知真定假...",
    "我唔希望佢哋重色輕友啦, 但係我就覺得好似突然間冇咗兩個best friend咁... 就算今日, 都係呀Arthur叫我嚟, 而唔係Undar搵我...", "呀Arthur係我2021年尾起一場數碼港Hackathon識嘅, 嗰日我仲識埋佢個中同Glisson...",
    "2023年尾, 我哋又咁啱去咗同一個數碼港Hackathon, 我先知原來佢哋兩個都係Stack Undarflow嘅組仔...", "然後嗰日我問起呀Undar嘅事, 呀Glisson就透露咗Undar喺Stack Undarflow研究緊啲嘢...",
    "佢影低咗Undar咗啲文件send畀我, 我嗰下真係呆咗, 你哋望吓...", "*呀Z畀咗啲文件截圖你, 請查看背包", "即係我知道Undar讀書勁嘅, 但係我冇諗過佢會數學CS勁到寫到呢啲嘢出嚟嘅level...",
    "我淨係知咁多咋, Stack Undarflow而家搞緊咩我都唔太清楚, 可能你哋要加油再研究下啦...", "⠀"
  ],

  ["咦, 你過嚟搵我做咩呀?", "咦, 呢份新聞我認得喎...", "因為我同Undar搭船然後佢無啦啦嘔嗰晚呢, 突然聽到起海底有爆炸...", "雖然好細聲, 但係海底爆海面都聽到真係有啲誇張...",
    "爆嗰吓仲見到啲海水發緊啲紫色光出嚟... 我真係唔知道點解機件過舊係可以爆到啲紫色光出嚟...", "或者可能嗰晚我掛住睇住呀Undar, 同埋自己都醉醉哋, 自己冇睇得咁清楚,",
    "但係爆咗之後, 我好似見到三條影沿住啲紫色光游上嚟,", "但係游游吓就淨返兩條影...", "之後個紫色光就褪咗...", "我都唔知自己望到啲咩, 因為之後好似都冇新聞講相關嘅事. 淨係得機件過舊嘅新聞...",
    "可能自己嗰晚真係醉醉哋, 唔知啦...", "⠀"
  ], ["咦, 你過嚟搵我做咩呀?", "吓... 呢個我唔知咩嚟㗎喎...", "⠀"]],
  
  [["咦, 你過嚟搵我做咩呀?", "Stack Undarflow 嘅真相... 咁我而家係Stack Undarflow 内部團隊之一, 我的確係知多少少嘅...", "咁其實Stack Undarflow就一直都好好哋嘅, 但係你哋組爸Undar就一直都好古怪.",
    "我第一次識Undar嘅時候係2021年嘅11月, 我當時仲係中六...", "嗰時我同我個中同Glisson去咗數碼港一場Hackathon比賽,", "比賽之後我哋就去咗香港仔食飯, 再去香港仔海傍散步...",
    "嗰晚我就見到Undar喺一架遊艇上, 而架遊艇唔知做咩有個粉紫色嘅發光門...", "成件事好科幻, 我都唔知點形容好, 你哋自己望下...", "*呀A畀咗一幅相你, 請查看背包",
    "嗰時Undar仲鬼鬼鼠鼠咁, 咁過咗陣, 佢就去返個紫色門好似撳啲掣咁...", "然後佢就穿過個紫色門, 棟紫色門就突然冇咗... 咁我都幾肯定嗰棟門係穿梭門嚟嘅...",
    "而我同Glisson不嬲都好鍾意科幻小說, 我哋估唔到現實世界真係會見到有穿梭門...", "我哋一直都好想搵返嗰個人, 而去到2022年我入咗港大, 呀Undar就啱啱創立咗Stack Undarflow.",
    "嗰時我不斷去Stack Undarflow啲活動問Undar穿梭門嘅嘢,", "但係我chok咗佢成兩個學期佢都賴死唔認, 不斷話我認錯人咁...", "直到2023年5月1號, 我見到佢古古怪怪好急忙咁離開InnoWing,",
    "嗰日我原本想問佢啲ENGG1340, 但係佢個樣實好慌忙咁話趕住要去科大唔知做咩就直接走咗去...", "我都知佢有啲嘢收收埋埋, 咁第二日5月2號, 我又喺InnoWing撞到佢, 佢當時prep緊嗰晚CSA嘅Superpass...",
    "我就問佢係唔係喺InnoWing研究緊啲嘢, 佢又賴死唔認...", "係去到我逼佢試下去啲實驗房拍學生證, 佢就開到一間實驗房, 裏面有部穿梭機...",
    "我都知佢呃咗我好耐, 但係唔知點解佢見到部穿梭機會好驚訝, 好似完全唔知有件咁嘅事咁...", "咁之後佢就開咗個穿梭機, 又整咗個粉紫色嘅穿梭門, 然後就走咗去棟門嘅第二邊...",
    "我原本都諗住跟, 但係又唔係幾夠膽... 但係都幾好彩冇跟到...", "因為唔夠兩分鐘嚿嘢唔知做咩事突然間爆炸... 真係好彩自己見到唔對路即刻走, 如果唔係我都炸埋一份...",
    "不過我走咗之後就入唔返個實驗房, 而呀Undar又唔知穿梭咗去邊...", "去到過多兩日5月4號, 我先再撞返佢... 我同佢講部機爆咗炸, 問佢穿梭咗去邊, 佢又唔知做咩扮到懵懵哋咁...",
    "佢諗咗好耐好耐, 佢先好似知咩事咁, 就話自己穿梭咗去咗好遠好遠嘅地方, 但係我再問佢實際去咗邊, 佢又唔知做咩答唔到...", "咁不過嗰時我都冇理咁多就即刻問佢穿梭機嘅科技, 佢叫我唔好同其他人講, 咁我都應承咗佢...",
    "不過嗰時佢唔見咗張學生證, 到佢申請返嘅時候我先發覺佢畀人踢咗落莊, 入唔返個實驗房...", "我其實好驚訝點解佢會無啦啦落莊, 當時CSA份EGM會議紀錄淨係話Undar無去Superpass幫手,",
    "但係我就覺得背後仲有啲嘢嘅, 你可以望下份minutes...", "*呀A畀咗一份文件你, 請查看背包", "不過點都好我嗰時仍然好好奇穿梭機嘅科技, 就提議同佢一齊上莊...",
    "咁我哋一直都好好哋嘅, 亦都好快10月份成咗一支後選内閣,", "但係12月就出咗場好奇怪嘅意外, 搞到我同Undar上莊有啲kick, 我先同佢分頭行事...",
    "咁去到2024年1月嘅時候, 呀Undar去咗加拿大exchange, 佢叫我上咗莊之後InnoWing個實驗房啲嘢唔多亂掂...", "不過嗰時我唔知, 我哋個侯選主席已經清好間實驗房, 清到間房好似新嘅一樣...",
    "然後Undar就話我哋揼咗佢一啲重要嘢, 就再整唔返部穿梭機...", "佢當時好灰心, 先至唔再搞Stack Undarflow...",
    "咁Phase 1.0就係咁完咗, 但係我覺得就算學唔到穿梭機嘅科技, Stack Undarflow 都真係幫到好多學生, 好有意義...", "我先搵返Undar繼續幫吓人, 咁佢諗咗陣都應承咗, 就同我搵返Lewis一齊策劃Phase 2.0咁...",
    "而家Stack Undarflow 就有幸有Phase 2.0啦, 咁希望Stack Undarflow 可以持續營運, 幫多幾屆學生啦...", "⠀"
  ],

  ["咦, 你過嚟搵我做咩呀?", "唉呢場意外... 我都唔係幾想講...", "當時我個中同Glisson無啦啦跳海, 我真係畀佢嚇親... 呢件事仲搞到Undar畀警察拉咗去拘留...",
    "其實嗰時Exam period我好驚嗰時警察會拘留埋我, 我先同Undar分頭行事...", "同埋成件事都好大迴響, 我啲莊友都好驚, 同佢一齊上莊真係再冇咁容易成功...",
    "我哋先臨時轉個策略, 打算By election拉返佢上莊...", "但係嗰時我哋清咗間實驗房, 佢都知再上莊都冇意義, 所以最後佢都唔決定唔再上...", "其實我都幾可憐佢, 所以我之後都不斷陪佢, 但係嗰時我真係好難做...",
    "同埋最後好似都查唔到點解我個中同會跳海...", "我最後一次見佢嘅時候, 係喺2023年尾嘅數碼港Hackathon... 嗰晚比賽之後我哋又去香港仔散步...",
    "嗰陣佢同我講話近期佢發現咗高能量量子喺水入邊長期散發會輻射出超能量, 令到感染到輻射嘅人有超能力喎...", "我都唔知佢係咪講笑, 都唔知佢讀咗咩geog定chem course學返嚟嘅...",
    "同埋就算關事, 我都唔知點解佢會覺得呢度海底會無啦啦有啲高能量嘅嘢...", "其實我中二嗰時就識咗佢, 大家都識咗七年... 佢無啦啦跳海走咗, 我同佢班中學frd都好唔開心...",
    "佢自小遊水跳水係好勁, 好多比賽都贏過好多獎, 我係都好想知佢當時跳海係咪一場意外…", "咁不過都過咗喇, 事係可惜嘅, 但係大家都move on咗就算喇...", "⠀"
    
  ], ["咦, 你過嚟搵我做咩呀?", "吓... 呢個我唔知咩嚟㗎喎...", "⠀"]],

  [["咦, 你過嚟搵我做咩呀?", "Stack Undarflow嘅真相? 咪當年呀U沉船整個嚿嘢出嚟拯救全體Engine學生囉~", "我嗰時參加咗Stack Undarflow嘅Interest Group, 同組爸一齊去踩單車先知佢嘅故事,",
    "聽佢講佢當年沉船嘅故事佢都沉到幾癲, 而佢沉得嚟又真係幫到好多人...", "但係佢沉船沉極都唔夠我癲㗎啦, 因為我真係沉咗㗎船~",
    "我中六12月有次學校假期同班frd去香港仔玩, 當時我有兩個朋友有遊艇牌, 我哋就租咗兩㗎遊艇嚟玩,", "上咗遊艇之後, 我哋就決定環繞香港島兜一個圈... 去到中環嗰陣, 我個friend有啲攰, 就想畀我試吓揸㗎遊艇...",
    "咁我不嬲好大膽㗎, 就真係走咗去試... 而唔講笑我一開始都揸得幾好...", "不過後來我嚟到呢度附近就想試下加速, 就失手直接炒埋去我第二個frd㗎遊艇度...", "我都唔知咩事, 撞嗰吓明明好輕力, 但係就突然間成㗎遊艇著曬火...",
    "嗰吓真係好驚, 我同我啲friend即刻跳船游去係第二㗎游艇避難,", "游到第二㗎遊艇嘅時候, 原本嗰㗎遊艇已經沉咗一半...", "然後過咗陣就連㗎船都見唔到, 唔講笑真係好誇張...",
    "不過好彩係無人受傷, 之後賠返錢都唔使再點跟進...", "之後我睇返報紙先知原來係機件過舊, 你哋睇下...", "*呀L畀咗份報章你, 請查看背包...", "唔知啦, 可能之後大家搭船都要小心啲啦...",
    "我嗰時同組爸講咗呢個故事, 佢都呆曬咀...", "不過其實我中六仲有單嘢係再痴線啲想同大家分享...", "但係嗰單嘢聽聞最後搞出人命, 我就唔多講喇...", "之後Stack Undarflow 搞活動, 大家記得我係水火神就得㗎喇...", "⠀"
  ],

  ["咦, 你過嚟搵我做咩呀?", "嘩, 明明冇人知呢件事你都揾到嘅...", "咁好啦, 雖然有啲恐怖, 我都講下啦...", "咁2022年頭香港爆第五波, 我唔小心中咗招, 就去咗竹篙灣隔離...",
    "嗰時我同呀P兩個人住同一隔離屋, 嗰時佢拗柴唔係幾行到, 我就成日同佢打機...", "咁雖然我哋唔係同一間房, 我哋都靠打機互相識咗... 不過其實佢就成日都瞓覺, 我哋都唔算太熟...",
    "去到有日我都幾大頭蝦, 嗌咗個pizza, 唔小心將個紙盒擺埋入個焗爐...", "之後自己去咗廁所, 嘩... 一出嚟就出事... 咁啱又拖把漏電走火...", "好快成間房就冒曬煙, 我唔知點算就直接跑出間屋,",
    "我原本諗住叫埋呀P走, 不過佢竟然早我一步已經跑咗出間屋等緊我...", "我仲以為佢拗柴會走唔到, 但係佢都幾勁喎... 早我咁多出嚟...", "嗰時佢問我間屋仲有冇人, 咁平時都淨係得我同佢兩個就梗係再冇其他人啦...",
    "咁之後我哋就報警, 其實間屋燒著咗我哋都唔知再去邊到隔離...", "不過好彩嗰日我哋係隔離最後一日, 我同呀P check多咗一次陰性就走得人...",
    "我睇返新聞好似係四級火, 我搞到咁大火都真係幾唔應該...", "而新聞竟然話搵到舊嘢好似條燒著咗嘅屍, 不過過咗幾個月都查唔到條屍係邊個...", "其實我就覺得有啲似鬼故, 因為應該冇人咁蠢爬入去我哋間隔離屋度...",
    "但係我之後都冇點研究落去... 總之我中六第二單痴線嘢就咁囉...", "一單水, 一單火都真係... 有啲唔知點解好似畀上天揀中咁...", "⠀"], ["咦, 你過嚟搵我做咩呀?", "吓... 呢個我唔知咩嚟㗎喎...", "⠀"]]
  ])

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

  function addbagitem(n) {
    const temp=bagitem;
    for (let i=0; i<10; i++) {
      if (temp[i]===n) {return;}
      if (temp[i]==="") {temp[i]=n; localStorage.setItem('bagitem',JSON.stringify(temp)); sbagitem(temp); return;}
    }
  }

  function progchat(progstep=1) {
    localStorage.setItem('cpath',JSON.stringify(vcpath.current));
    sshowprogbut(false);
    //console.log('b',vframe.current,vcpath.current, vcprog.current,progstep); 
    scprog(vcprog.current+progstep);
    vcprog.current=vcprog.current+progstep;
    //console.log('a',vframe.current,vcpath.current, vcprog.current);
    vtodisctext.current=chat.current[vframe.current][vcpath.current][vcprog.current];
    const time=Math.max(1000,60*vtodisctext.current.length);
    vshowspeed.current=Math.floor(time/chat.current[vframe.current][vcpath.current][vcprog.current].length);
    //console.log('a',vtodisctext.current,time,vshowspeed.current); 
    if (vtodisctext.current==="⠀") {
      sdisctext("");
    }
    else {
      if (vcpath.current!==2 && visited[vcpath.current][frame-1]) {
        sdisctext(vtodisctext.current);
        sshowprogbut(true);
      }
      else {
        matchdistext();
        setTimeout(() => {sshowprogbut(true);},time+500);
      }
    }
    if (vcpath.current===0) {
      if (vframe.current===1 && vcprog.current===27) {addbagitem("2023年U報");}
      if (vframe.current===2 && vcprog.current===10) {addbagitem("P的日記");}
      if (vframe.current===3 && vcprog.current===19) {addbagitem("劇本");}
      if (vframe.current===3 && vcprog.current===32) {addbagitem("文件截圖");}
      if (vframe.current===4 && vcprog.current===8) {addbagitem("相片");}
      if (vframe.current===4 && vcprog.current===31) {addbagitem("EGM會議紀錄");}
      if (vframe.current===5 && vcprog.current===15) {addbagitem("2021年U報");}
    }
    // 1,5~8 -> Undar task , 1,11 -> Epsitha IG, 1,25-> news 2023
    // 2,9 -> pdiary, 2,14->photos
    // 3,6 -> Mandy code, 3,7 -> Mandy IG, 3,16 -> video Mandy cry,  3,20 -> 劇本, 3,33-> 文件截圖
    // ["0","1","遊戲說明卡","劇本","2021年U報","2023年U報","P的日記","EGM會議紀錄","相片","文件截圖"]
  }

  function noclickf(t=1500) {
    snoclick(true);
    setTimeout(() => {snoclick(false);},t)
  }

  function startingchat() {
    noclickf();
    scprog(0);
    vcprog.current=0;
    sshowprogbut(false);
    setTimeout(() => {progchat(0); sspeaking(["","呀U: ","呀P: ","呀Z: ","呀A: ","呀L: "][vframe.current])},1250)
    setTimeout(() => {sshowprogbut(true);},2500)
  }

  function bagbutton(n) {
    scheckbag2(1);
    if (bagitem[n]!=="") {
      if (qnpc) {
        if (vframe.current===1 && bagitem[n]==="文件截圖") {scheckbag(-1); vcpath.current=1; progchat();}
        else if (vframe.current===2 && bagitem[n]==="EGM會議紀錄") {scheckbag(-1); vcpath.current=1; progchat();}
        else if (vframe.current===3 && bagitem[n]==="2021年U報") {scheckbag(-1); vcpath.current=1; progchat();}
        else if (vframe.current===4 && bagitem[n]==="2023年U報") {scheckbag(-1); vcpath.current=1; progchat();}
        else if (vframe.current===5 && bagitem[n]==="P的日記") {scheckbag(-1); vcpath.current=1; progchat();}
        else {scheckbag(-1); vcpath.current=2; progchat();}
        sqnpc(false);
      }
      else {scheckbag(n);}
    }
  }

  function returnbagitem(n) {
    if (n==="遊戲說明卡") {
      return(<>
        {checkbag2===1 ? <><div id="bgnote"><div className="fullop">背景:<br></br>
        2021年12月嘅一日，Stack Undarflow嘅組媽遺憾地喺維港遇到海難離世。呢位女仔離世之後，一份失喪嘅愛卻一直推動住我哋進步同擴展，並喺一屆又一屆嘅組仔女間流傳...
        唯獨時間長咗，Stack Undarflow嘅初心同營運目的慢慢變得模糊，而Stack Undarflow嘅內部運作模式亦變得複雜，更不幸地喺其中牽涉到<span className="boldy">多單致命意外🥶</span>。
        Stack Undarflow嘅内部團隊一直嘗試隱藏真相, 卻因此背後不斷深受壓力, 最終亦無奈令Stack Undarflow喺2024年2月短暫停辦😔😔.
        為保障Stack Undarflow Phase 2.0嘅持續運行, Stack Undarflow嘅內部團隊認為有責任向公眾釐清真相, 並聚集咗5位知情人士, 今晚同大家敍述佢哋對事情嘅認知...</div></div></> : <></>}
        {checkbag2===2 ? <><div id="bgnote"><div className="fullop">遊戲預告片:<br></br>
          <iframe  title="trailer" id="trailer" src="https://www.youtube.com/embed/RI-nUVenGjw?si=FxPSQ6Ruw6tgi2Xe"></iframe>
          </div></div></> : <></>}
        {checkbag2===3 ? <><div id="bgnote"><div className="fullop">遊戲玩法:<br></br>
          今晚我哋聚集咗5位知情人士同大家交代3單命案同1單失蹤案. 5位知情人士分別係呀U, 呀P, 呀Z, 呀A同呀L. 你哋要同每位知情人士傾兩次計, 
          傾計順序沒有限制. 第一次傾計, 佢哋會同你講佢哋對Stack Undarflow 嘅認知, 並畀你哋一啲相關文件. 第二次傾計, 你要將相應嘅文件畀返相應嘅知情人士, 
          相應嘅知情人士就會為相應嘅文件加以詳述佢哋對該文件嘅認知. 遊戲結束前, 你要填寫
          <a href="https://drive.google.com/file/d/1GgjC5cNQ3pYW1sJxNLdK8_St8-xJVmWp/view?usp=sharing" target="_blank" rel="noreferrer" style={{"color":"#ff0"}}>UCM 意外報告</a>, 
          推斷並還原3單命案同1單失蹤案嘅受害人, 意外日期, 同意外嘅s起承轉合.</div></div></> : <></>}
        {checkbag2===4 ? <><div id="bgnote"><div className="fullop">角色介紹: (1/3)<br></br>
            Undar	- 2021年入讀港大修讀工程, 在2022年揀選計算機科學為主修, 揀選數學為副修. 自小成績優異, 熱愛編程. 2022年創立了Stack Undarflow, 舉辦多項學術性和非學術性的活動, 多次被人稱為港大工程嘅世一組爸.<br></br><br></br>
            Pilot	- 2021年入讀港大修讀工程, 熱愛足球, 喺同年嘅ENS OCamp認識Undar, 並後來成為互相支持嘅交心朋友. 入學後一直對未來迷惘, 有較多重大決定都比較依靠Undar意見.
            </div></div></> : <></>}
        {checkbag2===5 ? <><div id="bgnote"><div className="fullop">角色介紹: (2/3)<br></br>
          Zepa - 2020年入讀港大修讀金融, 在2021年揀選計算機科學為副修, 亦喺同年COMP2121嘅課堂上認識Undar, 從而成為並肩作戰嘅交心朋友. 一直敬佩Undar高超嘅學習能力.<br></br><br></br>
          Arthur - 2022年入讀港大修讀工程, 在2023年揀選計算機科學為主修, 自少對編程同科幻小說有興趣. 學業成績一般卻求學心態高, 因而喺2022年透過Stack Undarflow舉辦嘅Support Session認識Undar後經常向Undar求學, 亦後來被邀成為Stack Undarflow Phase 2.0 內部團隊成員之一.
            </div></div></> : <></>}
        {checkbag2===6 ? <><div id="bgnote"><div className="fullop">角色介紹: (3/3)<br></br>
          Lewis - 2022年入讀港大修讀工程, 在2023年揀選土木工程為主修, 揀選計算機科學為副修. 冒險精神高, 喜歡遊山玩水, 2022年透過Stack Undarflow舉辦嘅Interest Group認識Undar, 亦後來被邀成為Stack Undarflow Phase 2.0 內部團隊成員之一.
          <br></br><br></br>
          5人外另有其他角色
            </div></div></> : <></>}
        {checkbag2!==1 ? <button className="genbutton" style={{"zIndex":100, "bottom":"min(7.5vw,15vh)", "left":"min(12.5vw,25vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2-1);}}> {"<"} </button> : <></>}
        {checkbag2!==6 ? <button className="genbutton" style={{"zIndex":100, "bottom":"min(7.5vw,15vh)", "right":"min(12.5vw,25vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2+1);}}> {">"} </button> : <></>}
      </>
      )
    }
    if (n==="劇本") {
      return(<>
        {checkbag2===1 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (1/7)<br></br>
          追妳嘅日子就好似拍緊一場戲。<br></br>
          當我身邊嘅人都期待緊結局,自己卻係故事嘅主角。<br></br>
          ~Undar，since 7/11/2021<br></br><br></br>
          (For the purpose of the DGame, important parts of the script are modified from the original)
          </div></div></> : <></>}
        {checkbag2===2 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (2/7)<br></br>
          Day 1 Scene 1: (26/08/2021)<br></br>
          嗰日OCamp我見到妳起台上面同R影相，我已經覺得妳會係一個我想追嘅女仔。<br></br>
          ...<br></br>
          Day 27 Scene 7: (??/??/2021)<br></br>
          呢日係我第一次約妳，然後妳醒唔到遲咗到，我差啲以為妳會放我飛機，但係妳就比咗我一個難忘嘅中秋節。嗰日係我第一次起大學skip堂，
          亦都係第二次同女仔單獨相處咗六個鐘以上。我同R講返，佢都覺得有啲驚訝～<br></br>
          ...
          </div></div></> : <></>}
        {checkbag2===3 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (3/7)<br></br>
          Day 104 Scene 41: (??/??/2021)<br></br>
          一早約咗Omate返學溫書，點知發覺自己無帶file，於是做個傻仔返屋企再返學... 然後返嚟費事妳遲到尷尬我就扮遲到，
          食完晏打咗個電話畀R叫佢幫手清走InnoWing下層啲熟人，佢哋真係神助攻XDD，
          然後妳問我打咩電話... 當時我就話係袐密，但係真係希望有日妳可以睇返呢篇嘢笑... 不過同妳溫書溫到一半佢哋頂唔順落咗嚟問我嘢XDDD (至少佢哋好識做坐隔離枱). 
          Anyways，臨走我畀咗份ENGG1330 Practice Paper妳做聖誕禮物，妳嗰下真係好開心，妳都唔明我見到妳咁得意自己其實好興奮:) 
          我就夠膽當場同妳表白... 然後妳直接黑面拒絕我 :(... 我真係好唔開心, 嗰晚我喊咗成晚, 搵咗P同Z兩日後陪我訴苦... 點解好似我咁耐嘅努力妳一直都睇唔到 :((
            </div></div></> : <></>}
        {checkbag2===4 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (4/7)<br></br>
          Day 105 Scene 42:<br></br>
          其實琴日妳拒絕我之後我心情好複雜同好亂, 我真係考試前心態炸裂... 都唔知點算，希望考試冇畀呢件事影響啦~ 今日呀P仲踢波拗柴要入醫院, 聽日陪唔到我. 希望呀Z搞得掂我啦:’(<br></br>
          Day 106 Scene 43: (??/??/2021)<br></br>
          哎呀我真係好唔開心好唔開心，因為我真係好鍾意好鍾意好好好鍾意妳，然而我好似咩都做唔到... 今晚呀Z陪我嚟到灣仔海濱公園隊冧酒訴苦, 我都唔知自己冧咗幾多罐酒, 
          總之就冧到搭緊船返屋企嘅時候嘔到傻... 好彩有呀Z陪我... 我聽日仲要考試, 但係我心情而家真係好亂... 點算呀...:'''(
            </div></div></> : <></>}
        {checkbag2===5 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (5/7)<br></br>
          Day 111 Scene 44:<br></br>
          終於考完試，少一件擔心嘅事... 諗返起上星期可能我真係急咗啲表白，點知就chur妳chur得有啲過分。但係大佬我真係為妳做過好多嘢呀, 
          妳唔鍾意我我而家真係唔知點算... 嗰日呀Z氹我就話可能我嘅付出都未必嘥曬, 話例如可能我整畀妳嗰份ENGG1330 Practice Paper可以傳落去幫幾屆工程學生... 
          但係講真句, 有幾多人會因為我鍾意妳而識我, 再搵我幫手呀... 我對妳嘅愛仲要係專為妳而設, 又點可能傳到落去下幾屆嘅工程學生呀...<br></br>
          ...
            </div></div></> : <></>}
        {checkbag2===6 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (6/7)<br></br>
          Day 112 Scene 55:<br></br>
          今日我決定好係最後一日啦:') 嚟到故事嘅尾聲，我只想坦白咁認輸，承認自己唔係一個適合妳嘅男仔，然後再不回頭咁放棄。可能有日我會再次為妳奮鬥，但係咁只會係未來再算嘅事。<br></br><br></br>
          呢112個充滿心動同心酸嘅日子過得好快，重新睇返一次呢份劇本，最早嘅情景我仍然記得好深刻，就好似係前幾日嘅事咁。遺憾當初我哋根本就冇咩連繫，而路上我哋都擦唔出火花:( 
            但係無論如何，我唔後悔認識妳，或者有一日妳會明白妳對我有幾特別，又或者妳早已經知道...
            </div></div></> : <></>}
        {checkbag2===7 ? <><div id="bgnote"><div className="fullop">Cθnfidεntial: (7/7)<br></br>
          Part of the jθurney is the εnd, don't cry because it's over but smile because it happened. 沒有結束就不會有新開始，我能夠為妳盡力就應該已經感到慶幸，
          只係唔適合嘅就唔應該強求。而有時命運就係唔可以強求，你只能夠相信上天為你預備嘅安排，願我繼續相信，是對的終於會碰到。<br></br><br></br>
          平常心面對sem2 :')<br></br>
          劇終
          </div></div></> : <></>}
        {checkbag2!==1 ? <button className="genbutton" style={{"zIndex":100, "bottom":"min(7.5vw,15vh)", "left":"min(12.5vw,25vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2-1);}}> {"<"} </button> : <></>}
        {checkbag2!==7 ? <button className="genbutton" style={{"zIndex":100, "bottom":"min(7.5vw,15vh)", "right":"min(12.5vw,25vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2+1);}}> {">"} </button> : <></>}
      </>
      )
    }
    //Someone ask why kick Undar (IV), Alexia (Chair) say because he no showed in Superpass on 2nd May 2023
    //Someone asked if the decision was made in consensus, Alexia (Chair) said CSA held a meeting on 3rd May 2023, and all but Pilot (Sports Sec) decided to vote Undar (IV) out. 
    if (n==="EGM會議紀錄") {
      return(<>
        {checkbag2===1 ? <><div id="bgnote"><div className="fullop">CSA EGM minutes: (1/6)<br></br>
          Date: 22nd May 2023 (Monday)<br></br>
          Time: 19:00 <br/>
          Venue: UG104, Composite Building, the University of Hong Kong<br/>
          <br/>
          Meeting Chairperson: LH Hon<br/>
          Acting Honorary Secretary: WP Hui<br/>
          Returning Officer: HL Wong<br/>
          </div></div></> : <></>}
        {checkbag2===2 ? <><div id="bgnote"><div className="fullop">CSA EGM minutes: (2/6)<br></br>
          Agenda:<br/>
          1. Call to order<br/>
          2. To cast a vote of non-confidence to the Internal Vice Chairperson YT Chan<br/>
          3. Any other business<br/>
          <br/>
          1. Call to order, Meeting Chairperson LH Hon asked if there were any doubts on the Meeting
          regulations. If not, the Meeting would be moved to agendum 2.<br/>
        
          </div></div></> : <></>}
        {checkbag2===3 ? <><div id="bgnote"><div className="fullop">CSA EGM minutes: (3/6)<br></br>
          2. To cast a vote of non-confidence to the Internal Vice Chairperson of Meliora<br/>
          Meeting Chairperson LH Hon explained the voting procedures.<br/>
          Meeting Chairperson LH Hon announced the number of valid voters was 43, and
          voters could obtain their votes from the Returning Officer<br/>
          <br/>
          Resolution: Among 43 votes conducted, the voting result was as follows:<br/>
          43 votes for dismissing the Internal Vice Chairperson of CSA, 0 vote against.
        </div></div></> : <></>}
        {checkbag2===4 ? <><div id="bgnote"><div className="fullop">CSA EGM minutes: (4/6)<br></br>
          3. Any other business<br/>
          Meeting Chairperson LH Hon asked if there were any other business.<br/>
          Ordinary Member CY Shiu asked the Chairperson of CSA why the vote of non-confidence was given to the Internal Vice Chairperson<br/>
          Chairperson CY Chan explained that the Internal Vice Chairperson YT Chan did not perform his duty during the CSA Superpass on 2nd May 2023, and did not attend
          the meeting on 3rd May 2023 without proper reasons.
        </div></div></> : <></>}
        {checkbag2===5 ? <><div id="bgnote"><div className="fullop">CSA EGM minutes: (5/6)<br></br>
          Ordinary Member CY Shiu asked the Chairperson of CSA if the whole cabinet lost confidence in the Internal Vice Chairperson<br/>
          Chairperson CY Chan stated that according to the internal meeting held on 3rd May 2023, all members but Sports Secretary PL Tam, has lost confidence in 
          the Internal Vice Chairperson and has agreed to hold an EGM to dismiss him.
        </div></div></> : <></>}
        {checkbag2===6 ? <><div id="bgnote"><div className="fullop">CSA EGM minutes: (6/6)<br></br>
          No other business were discussed.<br/>
          At 19:10, 22nd May 2023, Meeting Chairperson LH Hon announced that the Meeting was adjourned.<br/>
          <br/>
          Side note:<br/>
          YT Chan = Undar, PL Tam = Pilot.
        </div></div></> : <></>}
        {checkbag2!==1 ? <button className="genbutton" style={{"zIndex":30, "bottom":"min(7.5vw,15vh)", "left":"min(12.5vw,25vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2-1);}}> {"<"} </button> : <></>}
        {checkbag2!==6 ? <button className="genbutton" style={{"zIndex":30, "bottom":"min(7.5vw,15vh)", "right":"min(12.5vw,25vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2+1);}}> {">"} </button> : <></>}
      </>
      )
    }
    return(<>
    <div className="bagitemdiv" style={{"left":{"P的日記":"40%","相片":"39%","2021年U報":"33%","2023年U報":"33%","文件截圖":"40%"}[n]}}>
    <TransformWrapper>
    <TransformComponent>
    <img className="bagitem" src={"./img/"+{"P的日記":"pdiary","相片":"pic","2021年U報":"news21","2023年U報":"news23","文件截圖":"unote"+checkbag2}[n]+".jpeg"} alt="" />
    </TransformComponent>
    </TransformWrapper>
    </div>
    {checkbag2!==1 && n==="文件截圖" ? <button className="genbutton" style={{"zIndex":30, "bottom":"min(7.5vw,15vh)", "left":"min(37.5vw,75vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2-1);}}> {"<"} </button> : <></>}
    {checkbag2!==2 && n==="文件截圖" ? <button className="genbutton" style={{"zIndex":30, "bottom":"min(7.5vw,15vh)", "right":"min(40vw,80vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {scheckbag2(checkbag2+1);}}> {">"} </button> : <></>}
    </>)
  }

  const bgmm=useRef();
  useEffect(() => {
    document.title = 'U記 - Phase 1.0 之迷, Undarfly Universe';
    bgmm.current=document.getElementById("audio_tag");
    bgmm.current.loop=true;
  }, []);

  useEffect(() => {
    vcprog.current=cprog;
    localStorage.setItem('cprog',JSON.stringify(cprog));
  },[cprog])

  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Shantell+Sans" rel="stylesheet"></link>
      <audio id="audio_tag" src={bgm}/>
      <div className="bgfull" style={{"backgroundImage":"url(./img/bg.png)"}}></div>
      <div className="header">
      <h1 className="header-left">U記 - Phase 1.0 之迷</h1>
      <div className="header-right"><h1>⠀UCM系列</h1></div>
      <button className="mutebutton" style={{"backgroundImage":"url(./img/"+(muted ? "soundoff" : "soundon")+".gif)"}} onClick={() => {
        if (muted) {bgmm.current.play(); smuted(false);} else {bgmm.current.pause(); smuted(true);}
      }}></button>
      <div style={{clear: "both"}}></div>
      </div>
      {noclick ? <div className="noclickoverlay"></div> : <></>}
      <FadeInOut show={frame===-2} duration={1000}>
        <div className="startframe frame">
          {startingmenu(startingframe)}
        </div>
      </FadeInOut>
      <FadeInOut show={frame>=-1} duration={1000}>
        <button className="backbutton" style={{"zIndex":(checkbag>0 ? 3 : 11), "backgroundImage":"url(./img/prevmenu.gif)"}} onClick={() => {sstartingframe(1); sframe(-2); noclickf();}}></button>
        <div className="bagoverlay" style={{"width":(checkbag>0 ? "100%" : "0%")}}>
          <div className={checkbag>0 ? "bagoverlayin" : "hide"}>
            <button className="backbuttonoverlayed" style={{"backgroundImage":"url(./img/prevmenu.gif)"}} onClick={() => {sstartingframe(1); sframe(-2); noclickf();}}></button>
            <div style={{"display":(checkbag===1 ? "" : "none")}}>
              <div id="startdes">{qnpc ? "你想向"+["","呀U","呀P","呀Z","呀A","呀L"][vframe.current]+"查問什麼?" : "背包"}</div>
              <table className="bagtable">
                <tbody>
                  <tr>
                    <button className="bagbut" onClick={() => {bagbutton(2)}}>{bagitem[2] ? bagitem[2] : "⠀"}</button>
                    <button className="bagbut" onClick={() => {bagbutton(3)}}>{bagitem[3] ? bagitem[3] : "⠀"}</button>
                    <button className="bagbut" onClick={() => {bagbutton(4)}}>{bagitem[4] ? bagitem[4] : "⠀"}</button>
                    <button className="bagbut" onClick={() => {bagbutton(5)}}>{bagitem[5] ? bagitem[5] : "⠀"}</button>
                  </tr>
                  <tr>
                    <button className="bagbut" onClick={() => {bagbutton(6)}}>{bagitem[6] ? bagitem[6] : "⠀"}</button>
                    <button className="bagbut" onClick={() => {bagbutton(7)}}>{bagitem[7] ? bagitem[7] : "⠀"}</button>
                    <button className="bagbut" onClick={() => {bagbutton(8)}}>{bagitem[8] ? bagitem[8] : "⠀"}</button>
                    <button className="bagbut" onClick={() => {bagbutton(9)}}>{bagitem[9] ? bagitem[9] : "⠀"}</button>
                  </tr>
                </tbody>
              </table>
              <button className="startbutton" onClick={() => {sqnpc(false); scheckbag(-1); noclickf(520);}}>返回</button>
            </div>
            <div style={{"display":(checkbag>1 ? "" : "none")}}>
              <div id="startdes">{bagitem[checkbag]}</div>
              {returnbagitem(bagitem[checkbag])}
              <button className="startbutton" onClick={() => {scheckbag(1);}}>返回</button>
            </div>
          </div>
        </div>
      </FadeInOut>
      <FadeInOut show={frame===-1} duration={1000}>
      <div className="frame">
        <button id="map" style={{"backgroundImage":"url(./img/map.png)"}}></button>
        <button className="genbutton" style={{"top":"min(35vw,70vh)", "right":"min(2.5vw,5vh)"}} onClick={() => {scheckbag(1); noclickf(520);}}>查看背包</button>
        <button className="ppbut" style={{"top":"min(5vw,10vh)", "right":"min(37.5vw,75vh)", "backgroundImage":"url(./img/u.png)"}} onMouseEnter={() => {smapinfoppl("(同呀U傾計)")}} onMouseLeave={() => {smapinfoppl("")}} onClick={() => {sframe(1); startingchat();}}></button>
        <button className="ppbut" style={{"top":"min(30vw,60vh)", "right":"min(59.5vw,119vh)", "backgroundImage":"url(./img/p.png)"}} onMouseEnter={() => {smapinfoppl("(同呀P傾計)")}} onMouseLeave={() => {smapinfoppl("")}} onClick={() => {sframe(2); startingchat();}}></button>
        <button className="ppbut" style={{"top":"min(23vw,46vh)", "right":"min(73vw,146vh)", "backgroundImage":"url(./img/z.png)"}} onMouseEnter={() => {smapinfoppl("(同呀Z傾計)")}} onMouseLeave={() => {smapinfoppl("")}} onClick={() => {sframe(3); startingchat();}}></button>
        <button className="ppbut" style={{"top":"min(31vw,62vh)", "right":"min(25.5vw,51vh)", "backgroundImage":"url(./img/a.png)"}} onMouseEnter={() => {smapinfoppl("(同呀A傾計)")}} onMouseLeave={() => {smapinfoppl("")}} onClick={() => {sframe(4); startingchat();}}></button>
        <button className="ppbut" style={{"top":"min(10vw,20vh)", "right":"min(22.5vw,45vh)", "backgroundImage":"url(./img/l.png)"}} onMouseEnter={() => {smapinfoppl("(同呀L傾計)")}} onMouseLeave={() => {smapinfoppl("")}} onClick={() => {sframe(5); startingchat();}}></button>
        <img className="dir" style={{"top":"min(20vw,40vh)", "right":"min(1vw,2vh)"}} src={"./img/east.png"} alt="" />
        <img className="dir" style={{"top":"min(20vw,40vh)", "left":"min(1vw,2vh)"}} src={"./img/west.png"} alt="" />
        <img className="dir" style={{"top":"min(20vw,2vh)", "left":"min(40vw,80vh)"}} src={"./img/north.png"} alt="" />
        <img className="dir" style={{"bottom":"min(1vw,2vh)", "left":"min(40vw,80vh)"}} src={"./img/south.png"} alt="" />
        <span className="mapinfo">地圖: (灣仔海濱公園)<br/>請點擊你想談天的對象<br/>{mapinfoppl}⠀<br/><br/>遊戲進度: {10*((visited[0].concat(visited[1])).filter(x => x).length)}%</span>
      </div>
      </FadeInOut>
      <FadeInOut show={frame>=1} duration={1000}>
      <div className="frame">
        {vtodisctext.current==="*呀P show咗幾幅相畀你睇..." ? <img style={{"position":"absolute", "left":"min(18vw,36vh)", "width":"min(45vw,90vh)"}} src={"./img/ppic.png"} alt="" /> : <></>}
        <button className="genbutton" style={{"top":"min(29vw,58vh)", "right":"min(11vw,22vh)"}} onClick={() => {
          if (vtodisctext.current==="⠀" && vcpath.current!==2) {
            const temp=[[...visited[0]],[...visited[1]]];
            temp[vcpath.current][frame-1]=true;
            svisited(temp);
            localStorage.setItem('visited',JSON.stringify(temp));
          }
          vtodisctext.current=""; sframe(-1); scprog(0); vcprog.current=0; vcpath.current=0; sspeaking(""); sdisctext(""); sshowprogbut(false); noclickf();
          }}>{"<"}返回地圖</button>
        <button className="genbutton" style={{"top":"min(29vw,58vh)", "right":"0vh"}} onClick={() => {scheckbag(1); noclickf(520);}}>查看背包</button>
        <div className="circle" style={{"top":"min(25vw,50vh)", "left":"min(2.5vw,5vh)", "width":"min(15vw,30vh)", "height":"min(15vw,30vh)", "backgroundImage":"url(./img/"+["blankppl","u","p","z","a","l"][Math.max(0,frame)]+".png)"}}></div>
        <div className="tbub">
          {frame>0 ? (vtodisctext.current==="⠀" ? "" : speaking)+disctext : ""}
          {!showprogbut ? <>{vtodisctext.current==="⠀" && vcpath.current!==2 && visited[vcpath.current][frame-1] ? <button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(4.5vw,9vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {progchat(-1);}}> {"<"} </button> : <></>}</> :
           vtodisctext.current!=="咦, 你過嚟搵我做咩呀?" ? <>
           <button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(1.5vw,3vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {progchat();}}> {">"} </button>
           {vcpath.current!==2 && visited[vcpath.current][frame-1] ? <button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(4.5vw,9vh)", "width":"min(2.5vw,5vh)"}} onClick={() => {progchat(-1);}}> {"<"} </button> : <></>}
           {vframe.current===1 && vcpath.current===0 && vcprog.current===12 ? <a href="https://www.instagram.com/epsithafung_0818/" target="_blank" rel="noreferrer"><button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(7.5vw,15vh)"}}> 查看IG </button></a> : <></>}
           {vframe.current===3 && vcpath.current===0 && vcprog.current===6 ? <a href="https://www.instagram.com/mandyfung_0818/" target="_blank" rel="noreferrer"><button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(7.5vw,15vh)"}}> 查看IG </button></a> : <></>}
           </>
          : visited[0][frame-1] ? 
          <><button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(22.5vw,45vh)", "width":"min(25vw,50vh)"}} onClick={() => {vcpath.current=0; progchat();}}>我想探問Stack Undarflow嘅真相!</button>
          <button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(1.5vw,3vh)", "width":"min(20vw,40vh)"}} onClick={() => {sqnpc(true); scheckbag(1);}}>關於呢樣嘢, 我想問多少少...</button></>
          : <button className="genbutton" style={{"bottom":"min(0.75vw,1.5vh)", "right":"min(1.5vw,3vh)", "width":"min(25vw,50vh)"}} onClick={() => {vcpath.current=0; progchat();}}>我想探問Stack Undarflow嘅真相!</button>}
        </div>
      </div>
      </FadeInOut>
    <footer><div className="footer1">an Undarfly Project since 10th June 2024, by Ulfred Chan</div></footer>
    </div>
  );
}

export default App;
