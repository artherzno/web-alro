import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import ResultDebtsRemainingPerContractTab from './ResultDebtsRemainingPerContractTab'
import ResultDebtsRemainingPerCodeTab from './ResultDebtsRemainingPerCodeTab'
import ResultDebtsRemainingPerProjListTab from './ResultDebtsRemainingPerProjListTab'
import ResultDebtsRemainingPerProvinceTab from './ResultDebtsRemainingPerProvinceTab'

const tabs = [{
    title: 'รายงานผลจัดเก็บหนี้ค้างชำระ/หนี้คงเหลือ',
    id: "resultdebtsremaining_per_contract"
},
{
    title: 'รายงานผลจัดเก็บหนี้ค้างชำระ/หนี้คงเหลือ (รายประเภทโครงการหลัก)',
    id: "resultdebtsremaining_per_code"
},{
    title: 'รายงานผลจัดเก็บหนี้ค้างชำระ/หนี้คงเหลือ (รายโครงการ)',
    id: "resultdebtsremaining_per_projlist"
},{
    title: 'รายงานผลจัดเก็บหนี้ค้างชำระ/หนี้คงเหลือ (รายจังหวัด)',
    id: "resultdebtsremaining_per_province"
}]

class ResultDebtsRemaining  extends React.Component {

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
                <ResultDebtsRemainingPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <ResultDebtsRemainingPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <ResultDebtsRemainingPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <ResultDebtsRemainingPerProvinceTab />
            )
        } 
    }
}

export default ResultDebtsRemaining 