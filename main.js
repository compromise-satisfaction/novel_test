enchant();

function Game_load(width,height){
  game = new Game(width,height);
  game.fps = 60;
  game.onload = function(){
    delete Save_Datas.場所;
    game.replaceScene(Talk_Scene("タイトル"));
    return;
  };
  game.start();
};
