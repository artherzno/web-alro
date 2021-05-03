import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import SignTab from './SignTab'
import SignProjectTab from './SignProjectTab'
import SummarySignTab from './SummarySignTab'

const tabs = [{
    title: 'รายงานการทำสัญญารายสัญญา',
    id: "sign"
},
{
    title: 'รายงานการทำสัญญารายโครงการ',
    id: "sign_project"
},
{
    title: 'สรุปรายงานการทำสัญญา',
    id: "sum_sign"
}]

class ListSign extends React.Component {

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
                            <Grid container spacing={1}>
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

                <Box mt={5} ml={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {

        if (this.state.tabSelected === tabs[0].id) {
            return (
                <SignTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <SignProjectTab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <SummarySignTab />
            )
        }
    }
}

export default ListSign