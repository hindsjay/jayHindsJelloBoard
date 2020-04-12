(this.webpackJsonpproject5=this.webpackJsonpproject5||[]).push([[0],{17:function(e,t,a){e.exports=a(38)},22:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(16),s=a.n(r),o=(a(22),a(6)),i=a(7),c=a(9),u=a(8),m=a(10),d=function(e){return l.a.createElement("header",{className:"welcomeHeaderContainer"},l.a.createElement("div",{className:"welcomeContentContainer"},l.a.createElement("h1",{className:"welcomeHeader"},"Jello"),l.a.createElement("p",null,"Welcome to Jello!"),l.a.createElement("p",null,"A Trello like task board!  Create, view, update, and delete items to keep you organized and focused on the most important tasks"),l.a.createElement("button",{type:"button",onClick:function(){e.enterButtonClicked()}},"Get Tasking!")))};var p=function(){return l.a.createElement("header",{className:"mainAppHeader"},l.a.createElement("h1",null,"Jello"))},h=function(e){return l.a.createElement("form",{className:"mainForm"},l.a.createElement("label",{htmlFor:"taskInput",className:"srOnly"}),l.a.createElement("input",{type:"text",id:"taskInput",className:"taskInput",placeholder:"Input Task Here...",onChange:function(t){e.inputVal(t)},value:e.userInputState}),l.a.createElement("button",{type:"submit",onClick:function(t){e.handleClick(t)}},"Add Task"))},k=a(13),f=a.n(k);f.a.initializeApp({apiKey:"AIzaSyDvmCIhenNay49FjRf5eq0z08sTop651uQ",authDomain:"jello-database.firebaseapp.com",databaseURL:"https://jello-database.firebaseio.com",projectId:"jello-database",storageBucket:"jello-database.appspot.com",messagingSenderId:"954320055794",appId:"1:954320055794:web:006031744c1a0e4957cf6b"});var v=f.a;var E=function(e){var t=e.editInputValue,a=e.editHandleChange,r=e.saveTask;return l.a.createElement(n.Fragment,null,l.a.createElement("form",null,l.a.createElement("input",{defaultValue:t,onChange:a}),l.a.createElement("button",{className:"saveButton editModeButton",type:"submit",onClick:r},"Save")))};var b=function(e){var t=e.taskValue,a=e.editTask,r=e.removeTask;return l.a.createElement(n.Fragment,null,l.a.createElement("p",null,t),l.a.createElement("div",{className:"editDeleteContainer"},l.a.createElement("button",{type:"button",onClick:a},"edit"),l.a.createElement("button",{type:"button",onClick:r},"delete")))},g=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).editHandleChange=function(t){e.setState({editingInputValue:t.target.value})},e.removeTask=function(e,t){e.ref().child(t).remove()},e.editTask=function(t){e.setState({editing:!e.state.editing,editingInputValue:t})},e.saveTask=function(t,a){t.ref(a).set(e.state.editingInputValue),e.setState({editing:!e.state.editing,editingInputValue:""})},e.state={editing:!1,editingInputValue:""},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement(n.Fragment,null,this.state.editing?l.a.createElement(E,{editInputValue:this.state.editingInputValue,editHandleChange:this.editHandleChange,saveTask:function(){e.saveTask(e.props.dbRefInfo,e.props.taskKey)}}):l.a.createElement(b,{taskValue:this.props.taskValue,editTask:function(){e.editTask(e.props.taskValue)},removeTask:function(){e.removeTask(e.props.dbRefInfo,e.props.taskKey)}}))}}]),t}(n.Component),C=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).handleChange=function(t){e.setState({userInput:t.target.value})},e.handleClick=function(t){(t.preventDefault(),e.state.userInput)?(v.database().ref().push(e.state.userInput),e.setState({userInput:""})):alert("input cannot be left blank - please enter a task")},e.state={tasks:[],userInput:""},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;v.database().ref().on("value",(function(t){var a=[],n=t.val();for(var l in n)a.push({key:l,value:n[l]});e.setState({tasks:a})}))}},{key:"render",value:function(){return l.a.createElement("main",null,l.a.createElement("div",{className:"wrapper"},l.a.createElement("div",{className:"scrollWrapper"},l.a.createElement("section",{className:"cardContainer"},l.a.createElement("h2",null,"Task List"),this.state.tasks.map((function(e){return l.a.createElement("div",{key:e.key,className:"taskItem"},l.a.createElement(g,{dbRefInfo:v.database(),taskValue:e.value,taskKey:e.key}))}))),l.a.createElement("section",{className:"cardContainer"},l.a.createElement("h2",null,"In Progress")),l.a.createElement("section",{className:"cardContainer"},l.a.createElement("h2",null,"Done")))),l.a.createElement(h,{inputVal:this.handleChange,userInputState:this.state.userInput,handleClick:this.handleClick}))}}]),t}(n.Component),I=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(c.a)(this,Object(u.a)(t).call(this))).toggleEnteredState=function(){e.setState({notEntered:!e.state.notEntered})},e.state={notEntered:!0},e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},this.state.notEntered?l.a.createElement(d,{enterButtonClicked:this.toggleEnteredState}):l.a.createElement(n.Fragment,null,l.a.createElement(p,null),l.a.createElement(C,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.461a69c3.chunk.js.map