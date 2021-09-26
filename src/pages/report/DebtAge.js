import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import DebtAgePerContractTab from './DebtAgePerContractTab'
import DebtAgePerCodeTab from './DebtAgePerCodeTab'
import DebtAgePerProjListTab from './DebtAgePerProjListTab'
import DebtAgePerProvinceTab from './DebtAgePerProvinceTab'

const tabs = [{
    title: 'รายงานอายุหนี้',
    id: "debtage_per_contract"
},
{
    title: 'รายงานอายุหนี้ (รายประเภทโครงการหลัก)',
    id: "debtage_per_code"
},{
    title: 'รายงานอายุหนี้ (รายโครงการ)',
    id: "debtage_per_projlist"
},{
    title: 'รายงานอายุหนี้  (รายจังหวัด)',
    id: "debtage_per_province"
}]

class DebtAge extends React.Component {

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
                <DebtAgePerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <DebtAgePerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <DebtAgePerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <DebtAgePerProvinceTab />
            )
        } 
    }
}

export default DebtAge