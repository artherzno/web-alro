import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import DebtConPerContractTab from './DebtConPerContractTab'
import DebtConPerCodeTab from './DebtConPerCodeTab'
import DebtConPerProjListTab from './DebtConPerProjListTab'
import DebtConPerProvinceTab from './DebtConPerProvinceTab'

const tabs = [{
    title: 'รายงานสภาพหนี้',
    id: "debtcon _per_contract" 
},
{
    title: 'รายงานสภาพหนี้ (รายประเภทโครงการหลัก)',
    id: "debtcon _per_code"
},{
    title: 'รายงานสภาพหนี้ (รายโครงการ)',
    id: "debtcon _per_projlist"
},{
    title: 'สรุปรายงานสภาพหนี้',
    id: "debtcon _per_province"
}]

class DebtCondi extends React.Component {

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
                <DebtConPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <DebtConPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <DebtConPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <DebtConPerProvinceTab />
            )
        } 
    }
}

export default DebtCondi