import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import ListNewFarmerPayLoanTab from './ListNewFarmerPayLoanTab'
import ListNewFarmerPayLoanSectionTab from './ListNewFarmerPayLoanSectionTab'
import PayLoanTab from './PayLoanTab'
import SumaryPayLoanTab from './SummaryPayLoanTab'
import SumaryProjectPayLoanTab from './SummaryProjectPayLoanTab'


const tabs = [
    {
        title: 'รายงานการจ่ายเงินกู้เกษตรกรรายใหม่',
        id: "list_new_farmer_pay"
    },
    {
        title: 'รายงานการจ่ายเงินกู้เกษตรกรรายใหม่ รายภาค',
        id: "list_new_farmer_pay_sector"
    },{
    title: 'รายงานการจ่ายเงินกู้',
    id: "pay_loan"
},
{
    title: 'สรุปรายงานการจ่ายเงินกู้ (15 วันทำการ)',
    id: "sum_pay_loan"
},
{
    title: 'สรุปโครงการที่จ่ายเงินกู้',
    id: "sum_project_pay_loan"
}]

class PayLoan extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tabSelected: tabs[0].id
        }

    }

    render() {

        return (
            <div>
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />

                <Box mt={1}>
                    <div >
                        <Box ml={2}>
                            <Grid container spacing={2}>
                                {tabs.map((tab, index) => {
                                    return (
                                        <Grid item key={index}>
                                            <div className={`header-tab ${tab.id === this.state.tabSelected ? 'active' : ''}`} onClick={() => {
                                                this.setState({
                                                    tabSelected: tab.id
                                                })
                                            }}> {tab.title} </div>
                                        </Grid>
                                    )
                                })}

                            </Grid>
                        </Box>

                    </div>
                </Box>
                <div className="line-horizontal" />

                <Box mt={1} ml={2} mr={2} mr={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {
        if (this.state.tabSelected === tabs[0].id) {
            return (
                <ListNewFarmerPayLoanTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <ListNewFarmerPayLoanSectionTab />
            )
        }
        else if (this.state.tabSelected === tabs[2].id) {
            return (
                <PayLoanTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <SumaryPayLoanTab />
            )
        } else if (this.state.tabSelected === tabs[4].id) {
            return (
                <SumaryProjectPayLoanTab />
            )
        }
        
    }
}

export default PayLoan