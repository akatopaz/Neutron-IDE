ace.define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/python_highlight_rules","ace/mode/folding/pythonic","ace/range"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./python_highlight_rules").PythonHighlightRules,h=a("./folding/pythonic").FoldMode,i=a("../range").Range,j=function(){this.$tokenizer=new f((new g).getRules()),this.foldingRules=new h("\\:")};d.inherits(j,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=/^(\s*)#/;for(var g=c;g<=d;g++)if(!f.test(b.getLine(g))){e=!1;break}if(e){var h=new i(0,0,0,0);for(var g=c;g<=d;g++){var j=b.getLine(g),k=j.match(f);h.start.row=g,h.end.row=g,h.end.column=k[0].length,b.replace(h,k[1])}}else b.indentRows(c,d,"#")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"){var g=b.match(/^.*[\{\(\[\:]\s*$/);g&&(d+=c)}return d};var a={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(b,c,d){if(d!=="\r\n"&&d!=="\r"&&d!=="\n")return!1;var e=this.$tokenizer.getLineTokens(c.trim(),b).tokens;if(!e)return!1;do var f=e.pop();while(f&&(f.type=="comment"||f.type=="text"&&f.value.match(/^\s+$/)));return f?f.type=="keyword"&&a[f.value]:!1},this.autoOutdent=function(a,b,c){c+=1;var d=this.$getIndent(b.getLine(c)),e=b.getTabString();d.slice(-e.length)==e&&b.remove(new i(c,d.length-e.length,c,d.length))}}.call(j.prototype),b.Mode=j}),ace.define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield".split("|")),b=e.arrayToMap("True|False|None|NotImplemented|Ellipsis|__debug__".split("|")),c=e.arrayToMap("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern".split("|")),d=e.arrayToMap("".split("|")),f="(?:r|u|ur|R|U|UR|Ur|uR)?",g="(?:(?:[1-9]\\d*)|(?:0))",h="(?:0[oO]?[0-7]+)",i="(?:0[xX][\\dA-Fa-f]+)",j="(?:0[bB][01]+)",k="(?:"+g+"|"+h+"|"+i+"|"+j+")",l="(?:[eE][+-]?\\d+)",m="(?:\\.\\d+)",n="(?:\\d+)",o="(?:(?:"+n+"?"+m+")|(?:"+n+"\\.))",p="(?:(?:"+o+"|"+n+")"+l+")",q="(?:"+p+"|"+o+")";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:f+'"{3}(?:[^\\\\]|\\\\.)*?"{3}'},{token:"string",merge:!0,regex:f+'"{3}.*$',next:"qqstring"},{token:"string",regex:f+'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:f+"'{3}(?:[^\\\\]|\\\\.)*?'{3}"},{token:"string",merge:!0,regex:f+"'{3}.*$",next:"qstring"},{token:"string",regex:f+"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:"(?:"+q+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:q},{token:"constant.numeric",regex:k+"[lL]\\b"},{token:"constant.numeric",regex:k+"\\b"},{token:function(e){return a.hasOwnProperty(e)?"keyword":b.hasOwnProperty(e)?"constant.language":d.hasOwnProperty(e)?"invalid.illegal":c.hasOwnProperty(e)?"support.function":e=="debugger"?"invalid.deprecated":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"lparen.paren",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:[^\\\\]|\\\\.)*?"{3}',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?'{3}",next:"start"},{token:"string",merge:!0,regex:".+"}]}};d.inherits(g,f),b.PythonHighlightRules=g}),ace.define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(a,b,c){"use strict";var d=a("../../lib/oop"),e=a("./fold_mode").FoldMode,f=b.FoldMode=function(a){this.foldingStartMarker=new RegExp("(?:([\\[{])|("+a+"))(?:\\s*)(?:#.*)?$")};d.inherits(f,e),function(){this.getFoldWidgetRange=function(a,b,c){var d=a.getLine(c),e=d.match(this.foldingStartMarker);if(e)return e[1]?this.openingBracketBlock(a,e[1],c,e.index):e[2]?this.indentationBlock(a,c,e.index+e[2].length):this.indentationBlock(a,c)}}.call(f.prototype)}),ace.define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){"use strict";var d=a("../../range").Range,e=b.FoldMode=function(){};((function(){this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b,c){var d=a.getLine(c);return this.foldingStartMarker.test(d)?"start":b=="markbeginend"&&this.foldingStopMarker&&this.foldingStopMarker.test(d)?"end":""},this.getFoldWidgetRange=function(a,b,c){return null},this.indentationBlock=function(a,b,c){var e=/^\s*/,f=b,g=b,h=a.getLine(b),i=c||h.length,j=h.match(e)[0].length,k=a.getLength();while(++b<k){h=a.getLine(b);var l=h.match(e)[0].length;if(l==h.length)continue;if(l<=j)break;g=b}if(g>f){var m=a.getLine(g).length;return new d(f,i,g,m)}},this.openingBracketBlock=function(a,b,c,e){var f={row:c,column:e+1},g=a.$findClosingBracket(b,f);if(!g)return;var h=a.foldWidgets[g.row];return h==null&&(h=this.getFoldWidget(a,g.row)),h=="start"&&(g.row--,g.column=a.getLine(g.row).length),d.fromPoints(f,g)}})).call(e.prototype)}),function(){ace.require(["ace/ace"],function(a){window.ace||(window.ace={});for(var b in a)a.hasOwnProperty(b)&&(ace[b]=a[b])})}()