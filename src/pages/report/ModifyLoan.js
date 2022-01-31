import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import SummaryModifyTab from './SummaryModifyTab'
import ModifyTab from './ModifyTab'

const tabs = [{
    title: 'รายงานการทำสัญญาปรับปรุงโครงสร้างหนี้',
    id: "modify"
},
{
    title: 'สรุปรายงานการทำสัญญาปรับปรุงโครงสร้างหนี้',
    id: "sum_modify"
},]

class ModifyLoan extends React.Component {

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

                <Box mt={1} ml={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {

        if (this.state.tabSelected === tabs[0].id) {
            return (
                <ModifyTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <SummaryModifyTab />
            )
        }
    }
}

export default ModifyLoan