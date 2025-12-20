var Scene = {会話:null};

var Talk_Scene = function(Position){
  var scene = null;
  var Datas = null;
  scene = new Scene();
  Scene.会話 = scene;

  var Black_Image = Create_Image(0,0,width,height,"システム/黒");
  var Back_Image = Create_Image(0,0,width,height,"テストタイトル");
  var Name_window = Create_Image(0,0,width,height,"システム/名前枠");
  var Talk_window = Create_Image(0,0,width,height,"システム/会話枠");
  scene.addChild(Back_Image);

  var Texts = [];
  var Text_I = 0;
  var One_column = 20;

  var Syoki_X = width/100*3;

  var Name = new Sprite();
  Name._element = document.createElement("innerHTML");
  Name._style.font  = (width/One_column*0.8) + "px serif";
  Name._style.color = "black";
  Name.x = Syoki_X;
  Name.y = height/10*5.95;
  scene.addChild(Name);

  function Text(){
    var I = Texts.length;
    Texts[I] = new Sprite();
    Texts[I]._element = document.createElement("innerHTML");
    Texts[I]._style.font  = (width/One_column*0.8) + "px serif";
    Texts[I]._style.color = "white";
    scene.addChild(Texts[I]);
    return(Texts[I]);
  };

  function Again_Child(){
    for(var I = 2; I < Images.length; I++) scene.removeChild(Images[I]);
    if(Datas.画像){
      for(var I = 0; I < Datas.画像.length; I++){
        if(Datas.画像[I].W=="width") Datas.画像[I].W = width;
        if(Datas.画像[I].H=="width") Datas.画像[I].H = width;
        if(Datas.画像[I].H=="height") Datas.画像[I].H = height;
        if(!Images[I+14]) Create_Image(Datas.画像[I].X,Datas.画像[I].Y,Datas.画像[I].W,Datas.画像[I].H,Datas.画像[I].src);
        else{
          Images[I+14].x = Datas.画像[I].X;
          Images[I+14].y = Datas.画像[I].Y;
          Images[I+14].width = Datas.画像[I].W;
          Images[I+14].height = Datas.画像[I].H;
          if(Datas.画像[I].src.match(/gif/)) Images[I+14]._element.src = "Images/" + Datas.画像[I].src;
          else Images[I+14]._element.src = "Images/" + Datas.画像[I].src + ".png";
        };
        scene.addChild(Images[I+14]);
      };
    };
    Back_Image._element.src = "Images/背景/" + Datas.背景 + ".png";
    Talk_window.opacity = Save_Datas.システム.枠透明度;
    scene.addChild(Talk_window);
    scene.removeChild(Name);
    Name_C.font = Name._style.font;
    Syoki_Y = width/One_column*Text_Size*7.2;
    if(Datas.名前){
      Syoki_Y = width/One_column*Text_Size*8;
      Name.x = 35 + (440 - Name_C.measureText(Datas.名前).width) / 2;
      Name._element.textContent = Datas.名前;
      scene.addChild(Name_window);
      scene.addChild(Name);
    };
    Text_I = 0;
    Next = false;
    Canvas_C.X = Syoki_X;
    Canvas_C.Y = Syoki_Y;
    for(var I = 0; I < Texts.length; I++){
      Texts[I].tl.queue = [];
      Texts[I]._element.textContent = "";
      scene.removeChild(Texts[I]);
      scene.addChild(Texts[I]);
    };
    for(var I = 0; I < ChoiceText.length; I++) ChoiceText[I]._element.textContent = "";
    if(Datas.フラグ){
      switch(Datas.フラグ[1]){
        case "=":
          switch(Datas.フラグ[0]){
            case "時間":
              if(!Flags[Datas.フラグ[0]]) Flags[Datas.フラグ[0]] = new Date().toLocaleString("ja-JP").slice(0,-3);
              Temp = new Date(Flags[Datas.フラグ[0]]);
              Flags[Datas.フラグ[0]] = Flags[Datas.フラグ[0]].replace(/ \d{1,2}:\d{1,2}/," " + Datas.フラグ[2]);
              Flags[Datas.フラグ[0]] = new Date(Flags[Datas.フラグ[0]]);
              if(Temp.getTime() >= Flags[Datas.フラグ[0]].getTime()) Flags[Datas.フラグ[0]].setDate(Flags[Datas.フラグ[0]].getDate() + 1);
              Flags[Datas.フラグ[0]] = Flags[Datas.フラグ[0]].toLocaleString("ja-JP").slice(0,-3);
              break;
            default:
              Flags[Datas.フラグ[0]] = Datas.フラグ[2];
              break;
          };
          break;
        case "+":
          switch(Datas.フラグ[0]){
            case "時間":
              if(!Flags[Datas.フラグ[0]]) Flags[Datas.フラグ[0]] = new Date();
              else Flags[Datas.フラグ[0]] = new Date(Flags[Datas.フラグ[0]]);
              Flags[Datas.フラグ[0]].setMinutes(Flags[Datas.フラグ[0]].getMinutes() + Datas.フラグ[2]);
              Flags[Datas.フラグ[0]] = new Date(Flags[Datas.フラグ[0]]).toLocaleString("ja-JP").slice(0,-3);
              break;
            default:
              Flags[Datas.フラグ[0]] = Datas.フラグ[2];
              break;
          };
          break;
      };
      console.log(Flags);
    };
    return;
  };

  function Choice_Child(){
    Temp = [];
    for(var I = 0; I < Datas.選択肢.length; I++){
      if(typeof(Datas.選択肢[I][0])=="string") Temp.push(Datas.選択肢[I]);
      else{
        switch(Datas.選択肢[I][0][1]){
          case "セーブ":
            switch(Datas.選択肢[I][0][0]){
              case 1:
              case 2:
              case 3:
                if(Save_Datas["セーブデータ"+Datas.選択肢[I][0][0]]){
                  Datas.選択肢[I].shift();
                  Temp.push(Datas.選択肢[I]);
                };
                break;
              default:
                if(Save_Datas["セーブデータ1"]||Save_Datas["セーブデータ2"]||Save_Datas["セーブデータ3"]){
                  Datas.選択肢[I].shift();
                  Temp.push(Datas.選択肢[I]);
                };
                break;
            };
            break;
          case "=":
            if(Flags[Datas.選択肢[I][0][0]] == Datas.選択肢[I][0][2]){
              Datas.選択肢[I].shift();
              Temp.push(Datas.選択肢[I]);
            };
            break;
          case ">":
            if(Flags[Datas.選択肢[I][0][0]] > Datas.選択肢[I][0][2]){
              Datas.選択肢[I].shift();
              Temp.push(Datas.選択肢[I]);
            };
            break;
          case "<":
            switch(Datas.選択肢[I][0][0]){
              case "時間":
                if(!Flags.時間) Flags.時間 = new Date().toLocaleString("ja-JP").slice(0,-3);
                Flags.時間 = [new Date(Flags.時間)];
                Flags.時間[1] = Flags.時間[0].toLocaleDateString("sv-SE") + " " + Datas.選択肢[I][0][2];
                Flags.時間[1] = new Date(Flags.時間[1].replace(/-/g,"/"));
                if(Flags.時間[0].getTime() < Flags.時間[1].getTime()){
                  Datas.選択肢[I].shift();
                  Temp.push(Datas.選択肢[I]);
                };
                Flags.時間 = Flags.時間[0].toLocaleString("ja-JP").slice(0,-3);
                break;
            };
            if(Flags[Datas.選択肢[I][0][0]] < Datas.選択肢[I][0][2]){
              Datas.選択肢[I].shift();
              Temp.push(Datas.選択肢[I]);
            };
            break;
          case "><":
            if(Flags[Datas.選択肢[I][0][0]] > Datas.選択肢[I][0][2] && Flags[Datas.選択肢[I][0][0]] < Datas.選択肢[I][0][3]){
              Datas.選択肢[I].shift();
              Temp.push(Datas.選択肢[I]);
            };
            break;
          default:
            console.log(Datas.選択肢[I][0][1]);
            break;
        };
      };
    };
    Datas.選択肢 = [];
    for(var I = 0; I < Temp.length; I++){
      Datas.選択肢.push(Temp[I]);
      Name_C = document.createElement("canvas").getContext("2d");
      Name_C.font = ChoiceText[I]._style.font;
      if(Temp[I][0].match(/ファイル[123]/)){
        if(Save_Datas.セーブデータ1) Temp[I][0] = Temp[I][0].replace(/ファイル1/,Save_Datas.セーブデータ1.時間);
        if(Save_Datas.セーブデータ2) Temp[I][0] = Temp[I][0].replace(/ファイル2/,Save_Datas.セーブデータ2.時間);
        if(Save_Datas.セーブデータ3) Temp[I][0] = Temp[I][0].replace(/ファイル3/,Save_Datas.セーブデータ3.時間);
      };
      ChoiceText[I].x = (width - Name_C.measureText(Temp[I][0]).width) / 2;
      ChoiceText[I]._element.textContent = Temp[I][0];
      ChoiceText[I].y = 500 / Temp.length * I + 25;
      ChoiceText[I].枠1.y = ChoiceText[I].y+5;
      ChoiceText[I].枠2.y = ChoiceText[I].y+5;
      ChoiceText[I].枠1.opacity = 1;
      if(I) ChoiceText[I].枠2.opacity = 0;
      else{
        Choice_Number = I;
        Choice_Data = Temp[I][1];
        ChoiceText[I].枠2.opacity = 0.5;
      };
      scene.removeChild(ChoiceText[I].枠1);
      scene.removeChild(ChoiceText[I].枠2);
      scene.removeChild(ChoiceText[I]);
      scene.addChild(ChoiceText[I].枠1);
      scene.addChild(ChoiceText[I].枠2);
      scene.addChild(ChoiceText[I]);
    };
    return;
  };

  var Name_C = document.createElement("canvas").getContext("2d");

  Datas = Talk_Datas[Position];
  Datas = JSON.stringify(Datas);
  Datas = JSON.parse(Datas);
  if(!Datas.時間) Datas.時間 = 5;
  var Time = Datas.時間;
  var Text_color = "white";
  var Text_Size = 1;
  var Next = false;

  function Sitasankaku(A){
    Target = Texts[Text_I+1];
    if(!Target) Target = Text();
    if(A=="中断"){
      Text_I++;
      Time = 0;
      Target.x = Canvas_C.X;
      Target.y = Canvas_C.Y;
      Target._style.color = "blue";
      Target._style.font  = Text_Size * (width/One_column*0.8) + "px serif";
      Target._element.textContent = "▼";
      Datas.中断 = Datas.テキスト;
      Datas.テキスト = "";
      Next = A;
      return;
    };
    Page++;
    Time = 0;
    Text_I = 0;
    Target.x = Canvas_C.X;
    Target.y = Canvas_C.Y;
    Target._style.color = "blue";
    Target._style.font  = Text_Size * (width/One_column*0.8) + "px serif";
    if(Datas.変化){
      if(Datas.変化[Page-1]){
        if(Datas.変化[Page-1].最後) Change(Datas.変化[Page-1].最後);
      };
    };
    Target._element.textContent = "▼";
    Next = A;
    if(Datas.次&&A=="終") Next = "次";
    if(Datas.選択肢&&A=="終"){
      Next = "選";
      Choice_Child();
    };
    return;
  };

  var Wait = Datas.時間;
  var Page = 0;
  var Target = Text();
  var Canvas_C = document.createElement("canvas").getContext("2d");
  var Syoki_Y = width/One_column*Text_Size*8;
  Canvas_C.font = Target._style.font;
  Canvas_C.X = Syoki_X;
  Canvas_C.Y = Syoki_Y;

  var ChoiceText = [];
  var Choice_Data = false;

  function Choice(){
    ChoiceText[I] = new Sprite();
    ChoiceText[I]._element = document.createElement("innerHTML");
    ChoiceText[I]._style.font  = (width/One_column*0.8) + "px serif";
    ChoiceText[I]._style.color = "black";
    ChoiceText[I]._element.textContent = "テスト";
    ChoiceText[I].枠1 = Create_Image(width/4,0);
    ChoiceText[I].枠1.width = width/2;
    ChoiceText[I].枠1.height = width/One_column*0.8/3*4;
    ChoiceText[I].枠1._element.src = "Images/システム/選択肢1.png";
    ChoiceText[I].枠2 = Create_Image(width/4,0);
    ChoiceText[I].枠2.width = width/2;
    ChoiceText[I].枠2.height = width/One_column*0.8/3*4;
    ChoiceText[I].枠2._element.src = "Images/システム/選択肢2.png";
    return;
  };

  for(var I = 0; I < 5; I++) Choice();

  Again_Child();
  if(Datas.時間=="無"){
    Wait = 0;
    while(!Next) Text_Display();
    Time = 30;
  };
  scene.removeChild(Black_Image);
  scene.addChild(Black_Image);

  function Text_Display(){
    var Temp = null;
    Target = Texts[Text_I];
    if(!Target) Target = Text();
    Target.tl.queue = [];
    Target.opacity = 1;
    while(Datas.テキスト[0]==" "){
      Datas.テキスト = Datas.テキスト.slice(1);
      Canvas_C.X += Canvas_C.measureText(Datas.テキスト[0]).width;
    };
    switch(Datas.テキスト[0]){
      case "▶":
        Datas.テキスト = Datas.テキスト.slice(1);
        Sitasankaku("中断");
        return;
      case "▼":
        Datas.テキスト = Datas.テキスト.slice(1);
        Sitasankaku("続");
        return;
      case "\n":
        Datas.テキスト = Datas.テキスト.slice(1);
        if(Canvas_C.X  == width/10) return;
        Canvas_C.X  = Syoki_X;
        Canvas_C.Y += width/One_column*Text_Size;
        if(Canvas_C.Y > width/16*9){
          Datas.テキスト = Target._element.textContent + Datas.テキスト;
          Sitasankaku("続");
          return;
        };
        break;
    };
    Target.x = Canvas_C.X;
    Target.y = Canvas_C.Y;
    Target._style.color = Text_color;
    Target._style.font  = Text_Size * (width/One_column*0.8) + "px serif";
    Target._element.textContent = Datas.テキスト[0];
    Canvas_C.font = Target._style.font;
    Canvas_C.W = Canvas_C.measureText(Datas.テキスト[0]).width;
    Canvas_C.X = Target.x + Canvas_C.W;
    Text_I++;
    Datas.テキスト = Datas.テキスト.slice(1);
    if(!Datas.テキスト){
      Sitasankaku("終");
      return;
    };
    Time = Wait;
    return;
  };

  var Input = {up:0,down:0};

  function Talk_Data_Set(Datas){
    switch(Datas){
      case "戻":
        Datas = Save_Datas.場所;
      case "ゲームロード":
        delete Save_Datas.場所;
        break;
    };
    Position = Datas;
    Datas = Talk_Datas[Position];
    Datas = JSON.stringify(Datas);
    Datas = JSON.parse(Datas);
    Temp = Datas.分岐;
    while(Temp){
      Position = Datas.次;
      for(var I = 0; I < Temp.length; I++){
        switch(Temp[I].条件){
          case "=":
            if(Flags[Temp[I].フラグ]==Temp[I].値){
              Position = Temp[I].次;
              break;
            };
            break;
          case ">":
            if(Flags[Temp[I].フラグ] > Temp[I].値){
              Position = Temp[I].次;
              break;
            };
            break;
          case "<":
            if(Flags[Temp[I].フラグ] < Temp[I].値){
              Position = Temp[I].次;
              break;
            };
            break;
        };
      };
      Datas = Talk_Datas[Position];
      Datas = JSON.stringify(Datas);
      Datas = JSON.parse(Datas);
      Temp = Datas.分岐;
    };
    if(Datas.名前){
      while(Datas.名前.match(/\(:(.+?):\)/)){
        Temp = Datas.名前.match(/\(:(.+?):\)/);
        Datas.名前 = Datas.名前.replace(/\(:(.+?):\)/,Flags[Temp[1]]);
      };
    };
    while(Datas.テキスト.match(/\(:(.+?):\)/)){
      Temp = Datas.テキスト.match(/\(:(.+?):\)/);
      Datas.テキスト = Datas.テキスト.replace(/\(:(.+?):\)/,Flags[Temp[1]]);
    };
    return(Datas);
  };

  scene.addEventListener("enterframe",function(){
    if(Black_Image.tl.queue.length) return;
    if(Black_Image.opacity&&!Black_Image.tl.queue.length){
      Black_Image.tl.fadeOut(20);
      if(Choice_Number=="黒"){
        Datas = Talk_Data_Set(Choice_Data);
        if(!Datas.時間) Datas.時間 = 5;
        Again_Child();
        Wait = Datas.時間;
        if(Datas.時間=="無"){
          Wait = 0;
          while(!Next) Text_Display();
          Time = 30;
        };
        scene.removeChild(Black_Image);
        scene.addChild(Black_Image);
      };
      return;
    };
    if(game.input.up&&!Input.up&&Next=="選"){
      Input.up = 10;
      if(Datas.選択肢){
        ChoiceText[Choice_Number].枠2.opacity = 0;
        if(Choice_Number) Choice_Number--;
        else Choice_Number = Datas.選択肢.length - 1;
        ChoiceText[Choice_Number].枠2.opacity = 0.5;
        Choice_Data = Datas.選択肢[Choice_Number][1];
      };
    };
    if(game.input.down&&!Input.down&&Next=="選"){
      Input.down = 10;
      if(Datas.選択肢){
        ChoiceText[Choice_Number].枠2.opacity = 0;
        Choice_Number++;
        if(!Datas.選択肢[Choice_Number]) Choice_Number = 0;
        ChoiceText[Choice_Number].枠2.opacity = 0.5;
        Choice_Data = Datas.選択肢[Choice_Number][1];
      };
    };
    if(Input.up) Input.up--;
    if(Input.down) Input.down--;
    if(Time){
      Time--;
      return;
    };
    if(Next){
      if(X_Push) return;
      if(Target.tl.queue.length) return;
      if(Target.opacity) Target.tl.fadeOut(20);
      else Target.tl.fadeIn(20);
      return;
    };
    Text_Display();
    return;
  });

  var X_Push = false;

  function Key_C(){
    if(!Next||X_Push) return;
    switch(Next){
      case "次":
        if(Datas.次.slice(0,1)=="黒"){
          Choice_Data = Datas.次.slice(1);
          scene.removeChild(Black_Image);
          scene.addChild(Black_Image);
          Black_Image.tl.fadeIn(20);
          Choice_Number = "黒";
          break;
        };
        Datas = Talk_Data_Set(Datas.次);
        if(!Datas.時間) Datas.時間 = 5;
        Again_Child();
        Wait = Datas.時間;
        if(Datas.時間=="無"){
          Wait = 0;
          while(!Next) Text_Display();
          Time = 30;
        };
        break;
      case "中断":
        Next = false;
        Datas.テキスト = Datas.中断;
        delete Datas.中断;
        break;
      case "続":
        Text_I = 0;
        Next = false;
        Canvas_C.X = Syoki_X;
        Canvas_C.Y = Syoki_Y;
        for(var I = 0; I < Texts.length; I++){
          Texts[I].tl.queue = [];
          Texts[I]._element.textContent = "";
        };
        if(Datas.時間=="無"){
          Wait = 0;
          while(!Next) Text_Display();
          Time = 30;
        };
        break;
      case "選":
        Temp = new Date().toLocaleString("ja-JP");
        if(Datas.選択肢[Choice_Number][1] == "ファイル1セーブ"){
          if(!Save_Datas.場所) Save_Datas.場所 = "和室1";
          Save_Datas.セーブデータ1 = {フラグ:JSON.stringify(Flags),時間:Temp,場所:Save_Datas.場所};
          window.localStorage.setItem("セーブ",JSON.stringify(Save_Datas));
          Choice_Data = Position;
        };
        if(Datas.選択肢[Choice_Number][1] == "ファイル2セーブ"){
          if(!Save_Datas.場所) Save_Datas.場所 = "和室1";
          Save_Datas.セーブデータ2 = {フラグ:JSON.stringify(Flags),時間:Temp,場所:Save_Datas.場所};
          window.localStorage.setItem("セーブ",JSON.stringify(Save_Datas));
          Choice_Data = Position;
        };
        if(Datas.選択肢[Choice_Number][1] == "ファイル3セーブ"){
          if(!Save_Datas.場所) Save_Datas.場所 = "和室1";
          Save_Datas.セーブデータ3 = {フラグ:JSON.stringify(Flags),時間:Temp,場所:Save_Datas.場所};
          window.localStorage.setItem("セーブ",JSON.stringify(Save_Datas));
          Choice_Data = Position;
        };
        if(Datas.選択肢[Choice_Number][1] == "ファイル1ロード"){
          delete Save_Datas.場所;
          Flags = Save_Datas.セーブデータ1.フラグ;
          Flags = JSON.parse(Flags);
          Choice_Data = Save_Datas.セーブデータ1.場所;
          scene.removeChild(Black_Image);
          scene.addChild(Black_Image);
          Black_Image.tl.fadeIn(20);
          Choice_Number = "黒";
          break;
        };
        if(Datas.選択肢[Choice_Number][1] == "ファイル2ロード"){
          delete Save_Datas.場所;
          Flags = Save_Datas.セーブデータ2.フラグ;
          Flags = JSON.parse(Flags);
          Choice_Data = Save_Datas.セーブデータ2.場所;
          scene.removeChild(Black_Image);
          scene.addChild(Black_Image);
          Black_Image.tl.fadeIn(20);
          Choice_Number = "黒";
          break;
        };
        if(Datas.選択肢[Choice_Number][1] == "ファイル3ロード"){
          delete Save_Datas.場所;
          Flags = Save_Datas.セーブデータ3.フラグ;
          Flags = JSON.parse(Flags);
          Choice_Data = Save_Datas.セーブデータ3.場所;
          scene.removeChild(Black_Image);
          scene.addChild(Black_Image);
          Black_Image.tl.fadeIn(20);
          Choice_Number = "黒";
          break;
        };
        if(Choice_Data=="黒"){
          Choice_Data = Datas.選択肢[Choice_Number][2];
          scene.removeChild(Black_Image);
          scene.addChild(Black_Image);
          Black_Image.tl.fadeIn(20);
          Choice_Number = "黒";
          break;
        };
        Datas = Talk_Data_Set(Choice_Data);
        if(!Datas.時間) Datas.時間 = 5;
        Again_Child();
        Wait = Datas.時間;
        if(Datas.時間=="無"){
          Wait = 0;
          while(!Next) Text_Display();
          Time = 30;
        };
        break;
      default:
        console.log(Next);
        break;
    };
    return;
  };

  window.addEventListener("keydown",function(e){
    var O = 0;
    if(Black_Image.tl.queue.length) return;
    switch(e.key){
      case "c":
        if(!Next) return;
        Key_C();
        break;
      case "s":
        if(!Next||Save_Datas.場所) return;
        Save_Datas.場所 = Position;
        Next = "次";
        Datas.次 = "セーブ";
        Key_C();
        break;
      case "x":
        for(var I = 0; I < ChoiceText.length; I++){
          scene.removeChild(ChoiceText[I].枠1);
          scene.removeChild(ChoiceText[I].枠2);
          scene.removeChild(ChoiceText[I]);
        };
        if(!Next){
          while(!Next) Text_Display();
          return;
        };
        X_Push = !X_Push;
        if(X_Push) O = 0;
        else O = 1;
        Name.opacity = O;
        Name_window.opacity = O;
        if(X_Push) Talk_window.opacity = O;
        else Talk_window.opacity = Save_Datas.システム.枠透明度;
        for(var I = 0; I < Texts.length; I++){
          Texts[I].tl.queue = [];
          Texts[I].opacity = O;
        };
        if(!X_Push&&Next=="選") Choice_Child();
        break;
    };
    return;
  });

  ChoiceText[0].枠2.addEventListener("touchstart",function(e){
    Choice_Number = 0;
    Choice_Data = Datas.選択肢[0][1];
    Key_C();
    return;
  });

  ChoiceText[1].枠2.addEventListener("touchstart",function(e){
    Choice_Number = 1;
    Choice_Data = Datas.選択肢[1][1];
    Key_C();
    return;
  });

  ChoiceText[2].枠2.addEventListener("touchstart",function(e){
    Choice_Number = 2;
    Choice_Data = Datas.選択肢[2][1];
    Key_C();
    return;
  });

  ChoiceText[3].枠2.addEventListener("touchstart",function(e){
    Choice_Number = 3;
    Choice_Data = Datas.選択肢[3][1];
    Key_C();
    return;
  });

  ChoiceText[4].枠2.addEventListener("touchstart",function(e){
    Choice_Number = 4;
    Choice_Data = Datas.選択肢[4][1];
    Key_C();
    return;
  });

  scene.addEventListener("touchstart",function(e){
    if(Next=="選"){
      for(var I = 0; I < Datas.選択肢.length; I++){
        ChoiceText[I].枠2.opacity = 0;
        scene.removeChild(ChoiceText[I].枠2);
        scene.addChild(ChoiceText[I].枠2);
      };
      return;
    };
    Key_C();
    console.log([e.x,e.y]);
    return;
  });

  return scene;
};

var Images = [];
function Create_Image(X,Y,W,H,C){
  var I = Images.length;
  Images[I] = new Entity();
  Images[I].moveTo(X,Y);
  Images[I].width = W;
  Images[I].height = H;
  Images[I]._element = document.createElement("img");
  Images[I]._element.src = "Images/" + C + ".png";
  return(Images[I]);
};
