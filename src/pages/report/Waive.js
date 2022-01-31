import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import WaivePerContractTab from './WaivePerContractTab'
import WaivePerCodeTab from './WaivePerCodeTab'
import WaivePerProjListTab from './WaivePerProjListTab'
import WaivePerProvinceTab from './WaivePerProvinceTab'

const tabs = [{
    title: 'รายงานการขอผ่อนผัน',
    id: "debtcon _per_contract" 
},
{
    title: 'รายงานการขอผ่อนผัน (รายประเภทโครงการหลัก)',
    id: "debtcon _per_code"
},{
    title: 'รายงานการขอผ่อนผัน (รายโครงการ)',
    id: "debtcon _per_projlist"
},{
    title: 'สรุปรายงานการขอผ่อนผัน',
    id: "debtcon _per_province"
}]

class Waive extends React.Component {

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

                <Box mt={1} ml={2} mr={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {

        if (this.state.tabSelected === tabs[0].id) {
            return (
                <WaivePerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <WaivePerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <WaivePerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <WaivePerProvinceTab />
            )
        } 
    }
}

export default Waive