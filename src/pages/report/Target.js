import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import TargetPerContractTTab from './TargetPerContractTTab'
import TargetPerContractPTab from './TargetPerContractPTab'
import TargetPerProjectYTab from './TargetPerProjectYTab'
import TargetPerGroupTab from './TargetPerGroupTab'

const tabs = [{
    title: 'รายงานเป้าจัดเก็บ รายสัญญา (ตำบล)',
    id: "target_per_contract_t"
},
{
    title: 'รายงานเป้าจัดเก็บ รายสัญญา (โครงการ)',
    id: "target_per_contract_p"
},{
    title: 'รายงานเป้าจัดเก็บ รายโครงการ (ปี)',
    id: "target_per_project_y"
},{
    title: 'รายงานเป้าจัดเก็บ กลุ่มลูกหนี้ (รายสัญญา/โครงการ)',
    id: "target_per_group"
}]

class Target extends React.Component {

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
                <TargetPerContractTTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <TargetPerContractPTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <TargetPerProjectYTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <TargetPerGroupTab />
            )
        } 
    }
}

export default Target