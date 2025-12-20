enchant();

function Game_load(width,height){
  game = new Game(width,height);
  game.fps = 60;
  game.onload = function(){
    game.replaceScene(Talk_Scene("ゲームロード"));
    return;
  };
  game.start();
};
