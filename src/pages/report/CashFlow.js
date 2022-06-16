import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import CashFlowPerContractTab from './CashFlowPerContractTab'
import CashFlowPerProj2Tab from './CashFlowPerProj2Tab'
import CashFlowPerProj3Tab from './CashFlowPerProj3Tab'

const tabs = [{
    title: 'รายงานสรุปงบกระแสเงินสดรับ-จ่าย',
    id: "cashflow_per_contract"
},
{
    title: 'รายงานสรุปงบกระแสเงินสด (โครงการ)',
    id: "cashflow_per_proj"
},
{
    title: 'รายงานสรุปงบกระแสเงินสด',
    id: "cashflow_per_proj2"
}
]

class CashFlow extends React.Component {

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
                <CashFlowPerContractTab /> 
            )
        } 
        else if (this.state.tabSelected === tabs[1].id) {
            return (
                <CashFlowPerProj2Tab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <CashFlowPerProj3Tab />
            )
        }
    }
}

export default CashFlow