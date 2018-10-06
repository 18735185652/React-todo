import React,{Component} from "react";
import * as filterTypes from "./filterTypes";
export default class TodoFooter extends Component{
    render(){
        return (
            <div className="row">
                <div className="col-xs-3 text-center">
                    你有{this.props.activeTodoCount}件代办事项
                </div>
                <div className="col-xs-6">
                    <button
                        className={`btn ${this.props.filterType===filterTypes.ALL ? "btn-success":"btn-default"} btn-sm text-center `}
                        onClick={()=>this.props.changeFilterType(filterTypes.ALL)}
                    >
                        全部
                    </button>

                    <button
                        className={`btn ${this.props.filterType===filterTypes.ACTIVE ? "btn-success":"btn-default"} btn-sm text-center `}
                        style={{marginLeft:10}}
                        onClick={()=>this.props.changeFilterType(filterTypes.ACTIVE)}
                    >
                        未完成
                    </button>

                    <button
                        className={`btn ${this.props.filterType===filterTypes.COMPLETED ? "btn-success":"btn-default"} btn-sm text-center `}
                        style={{marginLeft:10}}
                        onClick={()=>this.props.changeFilterType(filterTypes.COMPLETED)}
                    >
                        已完成
                    </button>
                </div>
                <div className="col-xs-3">
                    {
                        this.props.completedCount > 0 ?  <button className="btn btn-danger btn-sm" onClick={this.props.clearCompleted}>
                            删除已完成
                        </button>:null
                    }
                </div>
            </div>
        )
    }
}