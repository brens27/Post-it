var Board = function(boardName) {
  var self = this;
  function initialize() {
    self.name = boardName;
    self.$elem = $('<div id="'+ boardName + '" class="board active"></div>')
    self.$label = $('<div id="l_'+ boardName + '"> <input class="'+boardName+' toggler" type="radio" checked="checked" class="boardOptions" name="board"/> <label for="board" class="'+ boardName +'" >' + boardName + '</label> </div>');
    self.updateDOM();
    self.$elem.dblclick(function(event){
      if(event.target != this) return;
      self.create();
    });
    self.bringToFront();
    self.deletePostIt();
  };
  initialize();
};


Board.prototype.deactivate = function(){
  this.$elem.toggleClass("active");
  this.$elem.toggleClass("inactive");
};

Board.prototype.activate = function(){
  this.$elem.toggleClass("active");
  this.$elem.toggleClass("inactive");
};

Board.prototype.updateDOM = function(){
    $('.boards').append(this.$elem);
    $('.labels').append(this.$label);
};

Board.prototype.create = function(){
  var postIt = new PostIt();
  this.$elem.append(postIt.string.css({'left': event.pageX, 'top': event.pageY, 'z-index': ++ PostIt.counter}));
};

Board.prototype.deletePostIt = function(){
  this.$elem.on('click', '.close', function(){
    $(this).parent('.header').parent('.post-it').remove();
  });
};


Board.prototype.bringToFront = function() {
  $('#board').on('click', '.post-it', function(){
    $(this).css('z-index', ++ PostIt.counter);
  });
};

var PostIt = function() {
  var self = this;
  
  function initialize(){
  self.string = $('<div class="post-it"> <div class="header"> <div class="close">X</div> </div> <div class="content" contentEditable="true">...</div> </div>');
    
  self.string.draggable({handle: '.header',}); 
  };
  initialize();
}

PostIt.counter = 0;



$(function() {
  var boardsArray = []
  var currentBoard = "";

  var unoBoard = new Board("uno");
  unoBoard.deactivate();
  var dosBoard = new Board("dos");
  dosBoard.deactivate();
  var tresBoard = new Board("tres");
  currentBoard = tresBoard;
  boardsArray.push(unoBoard);
  boardsArray.push(dosBoard);
  boardsArray.push(tresBoard);

  $('#boton').on('click', function(){
    var boardName = prompt("Dale un nombre al tablero");
    $('.board').hide();
    currentBoard.deactivate();
    var newBoard = new Board(boardName);
    currentBoard = newBoard; 
  });

  var toggleBoard = function(){
    $('body').on('change', 'input[type=radio]', function(event){
    var boardName = $(this).parent().attr('id').replace("l_","");
      console.log(event.target);
      console.log(this);
      console.log(boardName);
    currentBoard.deactivate();
    var toggleBoard = $.grep(boardsArray, function(obj){
      return obj.name === boardName;
    });
    currentBoard = toggleBoard[0];
    currentBoard.activate();
    });
  }
  
  toggleBoard();

}); 

