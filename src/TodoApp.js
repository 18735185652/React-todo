import React,{Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import TodoHeader from "./TodoHeader";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import * as filterTypes from "./filterTypes";



export default class TodoApp extends Component{
    constructor(props){
        super(props);
        this.state={
            todos:[],
            filterType:filterTypes.ALL
        }; //初始化默认状态
    }
    addTodo=(todo)=>{
        //es5
        todo = Object.assign({},{id:Math.random(),completed:false},todo);
        //es7
        //todo = {id:Date.now(),completed:false,...todo};
        let todos = this.state.todos;
         todos.push(todo);
        this.setState({todos});
    }
    toggle=(id)=>{
        let todos = this.state.todos;
        todos = todos.map((todo)=>{
            if(todo.id===id){
                todo.completed = !todo.completed;
            }
            return todo;
        })
        this.setState({todos})
    }
    remove=(id)=>{
        let todos = this.state.todos;
        let index = todos.findIndex(todo=>todo.id===id)
        todos.splice(index,1);
        this.setState({todos})
    }
    toggleAll=(event)=>{
        let checked = event.target.checked;
        console.log(checked);
        let todos = this.state.todos;
        todos = todos.map(todo=>{
            todo.completed = checked;
            return todo;
        })
        this.setState({todos})
    }
    changeFilterType=(filterType)=>{
        // alert(1)
        console.log(filterType);
        this.setState({filterType});
    }
    clearCompleted=()=>{
        let todos = this.state.todos;
        todos = todos.filter(todo=>!todo.completed)
        this.setState({todos})
    }

    render(){
        let todos = this.state.todos;
        let activeTodoCount = todos.reduce((count,todo)=>{
           return count+(todo.completed ? 0 :1)
        },0);
        let completedCount = todos.length - activeTodoCount;
        let showTodos = todos.filter((todo)=>{
            switch(this.state.filterType){
                case filterTypes.ACTIVE: //要显示未完成的
                    return !todo.completed;
                case filterTypes.COMPLETED:
                    return todo.completed;
                default:
                        return true;
            }
        })
        let main = (
            <ul className="list-group">
                {
                    todos.length > 0 ? <li className="list-group-item">
                        <input type="checkbox"
                               checked={activeTodoCount === 0}
                               onChange={this.toggleAll}
                        />{activeTodoCount===0 ? "全部取消":"全部选中"}
                    </li> :null
                }
                {
                    showTodos.map((todo,index)=><TodoItem
                        remove={this.remove}
                        toggle={this.toggle}
                        index={index}
                        key={index}
                        todo={todo}/>)
                }
            </ul>
        )

        return (
            <div className="container" style={{marginTop:20}}>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="panel-default">
                            <div className="panel-heading">
                                <TodoHeader addTodo={this.addTodo}/>
                            </div>
                            <div className="panel-body" style={{borderLeft:"1px solid #ddd",borderRight:"1px solid #ddd"}}>
                                {main}
                            </div>
                            <div className="panel-footer">
                                <TodoFooter
                                    activeTodoCount={activeTodoCount}
                                    filterType={this.state.filterType}
                                    changeFilterType={this.changeFilterType}
                                    clearCompleted={this.clearCompleted}
                                    completedCount={completedCount}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}