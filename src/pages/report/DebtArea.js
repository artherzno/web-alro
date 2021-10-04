import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import DebtAreaPerContractTab from './DebtAreaPerContractTab'
import DebtAreaPerCodeTab from './DebtAreaPerCodeTab'
import DebtAreaPerProjListTab from './DebtAreaPerProjListTab'
import DebtAreaPerProvinceTab from './DebtAreaPerProvinceTab'

const tabs = [{
    title: 'รายงานการออกจัดเก็บหนี้ในพื้นที่',
    id: "debtarea _per_contract" 
},
{
    title: 'รายงานการออกจัดเก็บหนี้ในพื้นที่ (รายประเภทโครงการหลัก)',
    id: "debtarea _per_code"
},{
    title: 'รายงานการออกจัดเก็บหนี้ในพื้นที่ (รายโครงการ)',
    id: "debtarea _per_projlist"
},{
    title: 'สรุปรายงานการออกจัดเก็บหนี้ในพื้นที่',
    id: "debtarea _per_province"
}]

class DebtArea extends React.Component {

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
                <DebtAreaPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <DebtAreaPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <DebtAreaPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <DebtAreaPerProvinceTab />
            )
        } 
    }
}

export default DebtArea