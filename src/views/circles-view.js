import React, { Component } from 'react';

function getCircleModel(item) {
    this.cx = item.cx || 0;
    this.cy = item.cy || 0;
    this.r = item.r || 0;
    //Default item set
}

class CirclesView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.onItemUpdate = this.onItemUpdate.bind(this);
    }
    componentDidMount() {
        this.updateCircles(this.getLocalStorageData());
    }
    updateCircles(circleList) {
        return this.setState({data:circleList});
    }
    getLocalStorageData(item){
       return JSON.parse(localStorage.getItem('circleList')) || [];//Default item set
    }
    setLocalStorageData(item){
        localStorage.setItem('circleList', JSON.stringify(item));
    }
    handleAddEvent(){
        this.setState((prevState)=>{
            let item = prevState.data.concat([new getCircleModel({})]);
            this.setLocalStorageData(item);
            return { data: prevState.data.concat([new getCircleModel({})])};//Default item set
        });
    }

    handleDelete(index){
        this.setState((prevState)=>{
            prevState.data.splice(index, 1);
            this.setLocalStorageData(prevState.data);
            return {data:prevState.data };
        });
    }

    onItemUpdate(index, item){
        const itemInfo = new getCircleModel(item);
        this.state.data[index]['cx']= itemInfo.cx;
        this.state.data[index]['cy']= itemInfo.cy;
        this.state.data[index]['r']= itemInfo.r;

        this.setState((prevState)=>{
            this.setLocalStorageData(prevState.data);
            return {data: prevState.data};
        });
    }

    render() {
        return(
            <div>
                <h2>Circles</h2>
                <div className="circleArea">
                    <CircleInputForm
                        circleList={this.state.data}
                        onItemAdd={this.handleAddEvent}
                        onItemDel={this.handleDelete}
                        onItemUpdate={this.onItemUpdate} />
                </div>
                <div className="circleArea">
                    <CircleList items={this.state.data}/>
                </div>
            </div>
        );
    }
};

class CircleInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = { hasViewPortError : false };

        this.renderCircleInputs = this.renderCircleInputs.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    }

    getDiameter(index, itemD){
        let _item = this.props.circleList
            .map((item, i) => {
                return (index===i)?itemD.r:item.r;
        })
            .reduce((prev, next)=> { return prev + next });
        return _item*2;
    }

    onUpdate(index, item){
        let _val = this.getDiameter(index, item) || 0;

        //Assumed view port width is 500
        if(_val>500){
            this.setState({hasViewPortError:true});
            setTimeout(function() {
                this.setState({hasViewPortError:false})
            }.bind(this), 3000);
        } else {
            this.props.onItemUpdate(index, item);
        }
    };

    renderCircleInputs(item, i) {
        return(<CircleInputs
            key={Math.random()}
            index={i}
            item={item}
            onItemDel={this.props.onItemDel}
            onItemUpdate={this.onUpdate}/>);
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
                    { this.state.hasViewPortError && <div className="error-area"><small className="not-allowed">The sum of circles diameters cannot be larger than the viewport width i.e.(should be less than 500)</small></div>}
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

    onChange(e){
        var item = {};
        item[e.target.name] = parseInt(e.target.value);
        this.setState((prevState)=>{
            return item;
        });
    }

    onupdateEvent(e){
        this.props.onItemUpdate(this.props.index, this.state);
    };

    onDelEvent(e){
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
        return (<svg id="chart" width="100%" height="500px"><rect className="d3bg" width="100%" height="500px"></rect> <g>{listItems} </g></svg>);
    }
}

class CircleItem extends Component {
    render() {
        const item = this.props.data;
        const _key = this.props.index+1;
        return (
                <circle cy={500-item.cy} cx={item.cx} r={item.r} fill="#365899"/>
        )
    }
}

export default CirclesView;