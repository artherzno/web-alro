import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import DebtStatusPerContractTab from './DebtStatusPerContractTab'
import DebtStatusPerProjectTab from './DebtStatusPerProjectTab'
import DebtStatusPerLoanTypeTab from './DebtStatusPerLoanTypeTab'
import DebtPending from './DebtPending'

const tabs = [{
    title: 'รายงานสถานะหนี้เงินกู้ รายสัญญา',
    id: "debtstatus_per_contract"
},
{
    title: 'รายงานสถานะหนี้เงินกู้ รายโครงการ',
    id: "debtstatus_per_project"
},{
    title: 'รายงานสถานะหนี้เงินกู้ ระยะสั้น ระยะยาว',
    id: "debtstatus_per_loantype"
},{
    title: 'รายงานสถานะหนี้เงินรอเรียกคืน',
    id: "debtstatus_per_wait"
}]

class DebtStatus extends React.Component {

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

                <Box mt={5} ml={2} mr={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {

        if (this.state.tabSelected === tabs[0].id) {
            return (
                <DebtStatusPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <DebtStatusPerProjectTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <DebtStatusPerLoanTypeTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <DebtPending />
            )
        } 
    }
}

export default DebtStatus