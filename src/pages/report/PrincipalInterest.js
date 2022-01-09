import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import PrincipalInterestPerContractTab from './PrincipalInterestPerContractTab'
import PrincipalInterestPerCodeTab from './PrincipalInterestPerCodeTab'
import PrincipalInterestPerProjListTab from './PrincipalInterestPerProjListTab'
import PrincipalInterestPerProvinceTab from './PrincipalInterestPerProvinceTab'

const tabs = [{
    title: 'รายงานหนี้เงินต้นและดอกเบี้ยค้างชำระ ',
    id: "principalinterest_per_contract"
},
{
    title: 'รายงานหนี้เงินต้นและดอกเบี้ยค้างชำระ  (รายประเภทโครงการหลัก)',
    id: "principalinterest_per_code"
},{
    title: 'รายงานหนี้เงินต้นและดอกเบี้ยค้างชำระ  (รายโครงการ)',
    id: "principalinterest_per_projlist"
},{
    title: 'รายงานหนี้เงินต้นและดอกเบี้ยค้างชำระ   (รายจังหวัด)',
    id: "principalinterest_per_province"
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
                <PrincipalInterestPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <PrincipalInterestPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <PrincipalInterestPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <PrincipalInterestPerProvinceTab />
            )
        } 
    }
}

export default PrincipalInterest