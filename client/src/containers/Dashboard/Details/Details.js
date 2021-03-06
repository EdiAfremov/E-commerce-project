import React, { Component } from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import Chart from '../Charts/Chart';
import '../Charts/Chart.css'
import PieChart from '../Charts/PieChart/PieChart'
import SmallPie from './../Charts/SmallPie/SmallPie';
import LastOrders from './../Charts/LastOrders/LastOrders';
import VolumeChart from './../Charts/volumeChart/volumeChart'
import './Details.css'


class details extends Component {
    state = {
        details: {
            'total Revenue': 0,
            'total Orders': 0,
            'items Per Order': 0,
        },
        bestSeller: [],
        loading: true,
    }
    componentDidMount() {

        axios({
            method: 'get',
            url: `http://localhost:3001/dashboard/`
        }).then(response => {

            this.setState({
                details: {
                    'TOTAL REVENUE': response.data.totalAmount + '$',
                    'TOTAL ORDERS': response.data.totalOrders,
                    'ITEMS PER ORDER': response.data.itemsPerOrder,
                    'ORDER AVERAGE': (response.data.averageOrder).toFixed(2) + '$',
                },
                bestSeller: response.data.bestSeller,
                loading: false,
            });
        });
    }

    render() {
        let squers;
        let bestSeller;
        if (!this.state.loading) {
            squers = Object.keys(this.state.details).map((elem, i) => {
                return (
                    <div key={ i } className="paper-squers" >
                        <h1> { this.state.details[elem] } </h1>
                        <h2>{ elem } </h2>
                    </div>
                )
            })
            let arr = [this.state.bestSeller]
            bestSeller = arr.map((elem, i) => {

                return (
                    <div key={ i } className="paper-bestSeller" >
                        <div className="chart-header">
                            <h2 style={ { fontWeight: 400, textAlign: 'center' } }> BEST SELLER </h2>
                        </div>
                        <img className="best-seller-image"
                            src={ elem.image }
                            alt={ elem.brand }
                        />
                        <p>{ elem.brand } { elem.type } in { elem.color }<br />
                            Revenue: <span style={ { fontWeight: 700 } }>{ elem.price - elem.discount }$</span></p>
                    </div>
                )
            })
        }

        return (
            <div className={ this.props.sideBar ? "dashboard-container-sideBarOpen" : "dashboard-container" }>
                <div className="squers">
                    { squers }
                </div>
                <div className="main-charts">
                    <Chart />
                    <PieChart />
                    { bestSeller }
                </div>
                <div className="small-charts">
                    <SmallPie />
                    <LastOrders />
                    <VolumeChart />
                </div>
            </div>
        );
    }
}

export default details;

/*        <div className={ this.props.sideBar ? "dashboard-container-sideBarOpen" : "dashboard-container" }>
                <div className={ this.props.sideBar ? 'details-container' : "details-container" }>
                    { squers }
                    <Chart />
                    <PieChart />
                    { bestSeller }
                    <SmallPie />
                    <LastOrders />
                    <VolumeChart />
                </div>
            </div>*/