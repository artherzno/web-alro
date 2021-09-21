import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import SttPerContractTab from './SttPerContractTab'
import SttPerCodeTab from './SttPerCodeTab'
import SttPerProjListTab from './SttPerProjListTab'
import SttPerProvinceTab from './SttPerProvinceTab'

const tabs = [{
    title: 'รายงานสถานสภาพหนี้สิ้น',
    id: "stt_per_contract"
},
{
    title: 'รายงานสถานสภาพหนี้สิ้น (รายประเภทโครงการหลัก)',
    id: "stt_per_code"
},{
    title: 'รายงานสถานสภาพหนี้สิ้น (รายโครงการ)',
    id: "stt_per_projlist"
},{
    title: 'รายงานสถานสภาพหนี้สิ้น  (รายจังหวัด)',
    id: "stt_per_province"
}]

class Stt extends React.Component {

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
                <SttPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <SttPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <SttPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <SttPerProvinceTab />
            )
        } 
    }
}

export default Stt