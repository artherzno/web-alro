import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import PlanEstimationPerContractTab from './PlanEstimationPerContractTab'
import PlanEstimationPerCodeTab from './PlanEstimationPerCodeTab'
import PlanEstimationPerProjListTab from './PlanEstimationPerProjListTab'
import PlanEstimationPerProvinceTab from './PlanEstimationPerProvinceTab'

const tabs = [{
    title: 'รายงานประมาณการแผนการจ่ายเงินกู้ ',
    id: "planestimation_per_contract"
},
{
    title: 'รายงานประมาณการแผนการจ่ายเงินกู้  (รายประเภทโครงการหลัก)',
    id: "planestimation_per_code"
},{
    title: 'รายงานประมาณการแผนการจ่ายเงินกู้  (รายโครงการ)',
    id: "planestimation_per_projlist"
},{
    title: 'รายงานประมาณการแผนการจ่ายเงินกู้   (รายจังหวัด)',
    id: "planestimation_per_province"
}]

class PrincipalInterest extends React.Component {

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
                <PlanEstimationPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <PlanEstimationPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <PlanEstimationPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <PlanEstimationPerProvinceTab />
            )
        } 
    }
}

export default PrincipalInterest