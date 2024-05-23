const sceanTitle = ['「森のいたずらっこ妖精くん」'];
const sceanOverview = ['知ってますか？', '森に住む妖精って、生まれつき名前のついた妖精なのではなくて、','その子が成りたい姿の妖精になっていくんですよ。','でも、どうやら、そこにいる妖精くんは、','自分がどんな妖精になりたいのか、まだわからないようです。'];
const sceanOtokonoko = ['おや、そこに男の子がやってきました。', '男の子「こんにちは」', '妖精さん「こんにちは」', '男の子はニコっとして、走っていきました。', '妖精さんも走って追いかけました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanShounenn = ['次の日、そこに少年がやってきました。', '少年「こんにちは」', '妖精さん「こんにちは」', '少年はニコっとして、木に登りました。', '妖精さんも同じように木に登りました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanSeinennMan = ['次の日、そこに青年の男性がやってきました。', '青年の男性「こんにちは」', '妖精さん「こんにちは」', '青年の男性はニコっとして、魚釣りをしました。', '妖精さんも同じように、真似して魚釣りをしました。', 'ふたりは、時間を忘れて楽しみました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanUncle = ['次の日、そこにおじさんがやってきました。', 'おじさん「こんにちは」', '妖精さん「こんにちは」', 'おじさんはニコっとして、薪を集めました。', '妖精さんも同じように、真似して薪を集めました。', 'ふたりは、時間を忘れて汗を流しました。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];
const sceanGrandpa = ['次の日、そこにおじいさんがやってきました。', 'おじいさん「こんにちは」', '妖精さん「こんにちは」', 'おじいさんはニコっとして、川のほとりに座りました。', '妖精さんも同じように、真似して川のほとりに座りました。', 'ふたりは、時間を忘れて汗を流しました？？。', '妖精さんは「今日は楽しい一日だったな」とおもいました。'];

const scean = [
  sceanTitle,
  sceanOverview,
  sceanOtokonoko,
  sceanShounenn,
  sceanSeinennMan,
  sceanUncle,
  sceanGrandpa,
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
  