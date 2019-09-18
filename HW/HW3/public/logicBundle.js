!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=30)}({30:function(t,e,i){(function(e){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,e,i){return e&&o(t.prototype,e),i&&o(t,i),t}var s=i(31),a=s.dispatchChangeGameState,h=s.dispatchStartGame,d=s.dispatchEndGame,c=i(6),u=c.width,f=c.height,y=c.frameRate,l=c.directions,p=l.UP,v=l.DOWN,w=l.LEFT,m=l.RIGHT,b=function(){function t(e,i){if(n(this,t),!e||!i)throw new Error("You're missing either height or width");var o={x:Math.floor(e/2),y:Math.floor(i/2)};this.body=[],this.body.push(o);for(var r=1;r<5;r++){var s={x:o.x,y:o.y+r};this.body.push(s)}this.direction=p,this.move=this.move.bind(this),this.changeDirection=this.changeDirection.bind(this)}return r(t,[{key:"move",value:function(t){t||this.body.pop();var e=this.body[0];if(this.direction===p){var i=[{x:e.x,y:e.y--}];this.body=i.concat(this.body)}else if(this.direction===v){var n=[{x:e.x,y:e.y++}];this.body=n.concat(this.body)}else if(this.direction===m){var o=[{x:e.x++,y:e.y}];this.body=o.concat(this.body)}else if(this.direction===w){var r=[{x:e.x--,y:e.y}];this.body=r.concat(this.body)}}},{key:"changeDirection",value:function(t){if(![p,v,w,m].includes(t))throw new Error("invalid direction");t===p?this.direction!==v&&(this.direction=t):t===v?this.direction!==p&&(this.direction=t):t===m?this.direction!==w&&(this.direction=t):t===w&&this.direction!==m&&(this.direction=t)}}]),t}(),k=function(){function t(e,i,o){if(n(this,t),!e||!i)throw new Error("You're missing either height or width");this.width=e,this.height=i,this.playing=!1,this.snake=new b(e,i),this.keyPressed=!1,this.frameRate=o,this.updateGameState=this.updateGameState.bind(this),this.checkCollision=this.checkCollision.bind(this),this.spawnFood=this.spawnFood.bind(this),this.reset=this.reset.bind(this),this.startGame=this.startGame.bind(this),this.endGame=this.endGame.bind(this),this.spawnFood(),a(this.snake,this.food)}return r(t,[{key:"spawnFood",value:function(){this.food={x:Math.round(Math.random()*this.width),y:Math.round(Math.random()*this.height)}}},{key:"checkCollision",value:function(){var t=this.snake.body[0];if(t.x<0||t.x>this.width-1)return!0;if(t.y<0||t.y>this.height-1)return!0;for(var e=1;e<this.snake.body.length;e++){var i=this.snake.body[e];if(t.x===i.x&&t.y===i.y)return!0}return!1}},{key:"shouldGrow",value:function(){var t=this.snake.body[0];return t.x===this.food.x&&t.y===this.food.y&&(this.spawnFood(),!0)}},{key:"updateGameState",value:function(){this.snake.move(this.shouldGrow()),this.keyPressed=!1,this.checkCollision()&&this.endGame(),a(this.snake,this.food)}},{key:"startGame",value:function(){h(),this.playing=!0,this.gameInterval=setInterval(this.updateGameState,y)}},{key:"endGame",value:function(){d(),this.playing=!1,clearInterval(this.gameInterval)}},{key:"reset",value:function(){this.playing&&(this.playing=!1,this.snake=new b(this.width,this.height),this.keyPressed=!1,clearInterval(this.gameInterval),this.spawnFood(),a(this.snake,this.food))}}]),t}(),G=new k(u,f,y);function g(t){return function(e){if("r"!==e.key){if(t.playing)return t.keyPressed?void 0:"ArrowUp"===e.key?(t.keyPressed=!0,t.snake.changeDirection(p),void t.updateGameState()):"ArrowDown"===e.key?(t.keyPressed=!0,t.snake.changeDirection(v),void t.updateGameState()):"ArrowLeft"===e.key?(t.keyPressed=!0,t.snake.changeDirection(w),void t.updateGameState()):"ArrowRight"===e.key?(t.keyPressed=!0,t.snake.changeDirection(m),void t.updateGameState()):void t.updateGameState();" "===e.key&&t.startGame()}else t.reset()}}var x=function(){G.reset()};try{window.onKeyDown=g(G),window.reset=x}catch(t){e.onKeyDown=g(G),e.reset=x}t.exports={Game:k,Snake:b,onKeyDownGenerator:g}}).call(this,i(5))},31:function(t,e,i){(function(e){var n;try{n=window.store}catch(t){n=e.store}var o=i(6),r=o.width,s=o.height,a=i(7),h=a.END_GAME,d=a.CHANGE_GAME_STATE,c=a.START_GAME,u=1,f=2;t.exports={dispatchChangeGameState:function(t,e){var i=function(){for(var t=[],e=0;e<s;e+=1){for(var i=[],n=0;n<r;n+=1)i.push(0);t.push(i)}return t}();t.body.forEach((function(t){var e=t.x,n=t.y;i[n][e]=u})),e&&(i[e.y][e.x]=f),n.dispatch({type:d,newGameState:i})},dispatchStartGame:function(){return n.dispatch({type:c})},dispatchEndGame:function(){return n.dispatch({type:h})}}}).call(this,i(5))},5:function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},6:function(t,e){t.exports={width:40,height:30,frameRate:80,directions:{UP:"UP",DOWN:"DOWN",LEFT:"LEFT",RIGHT:"RIGHT"}}},7:function(t,e){t.exports={CHANGE_GAME_STATE:"CHANGE_GAME_STATE",END_GAME:"END_GAME",START_GAME:"START_GAME"}}});