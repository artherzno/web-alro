import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import ExtendTimePerContractTab from './ExtendTimePerContractTab'
import ExtendTimePerCodeTab from './ExtendTimePerCodeTab'
import ExtendTimePerProjListTab from './ExtendTimePerProjListTab'
import ExtendTimePerProvinceTab from './ExtendTimePerProvinceTab'

const tabs = [{
    title: 'รายงานการขยายเวลา',
    id: "extendtime _per_contract" 
},
{
    title: 'รายงานการขยายเวลา (รายประเภทโครงการหลัก)',
    id: "extendtime _per_code"
},{
    title: 'รายงานการขยายเวลา (รายโครงการ)',
    id: "extendtime _per_projlist"
},{
    title: 'สรุปรายงานการขยายเวลา',
    id: "extendtime _per_province"
}]

class ExtendTime extends React.Component {

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
                <ExtendTimePerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <ExtendTimePerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <ExtendTimePerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <ExtendTimePerProvinceTab />
            )
        } 
    }
}

export default ExtendTime