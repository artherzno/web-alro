import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import LimitPerContractTab from './LimitPerContractTab'
import LimitPerCodeTab from './LimitPerCodeTab'
import LimitPerProjListTab from './LimitPerProjListTab'
import LimitPerProvinceTab from './LimitPerProvinceTab'

const tabs = [{
    title: 'รายงานอายุบังคับคดี',
    id: "limit_per_contract"
},
{
    title: 'อายุความทุกรายการ (วัน)',
    id: "limit_per_code"
},{
    title: 'อายุความทุกรายการ (ปี)',
    id: "limit_per_projlist"
}
/*,{
    title: 'สรุปรายงานอายุความ',
    id: "limit_per_province"
}*/
]

class Limitation extends React.Component {

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
                <LimitPerContractTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <LimitPerCodeTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <LimitPerProjListTab />
            )
        } else if (this.state.tabSelected === tabs[3].id) {
            return (
                <LimitPerProvinceTab />
            )
        } 
    }
}

export default Limitation