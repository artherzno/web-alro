import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import ComparePerContractTab from './ComparePerContractTab'
import ComparePerProjPlanTab from './ComparePerProjPlanTab'
import ComparePerProjListTab from './ComparePerProjListTab'
import ComparePerProvinceTab from './ComparePerProvinceTab'

const tabs = [{
    title: 'รายงานสรุปเปรียบเทียบแผน / ผล จัดเก็บ',
    id: "compare_per_contract"
},
{
    title: 'รายงานสรุปเปรียบเทียบแผน / ผล จัดเก็บ (แผนโครงการ)',
    id: "compare_per_projplan"
},{
    title: 'รายงานสรุปเปรียบเทียบแผน / ผล จัดเก็บ (รายโครงการ)',
    id: "compare_per_projlist"
},{
    title: 'รายงานสรุปเปรียบเทียบแผน / ผล จัดเก็บ (จังหวัด)',
    id: "compare_per_province"
}]

class Compare extends React.Component {

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
                <ComparePerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <ComparePerProjPlanTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <ComparePerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <ComparePerProvinceTab />
            )
        } 
    }
}

export default Compare