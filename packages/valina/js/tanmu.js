// 弹幕区域的 DOM 引用
const tanmuAreaEl = document.getElementById('tanmu-area');
// 输入弹幕表单的 DOM 引用
const tanmuInputEl = document.getElementById('tanmu-input');
// 动画建动作的时间间隔，这里表示是 10ms
const timeDiffLimit = 10;
// 弹幕块之间的 空白间距 单位 px
const spaceBetweenTanmu = 20;
// 标记上一次动画的时间点
let lastTime = null;

// 可见区域的弹幕池数据结构，按行区分，每行的速率随机分配
let displayTanmuPool = [
  { valocity: randomValoctiy(), tanmuList: [] },
  { valocity: randomValoctiy(), tanmuList: [] },
  { valocity: randomValoctiy(), tanmuList: [] },
];
// 未在可见区域的弹幕池，用来储存初始弹幕和回收的弹幕
const waitingTanmuPool = [
  { id: 1, text: '山有木兮木有枝，心悦君兮君不知。' },
  { id: 2, text: '人生若只如初见，何事秋风悲画扇。' },
  { id: 3, text: '想见东坡旧居士，挥毫百斛泻明珠。' },
  { id: 4, text: '呼鸡过篱栅，行酒尽儿孙。' },
  { id: 5, text: '回首风流，紫竹村边住。孤鸿语，三生定许，可梁鸿侣？' },
  { id: 6, text: '林有朴樕，野有死鹿。白茅纯束，有女如玉。' },
  { id: 7, text: '舒而脱脱兮！无感我帨兮！无使尨也吠！' },
  {
    id: 8,
    text:
      '身不得，男儿列。心却比，男儿烈！算平生肝胆，因人常热。俗子胸襟谁识我？英雄末路当磨折。莽红尘，何处觅知音？青衫湿！',
  },
  {
    id: 9,
    text:
      '昨夜寒蛩不住鸣。惊回千里梦，已三更。起来独自绕阶行。人悄悄，帘外月胧明。',
  },
  {
    id: 10,
    text:
      '无限伤心夕照中，故国凄凉，剩粉余红。金沟御水自西东，昨岁陈宫，今岁隋宫。',
  },
  { id: 11, text: '自在飞花轻似梦，无边丝雨细如愁。' },
  { id: 12, text: '春风得意马蹄疾，一日看尽长安花。' },
  { id: 13, text: '时光只解催人老，不信多情，长恨离亭，泪滴春衫酒易醒。' },
  { id: 14, text: '执子之手，与子偕老。' },
  { id: 15, text: '自在飞花轻似梦，无边丝雨细如愁。' },
  { id: 16, text: '春宵一刻值千金，花有清香月有阴~~~' },
  { id: 17, text: '昨夜西风凋碧树，独上高楼，望尽天涯路。' },
  { id: 18, text: '清又安流林务飞家规些气于还加东进小。' },
  { id: 19, text: '还君明珠双泪垂，恨不相逢未嫁时。' },
  { id: 20, text: '飞入寻常百姓家。' },
  { id: 21, text: '旧时王谢堂前燕' },
  { id: 22, text: '凡战之法，昼以旌旗幡麾为节，夜以金鼓笳笛为节。' },
  { id: 23, text: '避之于易，邀之于阨。故曰：以一击十，莫善于阨。' },
  { id: 24, text: '敌近而薄我，欲去无路，我众甚惧，为之奈何？' },
  {
    id: 25,
    text: '左右高山，地甚狭迫，卒遇敌人，击之不敢，去之不得，为之奈何？',
  },
  {
    id: 26,
    text:
      '行之三年，秦人兴师，临于西河。魏士闻之，不待吏令，介胄而奋击之者以万数。',
  },
  {
    id: 27,
    text:
      '吾十有五而志于学，三十而立，四十而不惑，五十而知天命，六十而耳顺，七十而从心所欲，不逾矩。',
  },
  { id: 28, text: '色难。有事，弟子服其劳；有酒食，先生馔，曾是以为孝乎？' },
  { id: 29, text: '君子不器。' },
  { id: 30, text: '非其鬼而祭之，谄也；见义不为，无勇也。' },
  { id: 31, text: '人而不仁，如礼何？人而不仁，如乐何？' },
  {
    id: 32,
    text:
      '巧笑倩兮，美目盼兮，素以为绚兮’何谓也？”子曰：“绘事后素。”曰：“礼后乎？”子曰：“起予者商也，始可与言《诗》已矣。',
  },
  { id: 33, text: '禘自既灌而往者，吾不欲观之矣。' },
  { id: 34, text: '吾不与祭，如不祭。' },
  { id: 35, text: '统电传六构包切周监于二代，郁郁乎文哉！吾从周。' },
  { id: 36, text: '孰谓鄹人之子知礼乎？入太庙，每事问。' },
  { id: 37, text: '射不主皮，为力不同科，古之道也。' },
  { id: 38, text: '关睢，乐而不淫，哀而不伤。' },
  { id: 39, text: '乐其可知也。始作，翕如也' },
  { id: 40, text: '尽美矣，未尽善也。' },
  { id: 41, text: '居上不宽，为礼不敬，临丧不哀，吾何以观之哉？' },
  { id: 42, text: '里仁为美。择不处仁，焉得知？' },
  { id: 43, text: '唯仁者能好人，能恶人。' },
  { id: 44, text: '富与贵，是人之所欲也。' },
  { id: 45, text: '朝闻道，夕死可矣。' },
  { id: 46, text: '君子之于天下也，无适也，无莫也，义之与比。' },
  { id: 47, text: '君子怀德，小人怀土；君子怀刑，小人怀惠。' },
  { id: 48, text: '放于利而行，多怨。' },
  { id: 49, text: '不患无位，患所以立；不患莫己知，求为可知也。' },
  { id: 50, text: '君子喻于义，小人喻于利。' },
  { id: 51, text: '见贤思齐焉，见不贤而内自省也。' },
  { id: 52, text: '德不孤，必有邻。' },
  { id: 53, text: '以约失之者鲜矣。' },
  { id: 54, text: '瞒天过海' },
  { id: 55, text: '围魏救赵' },
  { id: 56, text: '借刀杀人' },
  { id: 57, text: '阴以待逆。暴戾恣睢，其势自毙。顺以动豫，豫顺以动。' },
  { id: 58, text: '信而安之，阴以图之。备而后动，勿使有变。刚中柔外也。' },
  { id: 59, text: '势必有损，损阴以益阳。' },
  { id: 60, text: '微隙在所必乘，微利在所必得。少阴，少阳。' },
  { id: 61, text: '疑以叩实，察而后动。复者，阴之媒也。' },
  {
    id: 62,
    text:
      '有用者，不可借；不能用者，求借。借不能用者而用之。匪我求童蒙，童蒙求我。',
  },
  { id: 63, text: '待天以困之，用人以诱之，往蹇来连。' },
  { id: 64, text: '逼则反兵，走则减势。' },
  {
    id: 65,
    text:
      '禹乃遂与益、后稷奉帝命，命诸侯百姓兴人徒以傅土，行山表木，定高山大川。',
  },
  { id: 66, text: '成汤，自契至汤八迁。汤始居亳，从先王居，作帝诰。' },
  {
    id: 67,
    text:
      '后稷卒，子不窋立。不窋末年，夏后氏政衰，去稷不务，不窋以失其官而饹戎狄之间。不窋卒，子鞠立。鞠卒，子公刘立。公刘虽在戎狄之间，复脩后稷之业，务耕种，行地宜，自漆、沮度渭，取材用，行者有资，居者有畜积，民赖其庆。百姓怀之，多徙而保归焉。周道之兴自此始，故诗人歌乐思其德。公刘卒，子庆节立，国於豳。',
  },
  { id: 68, text: '五年，釐王崩，子惠王阆立。' },
  { id: 69, text: '十三年，郑伐滑，王使游孙、伯服请滑，郑人囚之。' },
  { id: 70, text: '二十四年，晋文公卒。' },
  { id: 71, text: '二十一年，定王崩，子简王夷立。' },
  { id: 72, text: '三十九年，齐田常杀其君简公。' },
  { id: 73, text: '四十一年，楚灭陈。孔子卒。' },
  { id: 74, text: '近水楼台先得月，向阳花木易为春。' },
  { id: 75, text: '偶然值林叟，谈笑无还期。' },
  { id: 76, text: '三十一年，秦穆公卒。' },
  { id: 77, text: '三十二年，襄王崩，子顷王壬臣立。' },
  {
    id: 78,
    text: '顷王六年，崩，子匡王班立。匡王六年，崩，弟瑜立，是为定王。',
  },
  { id: 79, text: '敬王元年，晋人入敬王，子朝自立。' },
  { id: 80, text: '四十一年，楚灭陈。孔子卒。' },
  { id: 81, text: '定王十六年，三晋灭智伯，分有其地。' },
  { id: 82, text: '二十四年，崩，子安王骄立。是岁盗杀楚声王。' },
  { id: 83, text: '安王立二十六年，崩，子烈王喜立。' },
  { id: 84, text: '八年，秦攻宜阳，楚救之。' },
  { id: 85, text: '东周与西周战，韩救西周。' },
  { id: 86, text: '四十二年，秦破华阳约。' },
  { id: 87, text: '五十八年，三晋距秦。' },
  { id: 88, text: '后稷居邰，太王作周。' },
  { id: 89, text: '乃妻之姚姓之玉女。' },
  {
    id: 90,
    text:
      '昔我先郦山之女，为戎胥轩妻，生中潏，以亲故归周，保西垂，西垂以其故和睦。',
  },
  { id: 91, text: '庄公居其故西犬丘，生子三人，其长男世父。' },
  { id: 92, text: '秦嬴生秦侯。秦侯立十年，卒。' },
  { id: 93, text: '宁公二年，公徙居平阳。' },
  { id: 94, text: '十三年，齐人管至父、连称等杀其君襄公而立公孙无知。' },
  { id: 95, text: '十九年，晋曲沃始为晋侯。齐桓公伯於鄄。' },
  { id: 96, text: '成公元年，梁伯、芮伯来朝。齐桓公伐山戎，次于孤竹。' },
  { id: 97, text: '五年，晋献公灭虞' },
  { id: 98, text: '九年，齐桓公会诸侯於葵丘。' },
  { id: 99, text: '十二年，齐管仲、隰朋死。' },
  { id: 100, text: '缪公与麾下驰追之' },
];

