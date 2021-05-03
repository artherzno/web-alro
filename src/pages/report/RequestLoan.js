import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import RequestLoanTab from './RequestLoanTab'
import SummaryRequestLoanTab from './SummaryRequestLoanTab'

const tabs = [{
    title: 'รายงานคำขอกู้ยืมรายสัญญา',
    id: "request_loan_per_sign"
},
{
    title: 'สรุปรายงานการขอกู้ยืมรายสัญญา',
    id: "sum_request_loan_per_sign"
},]

class RequestLoan extends React.Component {

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

                <Box mt={5}>
                    <div >
                        <Box ml={2}>
                            <Grid container spacing={1}>
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

                <Box mt={5} ml={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {

        if (this.state.tabSelected === tabs[0].id) {
            return (
                <RequestLoanTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <SummaryRequestLoanTab />
            )
        } 
    }
}

export default RequestLoan