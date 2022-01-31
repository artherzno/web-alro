import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import ComparePlanResultPerContractTab from './ComparePlanResultPerContractTab'
import ComparePlanResultPerCodeTab from './ComparePlanResultPerCodeTab'
import ComparePlanResultPerProjListTab from './ComparePlanResultPerProjListTab'
import ComparePlanResultPerProvinceTab from './ComparePlanResultPerProvinceTab'

const tabs = [{
    title: 'รายงานเปรียบเทียบแผน-ผลการจ่ายเงินกู้',
    id: "compareplanresult_per_contract"
},
{
    title: 'รายงานเปรียบเทียบแผน-ผลการจ่ายเงินกู้ (รายประเภทโครงการหลัก)',
    id: "compareplanresult_per_code"
},{
    title: 'รายงานเปรียบเทียบแผน-ผลการจ่ายเงินกู้ (รายโครงการ)',
    id: "compareplanresult_per_projlist"
},{
    title: 'รายงานเปรียบเทียบแผน-ผลการจ่ายเงินกู้ (รายตำบล)',
    id: "compareplanresult_per_province"
}]

class ComparePlanResult extends React.Component {

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
                <ComparePlanResultPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <ComparePlanResultPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <ComparePlanResultPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <ComparePlanResultPerProvinceTab />
            )
        } 
    }
}

export default ComparePlanResult