// tanmu 动画帧函数
function tanmuAnimateFn(time) {
  // 检查并将相关弹幕推到可见区弹幕池中
  checkNeedNewTanmuAndPushTanmuToDisplayPool();

  // 重新计算弹幕位置，更新试图
  recalculateDisplayElementPosition(time);
  // 回收不需要的弹幕
  recycleOutScopeTanmu();

  // 注册下一次动画回调
  requestAnimationFrame(tanmuAnimateFn);
}

function recalculateDisplayElementPosition(time) {
  if (!lastTime) {
    lastTime = time;
    return;
  };

  const timeDiff = time - lastTime;

  if (timeDiff > timeDiffLimit) {
    displayTanmuPool.forEach(row =>
      row.tanmuList.forEach(tanmu => (tanmu.meta.offset -= row.valocity)),
    );
    renderTanmu();
    lastTime = time;
  }
}

function checkNeedNewTanmuAndPushTanmuToDisplayPool() {
  const rows = Array.prototype.slice.call(
    tanmuAreaEl.querySelectorAll('.tanmu-row'),
  );

  rows.forEach((row, index) => {
    const tanmuELs = row.querySelectorAll('.tanmu-item');
    const lastTanmuEl = tanmuELs[tanmuELs.length - 1];

    if (
      !lastTanmuEl ||
      (lastTanmuEl &&
        displayTanmuPool[index] &&
        displayTanmuPool[index].tanmuList[displayTanmuPool[index].tanmuList.length - 1].meta
          .offset <
          -lastTanmuEl.offsetWidth - spaceBetweenTanmu)
    ) {
      // 插入新节点
      const tanmu = waitingTanmuPool.shift();
      if (!tanmu) return;
      tanmu.meta = {
        top: 0,
        offset: 0,
      };

      // 确保池子里面存在数组
      if (!displayTanmuPool[index]) {
        displayTanmuPool[index] = [];
      }

      displayTanmuPool[index].tanmuList.push(tanmu);
    }
  });
}

