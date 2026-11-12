/* ホームの「開催中・開催予定のゲーム」に出す3枚のカード。ゲームを入れ替えるときはここだけ編集します。
   title  : カード下のゲーム名（15文字くらいまで）
   status : maintenance=メンテナンス中 / building=作成中 / active=開催中 / planning=企画中 /
            preparing=準備中 / recruiting=募集中 / ended=終了
   image  : assets/ に置いた16:9の画像（推奨1200×675px）
   scene  : 画像の余白の色。'axisbay'（白）/ 'rust'（黒）/ 'request'（募集カード）
   募集カード（scene:'request'）は画像なし。subtitle の \n で改行できます。 */
window.KUMA_GAMES = [
  {title:'FIVEM・AxisBay',status:'maintenance',image:'assets/axisbay-card-v2.webp',alt:'AxisBayのロゴ',scene:'axisbay'},
  {title:'MURAKUMA Rust',status:'building',image:'assets/murakuma-card-prod.webp',alt:'MURAKUMA Rustのロゴ',scene:'rust'},
  {title:'ゲーム募集中',subtitle:'みんなのリクエストで\n次のゲームを決定！',scene:'request'}
];
