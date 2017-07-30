import React, { Component } from 'react';

function getCircleModel(item) {
    this.cx = item.cx || 10;
    this.cy = item.cy || 10;
    this.r = item.r || 10;
    //Default item set
}

class CirclesView extends Component{
    constructor() {
        super();
        this.state = {};
        var _item = new getCircleModel({});//Default item set
        this.state.data = [_item];
        this.state.viewportWidth = 250;

        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
    }
    handleAddEvent() {
        var _item = new getCircleModel({});   //Default item set
        this.state.data.push(_item);
        this.setState(this.state.data);
    }
    handleDelete(index) {
        this.state.data.splice(index, 1);
        this.setState({data:this.state.data});
    }

    onItemUpdate(index, item) {
        this.state.data[index] = new getCircleModel(item);

        let _sum = 2*this.state.data.reduce((a, b)=>{
            debugger;
            return b.r;
        }, 0);

        if(_sum>this.state.viewportWidth){
            alert("${sum of circles diameters cannot be larger than the viewport width viewportWidth}");
        } else {

            this.state.data[index] = new getCircleModel(item);
            /*this.state.data[index]['cx']= item.cx;
             this.state.data[index]['cy']= item.cy;
             this.state.data[index]['r']= item.r;*/
            this.setState({data: this.state.data});
        }
    }

    render() {
        return(
            <div>
                <h2>Circles</h2>
                <div className="circleArea">
                    <CircleInputForm circleList={this.state.data} onItemAdd={this.handleAddEvent} onItemDel={this.handleDelete} onItemUpdate={this.onItemUpdate} />
                </div>
                <div className="circleArea float-left">
                    <CircleList items={this.state.data}/>
                </div>
            </div>
        );
    }
};

class CircleInputForm extends Component {
    constructor(props) {
        super(props);
        this.renderCircleInputs = this.renderCircleInputs.bind(this);
    }

    onChange(e) {
        var item = {};
        item[e.target.name] = parseInt(e.target.value);
        this.setState(item);
    }

    renderCircleInputs(item, i) {
        return (<CircleInputs key={Math.random()} index={i} item={item} onItemDel={this.props.onItemDel} onItemUpdate={this.props.onItemUpdate}/>);
    }

    render() {
        const circleList = this.props.circleList;
        const circleInputs = circleList.map(this.renderCircleInputs);

        return (
            <div>
                <h4>You can add up to 5 circles.</h4>
                <div id="container">
                    { circleInputs }
                    { circleList.length<5 && <div className="btn float-right"><button onClick={ this.props.onItemAdd }>+</button></div> }
                </div>
            </div>
        );
    }
}

class CircleInputs extends Component {
    constructor(props) {
        super(props);
        const _item = props.item;
        this.state = new getCircleModel(_item);
        this.onChange = this.onChange.bind(this);
        this.onDelEvent = this.onDelEvent.bind(this);
        this.onupdateEvent = this.onupdateEvent.bind(this);
    }

    onChange(e) {
        var item = {};
        item[e.target.name] = parseInt(e.target.value);
        this.setState(item);
    }

    onupdateEvent(e) {
        this.props.onItemUpdate(this.props.index, this.state);
    };

    onDelEvent(e) {
        this.props.onItemDel(this.props.index);
    };

    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (!nextProps.item.cx === this.state.cx && nextProps.item.cy === this.state.cy && nextProps.item.r === this.state.r) {
            this.setState(nextProps.item);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');


    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!');
    }

    render() {
        const _item = this.state;
        return (
            <div>
                <div className="inner">
                    <div className="child"> <small> X: </small> <input type='number' onChange={this.onChange} name='cx' value={_item.cx}/></div>
                    <div className="child"> <small> Y: </small> <input type='number' onChange={this.onChange} name='cy' value={_item.cy}/></div>
                    <div className="child"> <small> Radius: </small> <input type='number' onChange={this.onChange} name='r' value={_item.r}/></div>
                    <div className="btn float-left"><button onClick={this.onupdateEvent}>update</button></div>
                </div>
                <div className="btn float-right"><button onClick={this.onDelEvent}>-</button></div>
            </div>
        );
    }
}

class CircleList extends Component {
    renderItem(item, i) {
        return (<CircleItem key={i.toString()} index={i} data={item} />)
    }
    render() {
        const items = this.props.items;
        var listItems = items.map(this.renderItem);
        return (<svg id="chart" width="100%" height="500px"> {listItems} </svg>);
    }
}

class CircleItem extends Component {
    render() {
        const item = this.props.data;
        const _key = this.props.index+1;
        return (
            <g>
                <circle cy={item.cy} cx={item.cx} r={item.r}/>
                <text y={item.cy+50} x={item.cx}>{_key}</text>
            </g>
        )
    }
}

export default CirclesView;