function recycleOutScopeTanmu() {
  const rows = Array.prototype.slice.call(
    tanmuAreaEl.querySelectorAll('.tanmu-row'),
  );

  rows.forEach((row, index) => {
    const firstTanmuEl = row.querySelectorAll('.tanmu-item')[0];
    if (
      firstTanmuEl &&
      displayTanmuPool[index] &&
      displayTanmuPool[index].tanmuList[0] &&
      displayTanmuPool[index].tanmuList[0].meta.offset <
        -(firstTanmuEl.offsetWidth + tanmuAreaEl.offsetWidth)
    ) {
      const outTanmu = displayTanmuPool[index].tanmuList.shift();
      outTanmu && waitingTanmuPool.push(outTanmu);
    }
  });
}

// render 函数
function renderTanmu() {
  tanmuAreaEl.innerHTML = ejs.render(
    `
    <% displayTanmuPool.forEach(function(tanmuRow, index){ %>
      <div class="tanmu-row">
        <% tanmuRow.tanmuList.forEach(function(tanmu) { %>
          <div 
            class="tanmu-item"
            data-id="<%= tanmu.id %>"
            style="transform: translate3d(<%= tanmu.meta.offset %>px, 0, 0); top: <%= tanmu.meta.top %>px"
          ><%= tanmu.text %></div>
        <% })%>
      </div>
    <% }) %>
    `,
    { displayTanmuPool },
  );
}

// 随机函数
function randomValoctiy() {
  return [1, 2, 3][Math.floor(Math.random() * 3)];
}

// 主函数
!(function main() {
  requestAnimationFrame(tanmuAnimateFn);

  tanmuInputEl.addEventListener('submit', e => {
    e.preventDefault();
    const inputValue = e.target.querySelector('input').value;
    waitingTanmuPool.unshift({
      id: String(Math.random()).slice(2),
      text: inputValue,
    });
    e.target.querySelector('input').value = '';
  });
})();
