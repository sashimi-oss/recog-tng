const sceanTitle = ['「森のいたずらっこ妖精くん」'];
const sceanOverview = ['知ってますか？', '森に住む妖精って、生まれつき名前のついた妖精なのではなくて、','その子が成りたい姿の妖精になっていくんですよ。','でも、どうやら、そこにいる妖精くんは、','自分がどんな妖精になりたいのか、まだわからないようです。'];
const sceanOnnnanoko = ['次の日、そこに女の子がやってきました。', '女の子「こんにちは」', '妖精さん「こんにちは」', '女の子はニコっとして、お花を摘み始めました。', '妖精さんも同じようにお花を摘み始めました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanShoujo = ['次の日、そこに少女がやってきました。', '少女「こんにちは」', '妖精さん「こんにちは」', '少女はニコっとして、川のそばをゆっくり歩きました。', '妖精さんも同じように、川のそばをゆっくり歩きました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanSeinenWoman = ['次の日、そこに青年の女性がやってきました。', '青年の女性「こんにちは」', '妖精さん「こんにちは」', '青年の女性はニコっとして、魚釣りをしました。', '妖精さんも同じように、真似して魚釣りをしました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanAunt = ['次の日、そこにおばさんがやってきました。', 'おばさん「こんにちは」', '妖精さん「こんにちは」', 'おばさんはニコっとして、川で洗濯をしました。', '妖精さんも同じように、真似して川で洗濯をしました。', 'ふたりは、時間を忘れて汗を流しました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanGrandma = ['次の日、そこにおばあさんがやってきました。', 'おばあさん「こんにちは」', '妖精さん「こんにちは」', 'おばあさんはニコっとして、川のほとりに座りました。', '妖精さんも同じように、真似して川のほとりに座りました。', 'ふたりは、時間を忘れて汗を流しました？？。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];

const scean = [
  sceanTitle,
  sceanOverview,
  sceanOnnnanoko,
  sceanShoujo,
  sceanSeinenWoman,
  sceanAunt,
  sceanGrandma
];

let display = document.getElementById('display');
let btn = document.getElementById('btn');
let cutCnt = 0;
let flag = 0;
let num = 0;

function sCut(sceanCnt) {//sCutはsceanCutの略、シーンとカットを制御する関数
  display.innerHTML = scean[sceanCnt][cutCnt];

  if (cutCnt === scean[sceanCnt].length - 1){//セリフ終わったら
      flag = 1;
      cutCnt = 0;
  } else {
      cutCnt++;
      flag = 0;
  }
};


  btn.addEventListener('click', () => {
    sCut(num);
    if (flag === 1){
        console.log('セリフ終わり！');
        num++;
    } else {
        console.log('セリフ続くよ');
    }
  });